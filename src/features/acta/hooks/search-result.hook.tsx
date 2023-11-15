import * as XLSX from "xlsx"
import { Checkbox } from "primereact/checkbox";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { calculateTotalsDataTableActa } from "../helpers/calculateTotalsDataTableActa";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { editActas } from "../../../common/schemas/acta-shema";
import ItemsCreatePage from "../pages/items-create.page";
import { ISearchResultProp } from "../interface/Acta";
import useActaApi from "./acta-api.hook";
import useAuthService from "../../../common/hooks/auth-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from "react-router-dom";
import { IActa, IActaItems, ITableAction, ITableElement, IUser, IUserDataGrid } from "../../../common/interfaces";
import { dataActasdf } from "../helpers/dataPqrsdf";

export default function useSearcResult({ valueAction }: Readonly<ISearchResultProp>) {

    const resolver = useYupValidationResolver(editActas);
    //dataGridItems = Se usa cuando esta editando (Se neceita?)
    const { setMessage, authorization, dataGridItems, setDataGridUsers, dataGridUsers } = useContext(AppContext);
    const tableComponentRef = useRef(null);
    const [ checked, setChecked ] = useState(false);
    const [ dataTableServices, setDataTableServices ] = useState<IActaItems[]>([])
    const [ dataGridUsersServices, setDataGridUsersServices ] = useState<IUserDataGrid[]>([])
    const { getHours, getActa, getProjectsList, approveCitation } = useActaApi();
    const [ times, setTimes ] = useState([]);
    const [ activeUserList, setActiveUserList ] = useState([]);
    const [projectList, setProjectsList] = useState<any[]>([]);
    const [ idCitation, setIdCitation ] = useState({
        id: ''
    })
    const { getUser } = useAuthService();
    const navigate = useNavigate();
    const { actaNro } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        watch
    } = useForm<IActa>({
        resolver,
        mode: 'all'
    });

    const selectedProject = watch('numberProject');  

    useEffect(() => {
        loadTableData()
    }, [])

    useEffect(() => {
        const id = {
            id: actaNro
        }
        if (valueAction != 'edit') {
            getActa( id ).then(response => {
                if (response.operation.code == EResponseCodes.OK) {
                    const dinamicData = response?.data;
                    const valueTableActaControl: IActaItems[] = dinamicData[0].items.map( data => {
                        return {
                            found: data?.idFound, 
                            line: data?.idLine, 
                            program: data?.idProgram, 
                            announcement: data?.idAnnouncement, 
                            concept: data?.idConcept, 
                            costOperation: data?.costOperation,
                            subtotalVigency: data?.subtotalVigency,
                            costBillsOperation: 0,
                            financialOperatorCommission: data.financialOperatorCommission,
                            net: data?.net,
                            resourcesCredit: data.resourcesCredit,
                            periods: {
                                valuePeriod1: data?.periods.valuePeriod1,
                                valuePeriod2: data?.periods.valuePeriod2,
                                quantityPeriod1: data?.periods.quantityPeriod1,
                                quantityPeriod2: data?.periods.quantityPeriod2
                            },
                        }
                    })
                    setDataTableServices(valueTableActaControl)

                    const valueCitation = dinamicData[0].citation.filter((value, index, self) =>
                        index === self.findIndex((v) => (
                            v.user === value.user &&
                            v.timeCitation === value.timeCitation &&
                            v.status === value.status
                        ))
                    ).map(({ user, dateAprobation: timeCitation, status }) => ({ user, timeCitation, status }));
                    setIdCitation({
                        id: String(dinamicData[0].citation[0].idCitation)
                    })

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
                    });
                }
            }).catch(error => console.log(error))

            getProjectsList().then((response) => {
                    if (response && response?.operation?.code === EResponseCodes.OK) {
                        setProjectsList(
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
    },[])

    useEffect(() => {
        calculateTotalsDataTableActa(dataTableServices, setValue);
    }, [dataTableServices]);

    useEffect(() => {
        if (checked) {
            approveCitation (idCitation).then(response => {
                if (response.operation.code == EResponseCodes.OK) {
                    setMessage({
                        description: "¡Guardado exitosamente!",
                        title: "Guardado",
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
                }
            })
        }
    },[checked])

    useEffect(() => {
        const selectedProjectMeta = projectList.find(us => us.value == selectedProject)?.meta;
        if (selectedProjectMeta) {
            const integerPart = parseInt(selectedProjectMeta, 10);         
            setValue('techo',integerPart) 
        }
    }, [selectedProject, projectList]);

    useEffect(() => {
        return () => {
            setDataTableServices([])
            setDataGridUsersServices([])
            setChecked(false)
            setActiveUserList([])
            setDataGridUsers([])
        }
    },[])

    function downloadCollection() {
        const id = {
            id: actaNro
        }

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

    const tableColumns: ITableElement<any>[] = [
        {
            fieldName: "program",
            header: "Programa",
        },
        {
            fieldName: "found",
            header: "Fondo"
        },
        {
            fieldName: "line",
            header: "Linea",
        },
        {
            fieldName: "announcement",
            header: "Convocatoria",
        },
        {
            fieldName: "concept",
            header: "Concepto",
        },
        {
            fieldName: "costOperation",
            header: "Costo promedio",
        },
        {
            fieldName: "periods.quantityPeriod1",
            header: "Cantidad Periodo 1",
        },
        {
            fieldName: "periods.valuePeriod1",
            header: "Valor Periodo 1",
        },
        {
            fieldName: "periods.quantityPeriod2",
            header: "Cantidad Periodo 2",
        },
        {
            fieldName: "periods.valuePeriod2",
            header: "Valor Periodo 2",
        },
        {
            fieldName: "subtotalVigency",
            header: "Subtotal vigencia",
        },
        {
            fieldName: "costBillsOperation",
            header: "Costos y gastos de operación",
        },
        {
            fieldName: "net",
            header: "Neto",
        },
        {
            fieldName: "financialOperatorCommission",
            header: "Comisión operador financiero",
        },
        {
            fieldName: "resourcesCredit",
            header: "Recursos para crédito",
        },
    ];

    const tableColumnsUsers: ITableElement<any>[] = [
        {
            fieldName: "aproved",
            header: 'Aprobar',
            renderCell: (rowData) => {
            const isEdit = authorization.user.names != rowData.user
                return (
                    <div className="spc-table-action-button">
                        <Checkbox onChange={e => setChecked(e.checked)} checked={checked || rowData.status == 1} disabled={rowData.status == 1 || isEdit} />
                    </div>
                )
            }
        },
        {
            fieldName: 'user',
            header: 'Usuario'
        },
        {
            fieldName: 'timeCitation',
            header: 'Fecha de aprobación',
            renderCell(row) {
                const date = new Date(row.timeCitation);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return(
                    <div>
                        {
                            row.timeCitation == undefined ? '' : 
                            `${year}/${ month < 10 ? '0'+ month :  month }/${ day < 10 ? '0' + day :  day}`
                        }
                    </div>
                )
            },
        }
    ]

    const onSubmit = handleSubmit((data: any) => {})

    //Todo: Acciones cuando se vaya a modificar un acta.

    useEffect(() => {
        if (valueAction == 'edit') {
            getWorkersActive();
            getHours().then(result => setTimes(result));
        }
    },[valueAction])

    // useEffect(() => {
    //     if (Number(projectMeta) < Number(vigency1) || Number(projectMeta)< Number(subtotalVigency)) {
    //         setMessage({
    //             title: "Guardar",
    //             description: "El acta no podrá ser guardada por superar el valor del techo",
    //             show: true,
    //             OkTitle: "Aceptar",
    //             background: true,
    //         });
    //         setSend(true)
    //     }else{
    //         setSend(false)
    //     }

    // }, [projectMeta, vigency1, subtotalVigency]);

    const tableActionsUser: ITableAction<IActaItems>[] = [
        {
            icon: "Delete",
            onClick: (row) => {
                setMessage({
                    show: true,
                    title: "Eliminar registro",
                    description: "Estás segur@ de eliminar este registro?",
                    OkTitle: "Aceptar",
                    cancelTitle: "Cancelar",
                    onOk() {
                        if (dataGridUsers.find((obj) => obj.ident == row.ident)) {
                            const position = dataGridUsers.findIndex(
                                (obj) => obj.ident === row.ident
                            );
                            dataGridUsers.splice(position, 1);
                            setMessage({})
                        }
                    },
                    background: true,
                });
            },
        }
    ];

    const addItem = handleSubmit((data: IActa) => {
        data.idStatus = 1;
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
        if (selectedUser ) {
            const date = new Date(selectedDate);
            const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            dataGridUsers.push({
                ident: uuidv4(),
                user: selectedLabelUser.name,
                dateCitation: formattedDate,
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

    return{
        errors,
        control,
        tableComponentRef,
        tableColumns,
        dataTableServices,
        tableColumnsUsers,
        dataGridUsersServices,
        dataGridItems,
        times,
        activeUserList,
        dataGridUsers,
        tableActionsUser,
        register,
        addItem,
        onSubmit,
        addUser,
        onCancel,
        downloadCollection
    }
}