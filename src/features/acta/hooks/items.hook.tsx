import { useContext, useEffect, useRef, useState } from "react";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IActaItems } from "../../../common/interfaces/actaItems.interface";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { createActas } from "../../../common/schemas/acta-shema";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import { EResponseCodes } from "../../../common/constants/api.enum";
import useVotingItemApi from "../../voting-results/hooks/voting-items-api.hooks";
import useActaApi from "./acta-api.hook";
import { IActa } from "../../../common/interfaces/acta.interface";
import { v4 as uuidv4 } from 'uuid';


export default function useActaItems(action, acta) {

    const resolver = useYupValidationResolver(createActas);

    const tableComponentRef = useRef(null);

    const [showTable, setShowTable] = useState(false);
    const [datos, setDatos] = useState<IActaItems[]>([]);
    const [typeProgram, setTypeProgram] = useState([]);
    const [masterList, setMasterList] = useState([]);
    const [programList, setProgramList] = useState([]);
    const [foundList, setFoundList] = useState([]);
    const [lineList, setLineList] = useState([]);
    const [announcementList, setAnnouncementList] = useState([]);
    const [conceptList, setConceptList] = useState([]);
    const [costBillsOperation, setCostBillsOperationt] = useState("0");
    const [neto, setNet] = useState("0");
    const [financialOperatorCommission, setFinancialOperatorCommission] = useState("0");
    const [resourcesCredit, setResourcesCredit] = useState("0");


    const { getProgramTypes, getMaster, getAnnouncement } = useActaApi();  

    const { setMessage, authorization, setDataGridItems, dataGridItems, } = useContext(AppContext);

    const {
        handleSubmit,
        register,
        control: control,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<IActaItems>({ resolver });

    const handleSelectChange = (event) => {
        const { value } = event.target;
        //console.log('u');  
    };

    //capturar el value de los select
    const selectedFound = watch('found');
    const selectedLine = watch('line');
    const selectedProgram = watch('program');
    const selectedAnnouncement = watch('announcement');
    const selectedConcept = watch('concept');

    const getSelectedLabel = (value, list) => {
        const selectedOption = list.find(option => option.value === value);
        return selectedOption ? selectedOption.name : null;
    };    

    const selectedLabelFound = getSelectedLabel(selectedFound, foundList);
    const selectedLabelLine = getSelectedLabel(selectedLine, lineList);  
    const selectedLabelProgram = getSelectedLabel(selectedProgram, programList);  
    const selectedLabelAnnouncement = getSelectedLabel(selectedAnnouncement, announcementList);  
    const selectedLabelConcept = getSelectedLabel(selectedConcept, conceptList);  
    
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        if (name === "subtotalVigency" && value && acta.costsExpenses) {
            const multiplicacion = parseInt(value) * acta.costsExpenses / 100;
            const resta = parseInt(value) - multiplicacion;         
    
            setNet(resta.toString());
            setCostBillsOperationt(multiplicacion.toString());
            
        } else if (name === "subtotalVigency") {
            setCostBillsOperationt("0");
            setNet("0");
        }
        
        // Se verifica si net es 0 antes de verificar selectedLabel y otros valores
        if (parseInt(neto) == 0) {
            setFinancialOperatorCommission("0");
            setResourcesCredit("0");
            return;  // Retorna temprano para evitar ejecutar el resto del código si net es 0
        }
        
       
        
        if (selectedLabelFound === 'MEJORES BACHILLERES' && (acta.financialOperation || acta.OperatorCommission)) {
            const porcentajeOperacion = selectedLabelFound === 'MEJORES BACHILLERES' ? acta.financialOperation : acta.OperatorCommission;
            const divisor = 1 + porcentajeOperacion;
            const resultadoOperacion1 = parseInt(neto) - (parseInt(neto) / divisor);
            const resultadoOperacion2 = parseInt(neto) / divisor;
            setFinancialOperatorCommission(String(resultadoOperacion1));
            setResourcesCredit(String(resultadoOperacion2));
        }
    };  

    const onsubmitAddItem = handleSubmit((data: IActaItems) => { 
        console.log('object',data)       
        if (data) {
            const updatedItem = {
                ident: uuidv4(),
                found: selectedLabelFound,
                line: selectedLabelLine,
                program: selectedLabelProgram,
                announcement: selectedLabelAnnouncement,
                concept: selectedLabelConcept,
                costOperation: data.costOperation,
                subtotalVigency: data.subtotalVigency,
                costBillsOperation: parseInt(costBillsOperation),
                financialOperatorCommission: parseInt(financialOperatorCommission),
                net: parseInt(neto),
                resourcesCredit: parseInt(resourcesCredit),
                averageCost: {
                    quantityPeriod1: data.quantityPeriod1,
                    valuePeriod1: data.valuePeriod1,
                    quantityPeriod2: data.quantityPeriod2,
                    valuePeriod2: data.valuePeriod2,
                }                                
            };
    
            if (action === "edit" && acta) {     
                // Continuación de tu lógica de edición
                const editingIndex = dataGridItems.findIndex(item => item.ident === acta.ident);              
                if (editingIndex !== -1) {       
                    setDataGridItems(prevDataGridItems => {
                        const updatedDataGridItems = [...prevDataGridItems];
                        updatedDataGridItems[editingIndex] = updatedItem;
                        return updatedDataGridItems;
                    });
                }
            } else {                
                console.log('mandar a guardar',updatedItem)
                setDataGridItems(prevDataGridItems => [...prevDataGridItems, updatedItem]);
            }

           
            
            setMessage({
                OkTitle: "Aceptar",
                description:
                    "Se ha agregado el item exitosamente",
                title: "Agregar Item",
                show: true,
                type: EResponseCodes.OK,
                background: true,
                onOk() {
                    reset();
                    setMessage({});
                },
                onClose() {
                    reset();
                    setMessage({});
                },
            });
        }       
    });



    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    //useEffects
    useEffect(() => {
        loadTableData()
    }, [])

    useEffect(() => {
        reset();
        if (showTable) {
            tableComponentRef.current.emptyData();
            setShowTable(true);
        }
    }, []);

    useEffect(() => {
        getProgramTypes()
            .then((response) => {
                if (response && response?.operation?.code === EResponseCodes.OK) {
                    setProgramList(
                        response.data.map((item) => {
                            const list = {
                                name: item.name,
                                value: item.id,
                            };
                            return list;
                        })
                    );
                }
            })

        getAnnouncement()
            .then((response) => {
                if (response && response?.operation?.code === EResponseCodes.OK) {
                    setAnnouncementList(
                        response.data.map((item) => {
                            const list = {
                                name: item.name,
                                value: item.id,
                            };
                            return list;
                        })
                    );
                }
            })

        getMaster()
            .then((response) => {
                if (response && response?.operation?.code === EResponseCodes.OK) {

                    // const programData = response.data.filter(item => item.typeMasterList.name === 'Programa');
                    const foundData = response.data.filter(item => item.typeMasterList.name === 'Fondo');
                    const lineData = response.data.filter(item => item.typeMasterList.name === 'Línea');
                    const conceptData = response.data.filter(item => item.typeMasterList.name === 'Concepto');

                    /*  setProgramList(
                         programData.map((item) => {
                             const list = {
                                 name: item.name,
                                 value: item.id,                               
                             };
                             return list;
                         })
                     ); */

                    setFoundList(
                        foundData.map((item) => {
                            const list = {
                                name: item.name,
                                value: item.id,
                                description: item.description
                            };
                            return list;
                        })
                    );

                    setLineList(
                        lineData.map((item) => {
                            const list = {
                                name: item.name,
                                value: item.id,
                            };
                            return list;
                        })
                    );

                    setConceptList(
                        conceptData.map((item) => {
                            const list = {
                                name: item.name,
                                value: item.id,
                            };
                            return list;
                        })
                    );

                }
            })
    }, []);



    //editar items al crear actas

  if (action === "edit") {        
    console.log(acta)
        useEffect(() => {
            if (!acta) return; 
            setValue("found", acta.found);
            setValue("line", acta.line);
            setValue("program", String(1));
            setValue("announcement", acta.announcement);
            setValue("concept", acta.concept);
            setValue("costOperation", acta.costOperation);
            setValue("subtotalVigency", acta.subtotalVigency);
            setValue("costBillsOperation", parseInt(costBillsOperation));
            setValue("net", parseInt(neto));
            setValue("resourcesCredit", acta.resourcesCredit);
            setValue("quantityPeriod1", acta.averageCost.quantityPeriod1);
            setValue("valuePeriod1", acta.averageCost.valuePeriod1);
            setValue("quantityPeriod2", acta.averageCost.quantityPeriod2);
            setValue("valuePeriod2", acta.averageCost.valuePeriod2);
        }, [acta]);
    } 
/* 
financialOperatorCommission: parseInt(financialOperatorCommission),
                net: parseInt(neto),
                resourcesCredit: parseInt(resourcesCredit),
*/

    return {
        control,
        errors,
        register,
        setValue,
        onsubmitAddItem,
        setShowTable,
        showTable,
        tableComponentRef,
        datos,
        foundList,
        typeProgram,
        programList,
        lineList,
        conceptList,
        announcementList,
        setCostBillsOperationt,
        costBillsOperation,
        setNet,
        neto,
        financialOperatorCommission,
        resourcesCredit,
        handleInputChange,
        handleSelectChange
        /* CancelFunction  */
    }
}