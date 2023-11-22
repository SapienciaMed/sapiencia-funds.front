import { useContext, useEffect, useRef, useState } from "react";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IActaItems } from "../../../common/interfaces/actaItems.interface";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import { EResponseCodes } from "../../../common/constants/api.enum";
//import useActaApi from "./acta-api.hook";
import { IActa } from "../../../common/interfaces/acta.interface";
import { v4 as uuidv4 } from 'uuid';
import { createActaItems } from "../../../common/schemas/actaItems-shema";
import { vigencyActas } from "../../../common/schemas/vigency-acta-shema";
import { IUserDataGrid } from "../../../common/interfaces";
import { ICallRenewal } from "../../../common/interfaces/funds.interfaces";


export default function useActaItems(action, acta: ICallRenewal, dataTableServices?: any[]) {
    //contex
    const { setMessage, setDataGridItems, dataGridItems, } = useContext(AppContext);

    //peticiones api
    //const { getProgramTypes, getMaster, getAnnouncement } = useActaApi();

    //refs
    const tableComponentRef = useRef(null);

    //Validaciones  

    let resolver: any;



    //states
    const [showTable, setShowTable] = useState(false);
    const [datos, setDatos] = useState<IActaItems[]>([]);
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
    const [resourcesCredit, setResourcesCredit] = useState("0");
    //const [dataActa, setDataActa] = useState<IActa>(acta);
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
    } = useForm<IActaItems>({ resolver });

    const handleSelectChange = (event) => {
        const { value } = event.target;
    };

    //capturar el value de los select
    const selectedFound = watch('found');
    const selectedLine = watch('line');
    const selectedProgram = watch('program');
    const selectedAnnouncement = watch('announcement');
    const selectedConcept = watch('concept');
    const selectsubtotalVigency = watch('subtotalVigency')

    const getSelectedLabel = (value, list) => {
        const selectedOption = list.find(option => option.value === value);
        return selectedOption ? selectedOption.name : null;
    };

    const selectedLabelFound = getSelectedLabel(selectedFound, foundList);
    const selectedLabelLine = getSelectedLabel(selectedLine, lineList);
    const selectedLabelProgram = getSelectedLabel(selectedProgram, programList);
    const selectedLabelAnnouncement = getSelectedLabel(selectedAnnouncement, announcementList);
    const selectedLabelConcept = getSelectedLabel(selectedConcept, conceptList);




    const calculateValues = (subtotalVigency, costsExpenses, selectedLabel, financialOperation, OperatorCommission) => {
        const multiplicacion = parseInt(subtotalVigency) * costsExpenses / 100;
        const resta = parseInt(subtotalVigency) - multiplicacion;

        let financialOperatorCommission = "0";
        let resourcesCredit = "0";

        if (resta !== 0) {
            if (selectedLabel === 'MEJORES BACHILLERES' && (financialOperation || OperatorCommission)) {
                const porcentajeOperacion = selectedLabel === 'MEJORES BACHILLERES' ? financialOperation : OperatorCommission;
                const divisor = 1 + porcentajeOperacion;
                const resultadoOperacion1 = resta - (resta / divisor);
                const resultadoOperacion2 = resta / divisor;
                financialOperatorCommission = String(resultadoOperacion1);
                resourcesCredit = String(resultadoOperacion2);
            }
        }
        setValue("costBillsOperation", multiplicacion || 0);
        setValue("net", resta || 0);
        setValue("financialOperatorCommission", Number(financialOperatorCommission) || 0);
        setValue("resourcesCredit", Number(resourcesCredit) || 0);
        return {
            net: resta.toString(),
            costBillsOperation: multiplicacion.toString(),
            financialOperatorCommission,
            resourcesCredit
        };
    };



    function loadTableData(searchCriteria?: object): void {
        if (tableComponentRef.current) {
            tableComponentRef.current.loadData(searchCriteria);
        }
    }

    //useEffects
    useEffect(() => {
        loadTableData()
    }, [])

    useEffect(() => {
        reset();
        if (showTable) {
            tableComponentRef.current.emptyData();
            setShowTable(true);
        }
    }, []);

    

    

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
        foundList,
        typeProgram,
        programList,
        lineList,
        conceptList,
        announcementList,
        setCostBillsOperationt,
        costBillsOperation,
        setNet,
        neto,
        financialOperatorCommission,
        resourcesCredit,
        handleSelectChange,
        CancelFunction,
        periods
    }
}