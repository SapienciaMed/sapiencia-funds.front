import { Checkbox } from "primereact/checkbox";
import { IActa, IActaItems, IAuthorization, ITableAction, ITableElement, IUserDataGrid } from "../../../common/interfaces";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { IMessage } from "../../../common/interfaces/global.interface";
import ItemsCreatePage from "../pages/items-create.page";
import { UseFormGetValues } from 'react-hook-form';
import { ISearchResultProp } from "../interface/Acta";
import useActaApi from "../hooks/acta-api.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";

interface IPropTableColumnsActa{
    dataGridUsersServices: IUserDataGrid[]
    authorization: IAuthorization,
    setMessage: Dispatch<SetStateAction<IMessage>>,
    getValues: UseFormGetValues<IActa>
    valueAction: string,
}

export default function tableColumnsActa({ dataGridUsersServices, authorization, valueAction, getValues, setMessage }: IPropTableColumnsActa) {

    const [ idCitation, setIdCitation ] = useState({ id: '' })
    const { approveCitation } = useActaApi();
    const [ checked, setChecked ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            setMessage({});
        }
    },[])

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
            const isEdit = rowData.user.includes(authorization.user.numberDocument)
                return (
                    <div className="spc-table-action-button">
                        <Checkbox 
                            onChange={e => { 
                                setChecked(e.checked); 
                                setIdCitation({ id: rowData.idCitation})
                            }} 
                            checked={checked || rowData.status == 1} 
                            disabled={!isEdit || valueAction == 'edit'} 
                        />
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
                            (row.timeCitation == undefined || row.status == 0) ? '' : `${year}/${ month < 10 ? '0'+ month :  month }/${ day < 10 ? '0' + day :  day}`
                        }
                    </div>
                )
            },
        }
    ]

    const tableActionsEdit: ITableAction<IActaItems>[] = [
        {
            icon: "Edit",
            onClick: (row) => {
                const dataEditTable: IActa = {
                    idStatus: getValues('idStatus'),
                    numberProject: getValues('numberProject'),
                    periodVigency: getValues('periodVigency'),
                    announcementInitial: getValues('announcementInitial'),
                    salaryMin: getValues('salaryMin'),
                    costsExpenses: getValues('costsExpenses'),
                    OperatorCommission: getValues('OperatorCommission'),
                    financialOperation: getValues('financialOperation'),
                    techo: getValues('techo'),
                }

                // setMessage({
                //     show: true,
                //     title: "Agregar ítem",
                //     description: <ItemsCreatePage acta={dataEditTable} actaItems={row} action={"edit"} />,
                //     background: true,
                //     size: "items",
                //     items: true,
                //     onOk() {
                //         setMessage({});
                //     },
                // });
            },
        }
    ];

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
                        if (dataGridUsersServices.find((obj) => obj.ident == row.ident)) {
                            const position = dataGridUsersServices.findIndex(
                                (obj) => obj.ident === row.ident
                            );
                            dataGridUsersServices.splice(position, 1);
                            setMessage({})
                        }
                    },
                    background: true,
                });
            },
        }
    ];

    return {
        tableColumns,
        tableColumnsUsers,
        tableActionsEdit,
        tableActionsUser
    }
}