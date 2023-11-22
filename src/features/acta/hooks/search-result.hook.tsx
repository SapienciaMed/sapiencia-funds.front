import * as XLSX from "xlsx"
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { calculateTotalsDataTableActa } from "../helpers/calculateTotalsDataTableActa";
import { AppContext } from "../../../common/contexts/app.context";
import ItemsCreatePage from "../pages/items-create.page";
import { ISearchResultProp } from "../interface/Acta";
import useActaApi from "./acta-api.hook";
import useAuthService from "../../../common/hooks/auth-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from "react-router-dom";
import { IActa, IUser, IUserDataGrid } from "../../../common/interfaces";
import { dataActasdf } from "../helpers/dataPqrsdf";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { editActas } from "../../../common/schemas/acta-shema";
import usetableColumnsActa from "../utils/table-columns-acta";

export default function useSearcResult({ valueAction }: Readonly<ISearchResultProp>) {

    const { actaNro } = useParams();
    const id = { id: actaNro }
    const resolver = useYupValidationResolver(editActas);
    const { setMessage, authorization, dataGridItems, setDataGridItems, setDataGridUsers, } = useContext(AppContext);
    const tableComponentRef = useRef(null);
    const [ dataTableServices, setDataTableServices ] = useState<any[]>([])
    const [ dataGridUsersServices, setDataGridUsersServices ] = useState<IUserDataGrid[]>([])
    const { getHours, getActa, getProjectsList, updateActa, createActa } = useActaApi();
    const [ times, setTimes ] = useState([]);
    const [ activeUserList, setActiveUserList ] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const { getUser } = useAuthService();
    const navigate = useNavigate();
    const [projectMeta, setProjectMeta] = useState(0);
    const [vigency1, setVigency1] = useState(0);
    const [subtotalVigency, setSubtotalVigency] = useState(0);
    const [ canBeEdited, setCanBeEdited ] = useState(true)
    const { getProgramTypes, getMaster, getAnnouncement } = useActaApi();
    const [programList, setProgramList] = useState([]);
    const [foundList, setFoundList] = useState([]);
    const [lineList, setLineList] = useState([]);
    const [announcementList, setAnnouncementList] = useState([]);
    const [conceptList, setConceptList] = useState([]);
    const [totalQuantityPeriod2, setTotalQuantityPeriod2] = useState(0);
    const [totalQuantityPeriod1, setTotalQuantityPeriod1] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        watch,
        getValues
    } = useForm<IActa>({ resolver });

    const {tableActionsEdit, tableActionsUser,
        tableColumns, tableColumnsUsers } = usetableColumnsActa({ authorization, dataGridUsersServices, valueAction, dataTableServices, getValues, setMessage })

    const selectedProject = watch('numberProject');

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
    }, []);

    useEffect(() => {
        if (dataGridItems.length > 0) {
            setDataTableServices(prevDataTableServices => {
                const updatedDataGridItems = dataGridItems.map(us => {
                    const existingItemIndex = prevDataTableServices.findIndex(item => item.id === (us?.id || us.ident));
                    if (existingItemIndex !== -1) {
                        // Si el elemento ya existe, actualiza sus propiedades
                        return {
                            ...prevDataTableServices[existingItemIndex],
                            found: us?.found,
                            line: us?.line,
                            program: us?.program,
                            announcement: us?.announcement,
                            concept: us?.concept,
                            costOperation: us?.costOperation,
                            subtotalVigency: us?.subtotalVigency,
                            costBillsOperation: us.costBillsOperation,
                            financialOperatorCommission: us.financialOperatorCommission,
                            net: us?.net,
                            resourcesCredit: us.resourcesCredit,
                            periods: {
                                valuePeriod1: us?.periods.valuePeriod1,
                                valuePeriod2: us?.periods.valuePeriod2,
                                quantityPeriod1: us?.periods.quantityPeriod1,
                                quantityPeriod2: us?.periods.quantityPeriod2
                            },
                            id: us?.id || us.ident,
                            idFound: parseInt(us.idFound),
                            idLine: parseInt(us.idLine),
                            idProgram: parseInt(us.idProgram),
                            idAnnouncement: parseInt(us.idAnnouncement),
                            idConcept: parseInt(us.idConcept),
                        };
                    } else {
                        return {
                            found: us?.found,
                            line: us?.line,
                            program: us?.program,
                            announcement: us?.announcement,
                            concept: us?.concept,
                            costOperation: us?.costOperation,
                            subtotalVigency: us?.subtotalVigency,
                            costBillsOperation: us.costBillsOperation,
                            financialOperatorCommission: us.financialOperatorCommission,
                            net: us?.net,
                            resourcesCredit: us.resourcesCredit,
                            periods: {
                                valuePeriod1: us?.periods.valuePeriod1,
                                valuePeriod2: us?.periods.valuePeriod2,
                                quantityPeriod1: us?.periods.quantityPeriod1,
                                quantityPeriod2: us?.periods.quantityPeriod2
                            },
                            id: us.id,
                            idFound: parseInt(us.idFound),
                            idLine: parseInt(us.idLine),
                            idProgram: parseInt(us.idProgram),
                            idAnnouncement: parseInt(us.idAnnouncement),
                            idConcept: parseInt(us.idConcept),
                        };
                    }
                });
                const combinedArray = prevDataTableServices.map(item => {
                    const updatedItem = updatedDataGridItems.find(us => us.id === (item?.id || item.ident));
                    return updatedItem || item;
                })
        
                return [...combinedArray, ...updatedDataGridItems.filter(us => !combinedArray.find(item => item.id === (us?.id || us.ident)))];
            });    
        }
    }, [dataGridItems]);

    useEffect(() => { loadTableData() }, [])

    useEffect(() => {
        if (programList.length > 0 && foundList.length > 0 &&  lineList.length > 0 &&  announcementList.length > 0 && conceptList.length > 0) {      
            getActa( id ).then(response => {
                if (response.operation.code == EResponseCodes.OK) {
                    const dinamicData = response?.data;
                    const valueTableActaControl = dinamicData[0].items.map( data => {
                        const selectedLabelFound = foundList.find(option => option.value === parseInt(data.idFound));
                        const selectedLabelLine  = lineList.find(option => option.value === parseInt(data.idLine));
                        const selectedLabelProgram =  programList.find(option => option.value === parseInt(data.idProgram));
                        const selectedLabelAnnouncement =  announcementList.find(option => option.value === parseInt(data.idAnnouncement));
                        const selectedLabelConcept = conceptList.find(option => option.value === parseInt(data.idConcept));

                        return {
                            found: selectedLabelFound?.name,
                            line: selectedLabelLine?.name,
                            program: selectedLabelProgram?.name,
                            announcement: selectedLabelAnnouncement?.name,
                            concept: selectedLabelConcept?.name,
                            costOperation: data?.costOperation,
                            subtotalVigency: data?.subtotalVigency,
                            costBillsOperation: data?.costBillsOperation,
                            financialOperatorCommission: data.financialOperatorCommission,
                            net: data?.net,
                            resourcesCredit: data.resourcesCredit,
                            periods: {
                                valuePeriod1: data?.periods.valuePeriod1,
                                valuePeriod2: data?.periods.valuePeriod2,
                                quantityPeriod1: data?.periods.quantityPeriod1,
                                quantityPeriod2: data?.periods.quantityPeriod2
                            },
                            id: data.id,
                            idFound: parseInt(data.idFound),
                            idLine: parseInt(data.idLine),
                            idProgram: data.idProgram,
                            idAnnouncement: parseInt(data.idAnnouncement),
                            idConcept: parseInt(data.idConcept),
                        }
                    })
                    setDataTableServices(valueTableActaControl)
    
                    const valueCitation = dinamicData[0].citation.filter((value, index, self) =>
                        index === self.findIndex((v) => (
                            v.user === value.user &&
                            v.timeCitation === value.timeCitation &&
                            v.status === value.status &&
                            v.idCitation === value.idCitation
                        ))
                    ).map(({ user, dateAprobation: timeCitation, status, dateCitation, email, idCitation }) => ({ user, timeCitation, status, dateCitation, email, idCitation }));
    
                    setDataGridUsersServices(valueCitation)
    
                    dinamicData.forEach(dataSearch => {
                        setValue('idStatus', dataSearch.typeMasterList.name)
                        setValue('numberProject', dataSearch.numberProject)
                        setValue('periodVigency', dataSearch.periodVigency)
                        setValue('announcementInitial', dataSearch.announcementInitial)
                        setValue('salaryMin', dataSearch.salaryMin)
                        setValue('costsExpenses', dataSearch.costsExpenses)
                        setValue('OperatorCommission', dataSearch.OperatorCommission)
                        setValue('financialOperation', dataSearch.financialOperation)
                        setValue('consecutiveNroPrevious', String(dataSearch?.lastId || '') )
                    });

                    setValue('consecutiveNro', actaNro)
                }
            }).catch(error => console.log(error))
    
            getProjectsList().then((response) => {
                    if (response && response?.operation?.code === EResponseCodes.OK) {
                        setProjectList(
                            response.data.map((item) => {
                                const list = {
                                    value: item.id,
                                    name: item.bpin,
                                    meta: item.goal,
                                };
                                return list;
                            })
                        );
                    }
            }).catch(error => console.log(error))
        }
    },[programList, foundList, lineList, announcementList, conceptList])

    useEffect(() => {
        calculateTotalsDataTableActa(dataTableServices, setValue, setVigency1, setSubtotalVigency, setTotalQuantityPeriod2, setTotalQuantityPeriod1);
    }, [dataTableServices]);

    useEffect(() => {
        const selectedProjectMeta = projectList[selectedProject]?.meta;
        if (selectedProjectMeta) {
            const integerPart = parseInt(selectedProjectMeta, 10);         
            setProjectMeta(integerPart); 
            setValue('techo', integerPart) 
        }
    }, [selectedProject, projectList]);

    useEffect(() => {
        return () => {
            setDataTableServices([])
            setDataGridUsersServices([])
            setActiveUserList([])
            setDataGridUsers([])
            setDataGridItems([])
            setCanBeEdited(false)
            setProgramList([])
            setFoundList([])
            setLineList([])
            setAnnouncementList([])
            setConceptList([])
            setTotalQuantityPeriod2(0)
            setTotalQuantityPeriod1(0)
        }
    },[])

    useEffect(() => {
        if (valueAction == 'edit') {
            getWorkersActive();
            getHours().then(result => setTimes(result));
        }
    },[valueAction])

    useEffect(() => {
       valueAction == 'edit' && calculateTotalsDataTableActa(dataGridItems, setValue, setVigency1, setSubtotalVigency, setTotalQuantityPeriod2, setTotalQuantityPeriod1);
    }, [dataGridItems]);

    function downloadCollection() {
        getActa( id ).then(response => {
            if (response.operation.code == EResponseCodes.OK) {
                const dinamicData = response?.data;

                const book = XLSX.utils.book_new()
                const sheet = XLSX.utils.json_to_sheet( dataActasdf(dinamicData) )

                XLSX.utils.book_append_sheet(book, sheet, "DATAFOUND")

                setTimeout(() => {
                    XLSX.writeFile(book, "DATAFOUND.xlsx")
                    setMessage({
                        title: "Descargar",
                        description: "Información descargada exitosamente ",
                        OkTitle: "Cerrar",
                        show: true,
                        type: EResponseCodes.OK,
                        background: true,
                        onOk() {
                            setMessage({});
                            navigate(-1);
                        },
                        onClose() {
                            setMessage({});
                            navigate(-1);
                        },
                    });
                }, 1000)
            }
        })
    }

    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    const addItem = handleSubmit(async (data: IActa) => {
        setMessage({
            show: true,
            title: "Agregar ítem",
            description: <ItemsCreatePage acta={data} action={"new"} />,
            background: true,
            size: "items",
            items: true,
            onOk() {
                setMessage({});
            },
        });
    });

    const getWorkersActive = () => {
        getUser()
            .then((response: ApiResponse<IUser[]>) => {
                if (response && response?.operation?.code === EResponseCodes.OK) {
                    setActiveUserList(
                        response.data.map((item) => {
                            const list = {
                                value: item.id,
                                name: `${item.numberDocument +
                                    " - " +
                                    item.names +
                                    " " +
                                    item.lastNames
                                    }`,
                                email: item.email
                            };
                            return list;
                        })
                    );
                }
            })
            .catch((err) => { });
    };

    const selectedUser = watch('user');
    const selectedTime= watch('timeCitation');
    const selectedDate= watch('dateCitation');

    const getSelectedLabel = (value, list) => {
        const selectedOption = list.find(option => option.value === value);
        return selectedOption ? { email: selectedOption.email, name: selectedOption.name } : null;
    };

    const selectedLabelUser = getSelectedLabel(selectedUser, activeUserList);

    const addUser = handleSubmit((data: IActa) => {
        if (selectedUser) {
            dataGridUsersServices.push({
                ident: uuidv4(),
                user: selectedLabelUser.name,
                dateCitation: selectedDate,
                timeCitation: selectedTime,
                status: 0,
                email: selectedLabelUser.email,
            });
        }
    });

    const onCancel = () => {
        setMessage({
          show: true,
          title: "Cancelar",
          description: "¿Segur@ que desea cancelar la creación del acta?",
          OkTitle: "Aceptar",
          cancelTitle: "Cancelar",
          onOk() {
            navigate(-1);
            setMessage((prev) => ({ ...prev, show: false }));
          },
          background: true,
        });
    };

    const onSaveEdit = handleSubmit(async(data: IActa) => {
        if (Number(projectMeta) < Number(vigency1) || Number(projectMeta)< Number(subtotalVigency)) {
            setMessage({
                title: "Guardar",
                description: "El acta no podrá ser guardada por superar el valor del techo",
                show: true,
                OkTitle: "Aceptar",
                background: true,
            });
        }else{
            setMessage({
                show: true,
                title: "Guardar acta",
                description: "¿Estas segur@ de guardar de guardar la información?",
                OkTitle: "Aceptar",
                cancelTitle: "Cancelar",
                onOk() {
                    confirmActaUpdate(data);
                },
                background: true,
            });
        }

    })

    const confirmActaUpdate = async (data: IActa) => {
        const actaItems = dataTableServices.map((e) => ({
            costOperation: String(e.costOperation),
            subtotalVigency: e.subtotalVigency,
            costBillsOperation: e.costBillsOperation,
            financialOperatorCommission: e.financialOperatorCommission,
            resourcesCredit: e.resourcesCredit,
            periods: e.periods,
            net: e.net,
            idFound: e.idFound ,
            idLine: e.idLine ,
            idProgram: e.idProgram ,
            idAnnouncement: e.idAnnouncement,
            idConcept: e.idConcept,
            id: e?.id || 0
        }));
        
        const citation = dataGridUsersServices.map((e) => {
            const date = new Date(e.dateCitation);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            return {
                user: e.user,
                dateCitation: formattedDate,
                timeCitation: e.timeCitation,
                status: e.status,
                email: e.email,
                idCitation: e.idCitation
            }
        });

        const state = getValues('idStatus');

        const actaData = {      
            [(state === 'Aprobado' || state == 'Aprobado - Modificado' ) ? 'idLast' : 'id']: parseInt(actaNro),
            numberProject: data.numberProject,
            periodVigency: Number(data.periodVigency),
            announcementInitial: String(data.announcementInitial),
            salaryMin: data.salaryMin,
            costsExpenses: data.costsExpenses,
            OperatorCommission: data.OperatorCommission,
            financialOperation: data.financialOperation,
            idStatus: 1,
            items: actaItems,
            citation: citation
        };
 
       if (state == 'Aprobado' || state == 'Aprobado - Modificado') {
            createActa(actaData).then(response => {
                if (response.operation.code == EResponseCodes.OK) {
                    setMessage({
                        OkTitle: "Guardar",
                        description: "¡Guardado exitosamente!",
                        title: "Guardar",
                        show: true,
                        type: EResponseCodes.OK,
                        background: true,
                        onOk() {
                            setMessage({});
                            navigate(-1);
                        },
                        onClose() {
                            setMessage({});
                            navigate(-1);
                        },
                    });
                }else{
                    setMessage({
                        type: EResponseCodes.FAIL,
                        title: "Crear Acta",
                        description: "Ocurrió un error en el sistema",
                        show: true,
                        OkTitle: "Aceptar",
                        background: true,
                    });
                }
     
            }).catch(error => console.log(error))
       }else {
           updateActa(actaData).then(response => {
               if (response.operation.code == EResponseCodes.OK) {
                   setMessage({
                       OkTitle: "Guardar",
                       description: "¡Guardado exitosamente!",
                       title: "Guardar",
                       show: true,
                       type: EResponseCodes.OK,
                       background: true,
                       onOk() {
                           setMessage({});
                           navigate(-1);
                       },
                       onClose() {
                           setMessage({});
                           navigate(-1);
                       },
                   });
               }else{
                   setMessage({
                       type: EResponseCodes.FAIL,
                       title: "Crear Acta",
                       description: "Ocurrió un error en el sistema",
                       show: true,
                       OkTitle: "Aceptar",
                       background: true,
                   });
               }
    
           }).catch(error => console.log(error))
       }

    };

    return{
        errors,
        control,
        tableComponentRef,
        tableColumns,
        dataTableServices,
        tableColumnsUsers,
        dataGridUsersServices,
        times,
        activeUserList,
        tableActionsUser,
        projectList,
        tableActionsEdit,
        canBeEdited,
        totalQuantityPeriod2,
        totalQuantityPeriod1,
        register,
        addItem,
        addUser,
        onCancel,
        handleSubmit,
        onSaveEdit,
        downloadCollection
    }
}