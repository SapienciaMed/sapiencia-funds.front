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


export default function useActaItems(action, acta: IActa, actaItems: IActaItems) {

    //contex
    const { setMessage, authorization, setDataGridItems, dataGridItems, } = useContext(AppContext);

    //peticiones api
    const { getProgramTypes, getMaster, getAnnouncement } = useActaApi();

    //refs
    const tableComponentRef = useRef(null);

    //Validaciones
    const resolver = useYupValidationResolver(createActas);

    //states
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
    const [dataActa, setDataActa] = useState<IActa>(acta);

    //form
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
            const results = calculateValues(value, acta.costsExpenses, selectedLabelFound, acta.financialOperation, acta.OperatorCommission);
            setNet(results.net);
            setCostBillsOperationt(results.costBillsOperation);
            setFinancialOperatorCommission(results.financialOperatorCommission);
            setResourcesCredit(results.resourcesCredit);
        } else if (name === "subtotalVigency") {
            setCostBillsOperationt("0");
            setNet("0");
            setFinancialOperatorCommission("0");
            setResourcesCredit("0");
        }
    };

    const calculateValues = (subtotalVigency, costsExpenses, selectedLabel, financialOperation, OperatorCommission) => {
        const multiplicacion = parseInt(subtotalVigency) * costsExpenses / 100;
        const resta = parseInt(subtotalVigency) - multiplicacion;
        let financialOperatorCommission = "0";
        let resourcesCredit = "0";

        if (resta !== 0) {
            if (selectedLabel === 'MEJORES BACHILLERES' && (financialOperation || OperatorCommission)) {
                const porcentajeOperacion = selectedLabel === 'MEJORES BACHILLERES' ? financialOperation : OperatorCommission;
                const divisor = 1 + porcentajeOperacion;
                const resultadoOperacion1 = resta - (resta / divisor);
                const resultadoOperacion2 = resta / divisor;
                financialOperatorCommission = String(resultadoOperacion1);
                resourcesCredit = String(resultadoOperacion2);
            }
        }
        console.log(resta, financialOperatorCommission, resourcesCredit);
        return {
            net: resta.toString(),
            costBillsOperation: multiplicacion.toString(),
            financialOperatorCommission,
            resourcesCredit
        };
    };


    const onsubmitAddItem = handleSubmit((data: IActaItems) => {
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
                },
                idFound: selectedFound,
                idLine: selectedLine,
                idProgram: selectedProgram,
                idAnnouncement: selectedAnnouncement,
                idConcept: selectedConcept
            };

            if (actaItems) {
                console.log(acta)
                // Continuación de tu lógica de edición
                const editingIndex = dataGridItems.findIndex(item => item.ident === actaItems.ident);
                if (editingIndex !== -1) {
                    setDataGridItems(prevDataGridItems => {
                        const updatedDataGridItems = [...prevDataGridItems];
                        updatedDataGridItems[editingIndex] = updatedItem;
                        return updatedDataGridItems;
                    });
                }
            } else {
                //console.log('mandar a guardar',updatedItem)
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

                    const foundData = response.data.filter(item => item.typeMasterList.name === 'Fondo');
                    const lineData = response.data.filter(item => item.typeMasterList.name === 'Línea');
                    const conceptData = response.data.filter(item => item.typeMasterList.name === 'Concepto');
                   
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

            setDataActa(acta)
    }, []);



    //editar items al crear actas

    useEffect(() => {
        if (!actaItems) return;
        if (action === "edit") {
            console.log(actaItems.subtotalVigency, acta.costsExpenses, selectedLabelFound, acta.financialOperation, acta.OperatorCommission);
            const results = calculateValues(actaItems.subtotalVigency, acta.costsExpenses, selectedLabelFound, acta.financialOperation, acta.OperatorCommission);
            setNet(results.net);
            setCostBillsOperationt(results.costBillsOperation);
            setFinancialOperatorCommission(results.financialOperatorCommission);
            setResourcesCredit(results.resourcesCredit);
            
            setValue("found", actaItems.idFound);
            setValue("line", actaItems.idLine);
            setValue("program", actaItems.idProgram);
            setValue("announcement", actaItems.idAnnouncement);
            setValue("concept", actaItems.idConcept);
            setValue("costOperation", actaItems.costOperation);
            setValue("subtotalVigency", actaItems.subtotalVigency);
            setValue("costBillsOperation", parseInt(costBillsOperation));
            setValue("net", parseInt(neto));
            setValue("resourcesCredit", parseInt(resourcesCredit));
            setValue("quantityPeriod1", actaItems.averageCost.quantityPeriod1);
            setValue("valuePeriod1", actaItems.averageCost.valuePeriod1);
            setValue("quantityPeriod2", actaItems.averageCost.quantityPeriod2);
            setValue("valuePeriod2", actaItems.averageCost.valuePeriod2);
            setValue("financialOperatorCommission", parseInt(financialOperatorCommission));           
        }
    }, [actaItems,acta]);

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