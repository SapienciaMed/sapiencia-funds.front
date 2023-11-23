import { Checkbox } from "primereact/checkbox";
import { IActa, IActaItems, IAuthorization, ITableAction, ITableElement, IUserDataGrid } from "../../../common/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IMessage } from "../../../common/interfaces/global.interface";
//import ItemsCreatePage from "../pages/items-create.page";
import { UseFormGetValues } from 'react-hook-form';
//import useActaApi from "../hooks/renewal-report-api.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useNavigate } from "react-router-dom";
import { ICallRenewal } from "../../../common/interfaces/funds.interfaces";
import ItemsEditePage from "../pages/items-edit.page";

interface IPropTableColumnsActa{
  
    authorization: IAuthorization,
    setMessage: Dispatch<SetStateAction<IMessage>>,
    getValues: UseFormGetValues<ICallRenewal>
    valueAction: string,
    dataTableServices: any[]
}

export default function usetableColumnsActa({ authorization, valueAction, dataTableServices, getValues, setMessage }: IPropTableColumnsActa) {

    const [ idCitation, setIdCitation ] = useState({ id: '' })
    //const { approveCitation } = useActaApi();
    const [ checked, setChecked ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            setMessage({});
        }
    },[])

   

    const tableColumnsRenewal: ITableElement<ICallRenewal>[] = [
        {
            fieldName: "fund",
            header: "Fondo",
    },
        {
            fieldName: "enabled",
            header: "Nro habilitados"
        },
        {
            fieldName: "renewed",
            header: "Nro renovados",
        },
        {
            fieldName: "percentage",
            header: "Porcentaje",
        },

    ];



    const tableActionsEdit: ITableAction<ICallRenewal>[] = [
        {
            icon: "Edit",
            onClick: (row) => {
                const dataEditTable: ICallRenewal = {
                    fund: getValues('fund'),
                    enabled: getValues('enabled'),
                    renewed: getValues('renewed'),
                    percentage: getValues('percentage'),

                }

                setMessage({
                    show: true,
                    title: "Editar ítem",
                    description: <ItemsEditePage renewal={dataEditTable} renewalitem={row}  />,
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


    return {
        tableColumnsRenewal,
        tableActionsEdit,
    }
}