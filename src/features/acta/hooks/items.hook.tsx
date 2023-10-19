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


export default function useActaItems(action, acta:IActa) {

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
    const [net, setNet] = useState("0");


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

   /*  const handleInputChange = (event) => {
        console.log('acta',acta.costsExpenses)
        const inputValue = event.target.value;       
        if (inputValue && acta.costsExpenses) {

            const multiplicacion = parseFloat(inputValue) * acta.costsExpenses / 100;
            const resta = parseFloat(inputValue) - acta.costsExpenses

            setNet(resta.toString())
            setCostBillsOperationt(multiplicacion.toString());
        }else {
            setCostBillsOperationt("0");
            setNet("0")
        }
    }; */

    const handleInputChange = (event) => {
        const { name, value } = event.target;        
       console.log(name)
        if (name === "subtotalVigency" && value && acta.costsExpenses) {
            const multiplicacion = parseFloat(value) * acta.costsExpenses / 100;
            const resta = parseFloat(value) - acta.costsExpenses;
    
            setNet(resta.toString());
            setCostBillsOperationt(multiplicacion.toString());
        } else if (name === "subtotalVigency") {
            setCostBillsOperationt("0");
            setNet("0");
        }
    
        
    };
    


    const onsubmitAddItem = handleSubmit((data: IActaItems) => {
       // console.log(data)
        if (data) {
            dataGridItems.push({
                found: data.found,
                line: data.line,
                program: data.program
            });
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
                    setTypeProgram(
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
        net,
        handleInputChange
        /* CancelFunction  */
    }
}