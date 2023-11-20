import { Checkbox } from "primereact/checkbox";
import { IActa, IActaItems, IAuthorization, ITableAction, ITableElement, IUserDataGrid } from "../../../common/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IMessage } from "../../../common/interfaces/global.interface";
import ItemsCreatePage from "../pages/items-create.page";
import { UseFormGetValues } from 'react-hook-form';
import useActaApi from "../hooks/acta-api.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";

interface IPropTableColumnsActa{
    dataGridUsersServices: IUserDataGrid[]
    authorization: IAuthorization,
    setMessage: Dispatch<SetStateAction<IMessage>>,
    getValues: UseFormGetValues<IActa>
    valueAction: string,
    dataTableServices: any[]
}

export default function usetableColumnsActa({ dataGridUsersServices, authorization, valueAction, dataTableServices, getValues, setMessage }: IPropTableColumnsActa) {

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

    const tableColumns: ITableElement<IActaItems>[] = [
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
            renderCell(row) {
                return(
                    <div>
                       ${row.costOperation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </div>
                )
            },
        },
        {
            fieldName: "periods.quantityPeriod1",
            header: "Cantidad Periodo 1",
        },
        {
            fieldName: "periods.valuePeriod1",
            header: "Valor Periodo 1",
            renderCell(row) {
                return(
                    <div>
                       ${row.periods.valuePeriod1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </div>
                )
            }
        },
        {
            fieldName: "periods.quantityPeriod2",
            header: "Cantidad Periodo 2",
        },
        {
            fieldName: "periods.valuePeriod2",
            header: "Valor Periodo 2",
            renderCell(row) {
                return(
                    <div>
                       ${row.periods.valuePeriod2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </div>
                )
            }
        },
        {
            fieldName: "subtotalVigency",
            header: "Subtotal vigencia",
            renderCell(row) {
                return(
                    <div>
                       ${row.subtotalVigency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </div>
                )
            }
        },
        {
            fieldName: "costBillsOperation",
            header: "Costos y gastos de operación",
            renderCell(row) {
                return(
                    <div>
                       ${row.costBillsOperation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </div>
                )
            }
        },
        {
            fieldName: "net",
            header: "Neto",
            renderCell(row) {
                return(
                    <div>
                       ${row.net.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </div>
                )
            }
        },
        {
            fieldName: "financialOperatorCommission",
            header: "Comisión operador financiero",
            renderCell(row) {
                return(
                    <div>
                       ${row.financialOperatorCommission.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </div>
                )
            }
        },
        {
            fieldName: "resourcesCredit",
            header: "Recursos para crédito",
            renderCell(row) {
                return(
                    <div>
                       ${row.resourcesCredit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    </div>
                )
            }
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

                setMessage({
                    show: true,
                    title: "Editar ítem",
                    description: <ItemsCreatePage acta={dataEditTable} actaItems={row} action={"edit"} dataTableServices={dataTableServices} />,
                    background: true,
                    size: "items",
                    items: true,
                    onOk() {
                        setMessage({});
                    },
                });
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