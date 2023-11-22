import { useEffect, useRef, useState } from "react";
import { ITableAction, ITableElement } from "../../../common/interfaces";
import { DropdownChangeEvent } from "primereact/dropdown";
import { IConsolidationTrayForTechnicianCollection, IConsolidationTrayForTechnicianCollectionParams, IStepCashing } from "../interface/pacc";
import { usePaccServices } from "./pacc-serviceshook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { useForm } from 'react-hook-form';

export default function useTechnicianStepCashing() {
    
    const tableComponentRef = useRef(null);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const { GetCutsForConsolidationTray, GeConsolidationTrayTechnicianCollectionByCut } = usePaccServices()
    const [idCutData, setIdCutData] = useState<IDropdownProps[]>([]);
    const [ listSearch, setListSearch ] = useState({
        data: {},
        status: false
    })

    const {
        control,
        setValue,
        getValues,
        watch,
    } = useForm<IStepCashing>();

    const valueMap: { [key: number]: string } = {
        24: 'Corte 3',
        16: 'Corte 1',
        23: 'Corte 2'
    };

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
                setValue('idCut', data[0].value)
                setIdCutData(data)
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
            header: 'Fecha ingreso al corte'
        },
        {
            fieldName:'cut',
            header: 'Corte'
        },
        {
            fieldName:'dateFinallyCut',
            header: 'Fecha final corte'
        },
        {
            fieldName:'dateEndGracePeriod',
            header: 'Fecha fin periodo de gracia'
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

    const tableActions: ITableAction<any>[] = [
        {
            icon: "ChangeCut",
            onClick: (row) => {
               
            },
        },
        {
            icon: "Manage",
            onClick: (row) => {
               
            },
        },
       
    ];
    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    const handleFilterChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        timer &&  clearTimeout(timer);  
        const newTimer =  setTimeout(() => {
            if (value.target.value != undefined && value.target.value.length > 0) {
                console.log("peticion", value.target.value);
                console.log('corte:', getValues('idCut'));
                
                const searchCriteriaData = {
                    searchCriteria: value.target.value,
                    cutParamName: valueMap[getValues('idCut')] || '',
                    page: 1,
                    perPage: 10
                }

                setListSearch({
                    data: searchCriteriaData,
                    status: true
                })
            } 
        }, 800);

        setTimer(newTimer);
    }
    const handleChangeCut = (value: any) => {

        const data: IConsolidationTrayForTechnicianCollection = {
            cutParamName: valueMap[value] || '',
            page: 1,
            perPage: 10
        }
       
        setListSearch({
            data,
            status: true
        })
        
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