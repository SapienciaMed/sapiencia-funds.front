import { Checkbox } from "primereact/checkbox";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { calculateTotalsDataTableActa } from "../helpers/calculateTotalsDataTableActa";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { editActas } from "../../../common/schemas/acta-shema";
import ItemsCreatePage from "../pages/items-create.page";
import { ISearchResult } from "../interface/Acta";
import useActaApi from "./acta-api.hook";
import useAuthService from "../../../common/hooks/auth-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { IActa, IActaItems, ITableAction, ITableElement, IUser, IUserDataGrid } from "../../../common/interfaces";

export default function useSearcResult({ valueAction }: Readonly<ISearchResult>) {

    const resolver = useYupValidationResolver(editActas);
    const { setMessage, authorization, setDataGridItems, dataGridItems, setDataGridUsers, dataGridUsers } = useContext(AppContext);
    const tableComponentRef = useRef(null);
    const [ arrayCitation, setArrayCitation] = useState<any[]>([])
    const [ checked, setChecked ] = useState(false);
    const [ dataTableServices, setDataTableServices ] = useState<IActaItems[]>([])
    const [ dataGridUsersServices, setDataGridUsersServices ] = useState<IUserDataGrid[]>([])
    const [ selectedUserData, setSelectedUserData ] = useState<IUserDataGrid[]>([])
    const [ datosActa, setDatosActa] = useState<IActa>();
    const { getHours } = useActaApi();
    const [ times, setTimes ] = useState([]);
    const [ activeUserList, setActiveUserList ] = useState([]);
    const { getUser } = useAuthService();
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        control,
        setValue,
        watch
    } = useForm({
        resolver,
        mode: 'all'
    });


    useEffect(() =>  {
        //Peticion
        const citationMock = {
            user: '********',
            date: '********',
        }
        valueAction != 'edit' && setArrayCitation([citationMock])

        const valorTableMock = [
            {
                ident: "e15641ef-cfbb-4e37-b1f0-d3fd199081ff",
                found: "pruebas",
                line: "prueba",
                program: "PROGRAMA",
                announcement: "2019-1",
                concept: "test",
                costOperation: "1",
                subtotalVigency: 1,
                costBillsOperation: 0,
                financialOperatorCommission: 0,
                net: 0,
                resourcesCredit: 0,
                periods: {
                    quantityPeriod1: "1",
                    valuePeriod1: "1",
                    quantityPeriod2: "1",
                    valuePeriod2: "1"
                },
                idFound: "3",
                idLine: "11",
                idProgram: "4",
                idAnnouncement: "1",
                idConcept: "10"
            },
            {
                ident: "e15641ef-cfbb-4e37-b1f0-d3fd199081ff",
                found: "pruebas",
                line: "prueba",
                program: "PROGRAMA",
                announcement: "2019-1",
                concept: "test",
                costOperation: "1",
                subtotalVigency: 1,
                costBillsOperation: 0,
                financialOperatorCommission: 0,
                net: 0,
                resourcesCredit: 0,
                periods: {
                    quantityPeriod1: "1",
                    valuePeriod1: "1",
                    quantityPeriod2: "1",
                    valuePeriod2: "1"
                },
                idFound: "3",
                idLine: "11",
                idProgram: "4",
                idAnnouncement: "1",
                idConcept: "10"
            }
        ]
        valueAction != 'edit' && setDataTableServices(valorTableMock)

        const gridUserMock = [ 
            {
                timeCitation: '*****',
                user: 'Usuario1',
                status: 1
            },
            {
                timeCitation: '*****',
                user: 'Usuario2',
                status: 1
            },
            {
                timeCitation: '*****',
                user: 'Usuario3',
                status: 1
            }
        ]
        valueAction != 'edit' && setDataGridUsersServices(gridUserMock)
    },[])

    useEffect(() => {
        loadTableData()
    }, [])

    useEffect(() => {
        calculateTotalsDataTableActa(dataTableServices, setValue);
    }, [dataTableServices]);

    useEffect(() => {
        if (checked) {
            console.log("mostrar modal");  
        }
    },[checked])

    useEffect(() => {
        dataGridItems.length > 0 && setDataTableServices(dataGridItems)
    },[dataGridItems])

    useEffect(() => {
        return () => {
            setDataGridItems([])
            setDataTableServices([])
            setSelectedUserData([])
            setArrayCitation([])
            setDataGridUsersServices([])
            setChecked(false)
            setActiveUserList([])
            setDataGridUsers([])
        }
    },[])

    const actionBodyTemplate = (row) => {
        return (
            <div className="spc-table-action-button">
                <Checkbox onChange={e => setChecked(e.checked)} checked={checked}/>
            </div>
        );
    };

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
                
                return (
                    <div className="spc-table-action-button">
                        <Checkbox value={rowData} onChange={onCategoryChange} checked={selectedUserData.some((item) => item?.user == rowData?.user)}/>
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
            header: 'Fecha de aprobación'
        }
    ]

    const onCategoryChange = (e) => {
        let _selectedUser = [...selectedUserData];
        
        if (e.checked){
            _selectedUser.push(e.value);
        }else{
            _selectedUser = _selectedUser.filter(category => category?.user !== e.value.user);
        }
        setSelectedUserData(_selectedUser);
    };

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
        setDatosActa(data)
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
        arrayCitation,
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
        actionBodyTemplate,
        addItem,
        onSubmit,
        addUser,
        onCancel
    }
}