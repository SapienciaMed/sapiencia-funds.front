import { useContext, useEffect, useRef, useState } from "react";
import { ITableAction, ITableElement } from "../../../common/interfaces";
import { IConsolidationTrayForTechnicianCollection, IConsolidationTrayForTechnicianCollectionParams, IStepCashing } from "../interface/pacc";
import { usePaccServices } from "./pacc-serviceshook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { useForm } from 'react-hook-form';
import { AppContext } from "../../../common/contexts/app.context";
import ChangeCuttingBeneficiary from "../components/change-cutting-beneficiary";
import { useNavigate } from "react-router-dom";

export default function useTechnicianStepCashing() {
    
    const navigate = useNavigate();
    const tableComponentRef = useRef(null);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const { setMessage } = useContext(AppContext);
    const { GetCutsForConsolidationTray } = usePaccServices()
    const [idCutData, setIdCutData] = useState<IDropdownProps[]>([]);
    const [ listSearch, setListSearch ] = useState({
        data: {},
        status: false
    })
    const [valueFilterTable, setValueFilterTable ] = useState('')

    const {
        control,
        setValue,
        getValues,
    } = useForm<IStepCashing>();
    
    useEffect(() => {
        loadTableData()
        GetCutsForConsolidationTray().then(response => {
            if(response.operation.code === EResponseCodes.OK){
                const data = response.data?.map((item: any) => {
                    return {
                        name: item.name,
                        value: item.id
                    }
                })
                const newData = [
                    ...data,
                    { name: 'Todos', value: 'TODOS' }
                ];

                setValue('idCut', newData[0].value)
                setIdCutData(newData)
            }
        })

        return () => {
            setListSearch({
                data: {},
                status: false
            })
        }
    }, [])

    useEffect(() => {
        if (listSearch.status) {
            loadTableData(listSearch.data)
        }
    },[listSearch])

    const tableColumns: ITableElement<IConsolidationTrayForTechnicianCollectionParams>[] = [
        {
            fieldName:'creditId',
            header: 'Id crédito'
        },
        {
            fieldName:'nroFiducy',
            header: 'Nro contrato fiduciario'
        },
        {
            fieldName:'document',
            header: 'Documento'
        },
        {
            fieldName:'fullName',
            header: 'Nombres y Apellidos'
        },
        {
            fieldName:'program',
            header: 'Programa'
        },
        {
            fieldName:'legalDate',
            header: 'Fecha legalización'
        },
        {
            fieldName:'dateIncomeCut',
            header: 'Fecha ingreso al corte',
            renderCell(row) {
                const date = new Date(row.dateIncomeCut);
                const day = date.getUTCDate();
                const month = date.getUTCMonth() + 1;
                const year = date.getUTCFullYear();

                return(
                    <div>
                       {year}/{ month < 10 ? '0'+ month :  month }/{ day < 10 ? '0' + day :  day}
                    </div>
                )
            },
        },
        {
            fieldName:'cut',
            header: 'Corte'
        },
        {
            fieldName:'dateFinallyCut',
            header: 'Fecha final corte',
            renderCell(row) {
                const date = new Date(row.dateFinallyCut);
                const day = date.getUTCDate();
                const month = date.getUTCMonth() + 1;
                const year = date.getUTCFullYear();

                return(
                    <div>
                       {year}/{ month < 10 ? '0'+ month :  month }/{ day < 10 ? '0' + day :  day}
                    </div>
                )
            },
        },
        {
            fieldName:'dateEndGracePeriod',
            header: 'Fecha fin periodo de gracia',
            renderCell(row) {
                const date = new Date(row.dateEndGracePeriod);
                const day = date.getUTCDate();
                const month = date.getUTCMonth() + 1;
                const year = date.getUTCFullYear();

                return(
                    <div>
                       {year}/{ month < 10 ? '0'+ month :  month }/{ day < 10 ? '0' + day :  day}
                    </div>
                )
            },
        },
        {
            fieldName:'status',
            header: 'Estado'
        },
        {
            fieldName:'reason',
            header: 'Motivo'
        },
        {
            fieldName:'characterization',
            header: 'Caracterización'
        },
        {
            fieldName:'currentResponsible',
            header: 'Responsable actual'
        }
    ]

    const tableActions: ITableAction<IConsolidationTrayForTechnicianCollectionParams>[] = [
        {
            icon: "ChangeCut",
            onClick: (row) => {
                let newArray = idCutData.filter(item => item.value !== "TODOS");
               setMessage({
                    show: true,
                    title: "Mover beneficiario a otro corte",
                    description: <ChangeCuttingBeneficiary idBenef={row.idBenef}  idCutData={newArray} />,
                    background: true,
                    onOk() {
                        setMessage({});
                    },
                });
               
            },
        },
        {
            icon: "Manage",
            onClick: (row) => {
                navigate('./gestion')
            },
        },
       
    ];
    
    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    const handleFilterChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        setValueFilterTable(value.target.value)
        timer &&  clearTimeout(timer);  
        const newTimer =  setTimeout(() => {
            if (value.target.value != undefined && value.target.value.length > 0 && getValues('idCut') != null) {
                const searchCriteriaData = {
                    searchParam: value.target.value,
                    [(getValues('idCut') == 'TODOS' ? 'cutParamName' : 'cutParamId' )]: getValues('idCut') ,
                    page: 1,
                    perPage: 10
                }
                setListSearch({
                    data: searchCriteriaData,
                    status: true
                })
            }else{
                setListSearch({
                    data: {},
                    status: false
                })
                loadTableData()
            }
        }, 800);

        setTimer(newTimer);
    }
    const handleChangeCut = (value: any) => {
        if (value != null) {
            const data: IConsolidationTrayForTechnicianCollection = {
                [(value === 'TODOS') ? 'cutParamName' : 'cutParamId']: value,
                searchParam: valueFilterTable || '',
                page: 1,
                perPage: 10
            }
    
            setListSearch({
                data,
                status: true
            })
        }
    } 

    return{
        tableComponentRef,
        tableColumns,
        tableActions,
        idCutData,
        control,
        listSearch,
        handleFilterChange,
        handleChangeCut
    }
}