import { Checkbox } from "primereact/checkbox";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { IActaItems } from "../../../common/interfaces/actaItems.interface";
import { calculateTotalsDataTableActa } from "../helpers/calculateTotalsDataTableActa";
import { AppContext } from "../../../common/contexts/app.context";
import { IUserDataGrid } from "../../../common/interfaces/usersGridInterface";

export default function useSearcResult() {

    const { setMessage, authorization } = useContext(AppContext);
    const tableComponentRef = useRef(null);
    const [arrayCitation, setArrayCitation] = useState<any[]>([])
    const [checked, setChecked] = useState(false);
    const [ dataTableServices, setDataTableServices] = useState<IActaItems[]>([])
    const [ dataGridUsersServices, setDataGridUsersServices] = useState<IUserDataGrid[]>([])
    const [ selectedUserData, setSelectedUserData] = useState<IUserDataGrid[]>([])

    const { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        control,
        setValue
    } = useForm();


    useEffect(() =>  {
        //Peticion
        const citationMock = {
            user: '********',
            date: '********',
        }
        setArrayCitation([citationMock])

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
        setDataTableServices(valorTableMock)

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
        setDataGridUsersServices(gridUserMock)
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

    return{
        errors,
        control,
        arrayCitation,
        tableComponentRef,
        tableColumns,
        dataTableServices,
        tableColumnsUsers,
        dataGridUsersServices,
        register,
        handleSubmit,
        actionBodyTemplate,
    }
}