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


    const { getProgramTypes, getMaster, getAnnouncement } = useActaApi();


    const { setMessage, authorization, setDataGridItems, dataGridItems, } = useContext(AppContext);

    const {
        handleSubmit,
        register,
        control: control,
        setValue,
        reset,
        formState: { errors },
    } = useForm<IActaItems>({ resolver });


    const onsubmitAddItem = handleSubmit((data: IActaItems) => {
        console.log(data)

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





    //useEffects
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


    console.log('fondos', foundList)
    console.log('programas', programList)
    console.log('linea', lineList)
    console.log('concepto', conceptList)





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
        announcementList
        /* CancelFunction  */
    }
}