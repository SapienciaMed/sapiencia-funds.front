import { useCallback, useContext, useEffect, useRef, useState } from "react";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ICallRenewal } from "../../../common/interfaces/funds.interfaces";


export default function useActaItems(renewalitem, renewal: ICallRenewal, dataTableServices?: any[]) {
    //contex
    const { setMessage, setdataGridRenewal, dataGridRenewal } = useContext(AppContext);
    const [selectedRenewal, setSelectedRenewal] = useState<ICallRenewal | null>(null);

    //refs
    const tableComponentRef = useRef(null);

    //Validaciones  

    let resolver: any;


    //states
    const [showTable, setShowTable] = useState(false);
    const [datos, setDatos] = useState<ICallRenewal[]>([]);
    const [typeProgram, setTypeProgram] = useState([]);
    const [masterList, setMasterList] = useState([]);
    const [programList, setProgramList] = useState([]);
    const [foundList, setFoundList] = useState([]);
    const [lineList, setLineList] = useState([]);
    const [announcementList, setAnnouncementList] = useState([]);
    const [conceptList, setConceptList] = useState([]);
    const [costBillsOperation, setCostBillsOperationt] = useState("0");
    const [neto, setNet] = useState("0");
    const [financialOperatorCommission, setFinancialOperatorCommission] = useState("0");
    //const [dataActa, setDataActa] = useState<IActa>(acta);
    const [resourcesCredit, setResourcesCredit] = useState("0");
    const [periods, setPeriods] = useState("");
    
    //form
    const {
        handleSubmit,
        register,
        control: control,
        setValue,
        reset,
        watch,
        formState: { errors },
    } = useForm<ICallRenewal>({ resolver });

    const handleSelectChange = (event) => {
        const { value } = event.target;
    };

    //capturar el value de los select
    const selectedFound = watch('fund');
    const selectedLine = watch('enabled');
    const selectedProgram = watch('renewed');
    const selectedAnnouncement = watch('percentage');


    const getSelectedLabel = (value, list) => {
        const selectedOption = list.find(option => option.value === value);
        return selectedOption ? selectedOption.name : null;
    };

    const selectedLabelFound = getSelectedLabel(selectedFound, foundList);
    const selectedLabelLine = getSelectedLabel(selectedLine, lineList);
    const selectedLabelProgram = getSelectedLabel(selectedProgram, programList);
    const selectedLabelAnnouncement = getSelectedLabel(selectedAnnouncement, announcementList);
  




    const calculateValues = (subtotalVigency, costsExpenses, selectedLabel, financialOperation, OperatorCommission) => {
        const multiplicacion = parseInt(subtotalVigency) * costsExpenses / 100;
        const resta = parseInt(subtotalVigency) - multiplicacion;

        let financialOperatorCommission = "0";
        let resourcesCredit = "0";


    };

    const calculatePercentage = (renewed, enabled) => {
        if (enabled === 0) {
            return 0;
        } else {
            return (renewed / enabled) * 100;
        }
    };

    useEffect(() => {
        setSelectedRenewal(renewal);
        // Resto del código...
    }, []);

    const updateDataGridRenewal = () => {
        const selectedFound = watch('enabled');
        if (selectedRenewal) {
            
            const updatedDataGrid = dataGridRenewal.map(row => {
                if (row.fund === selectedRenewal.fund) {
                    return { 
                        ...row, 
                        enabled: selectedFound,
                        percentage:calculatePercentage(row.renewed, selectedFound).toFixed(2) + "%",
                    };
                }
                return row;
            });
    
            setdataGridRenewal(updatedDataGrid);
            setSelectedRenewal(null); 
            CancelFunction();
        }
    };


   

    //Al momento de que el componente se desmonte reinicie todo
    useEffect(() => {   
        return () => {
            reset();
            setShowTable(false);
            setDatos([]);
            setTypeProgram([]);
            setMasterList([]);
            setProgramList([]);
            setFoundList([]);
            setLineList([]);
            setAnnouncementList([]);
            setConceptList([]);
            setCostBillsOperationt("0");
            setNet("0");
            setFinancialOperatorCommission("0");
            setResourcesCredit("0");
            //setDataActa(acta);
            setPeriods("");
        };
    }, []);

    const CancelFunction = () => {
        setMessage((prev) => ({ ...prev, show: false }));
    };

    return {
        control,
        errors,
        register,
        setValue,
        setShowTable,
        showTable,
        tableComponentRef,
        datos,
        updateDataGridRenewal,
        CancelFunction,
        
    }
}