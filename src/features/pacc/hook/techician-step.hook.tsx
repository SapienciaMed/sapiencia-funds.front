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
    const [ currentCutOffdDate, setCurrentCutOffdDate ] = useState([''])

    const {
        control,
        setValue,
        getValues,
    } = useForm<IStepCashing>();

    const valueMap: { [key: number]: string } = {
        24: 'Corte 3',
        16: 'Corte 1',
        23: 'Corte 2'
    };

    const formatearFecha = (fechaISO: string) => {
        const fecha = new Date(fechaISO);
        const dia = fecha.getUTCDate();
        const mes = fecha.getUTCMonth() + 1; 
        const anio = fecha.getUTCFullYear();
        const fechaFormateada = dia + '/' + (mes < 10 ? '0' : '') + mes + '/' + anio;
        
        return fechaFormateada;
    }

    useEffect(() => {
        loadTableData()
        GetCutsForConsolidationTray().then(response => {
            if(response.operation.code === EResponseCodes.OK){

                response.data.forEach((item, index) => {
                    setCurrentCutOffdDate(
                        (prevState) => {
                            return [
                                ...prevState,
                                `${item.name} - desde ${formatearFecha(item.from)} hasta ${formatearFecha(item.until)}`
                            ]
                        }
                    );
                });
                
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

    const tableActions: ITableAction<IConsolidationTrayForTechnicianCollectionParams>[] = [
        {
            icon: "ChangeCut",
            onClick: (row) => {
               const actualCut = currentCutOffdDate.find(item => item.includes(row.cut));
               setMessage({
                    show: true,
                    title: "Mover beneficiario a otro corte",
                    description: <ChangeCuttingBeneficiary actualCut={actualCut} idCutData={idCutData}/>,
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
        timer &&  clearTimeout(timer);  
        const newTimer =  setTimeout(() => {
            if (value.target.value != undefined && value.target.value.length > 0) {
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