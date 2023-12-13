import { useCallback, useContext, useEffect, useRef, useState } from "react";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ICallRenewal } from "../../../common/interfaces/funds.interfaces";
import useRenewalReportApi from "./renewal-report-api.hook";
import { renewalCreateSchema } from "../../../common/schemas/renewal-shema";
import ItemsEditePage from "../pages/items-edit.page";


export default function useActaItems(renewalitem, renewal: ICallRenewal, selectedperiodo: string, loadTableData: (value?: object) => void, dataTableServices?: any[]) {
    //contex
    const { setMessage, setdataGridRenewal, dataGridRenewal } = useContext(AppContext);
    const [selectedRenewal, setSelectedRenewal] = useState<ICallRenewal | null>(null);

    //refs
    const tableComponentRef = useRef(null);

    //Validaciones  

    const resolver = useYupValidationResolver(renewalCreateSchema);

    //peticiones api
    const { getAnnouncement, getRenewalReport, createRenewal } = useRenewalReportApi();




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
    const [percentage, setPercentage] = useState(0);

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

    const enabled = watch('enabled')

    useEffect(() => {
        setValue("fund", renewal.fund)
        //setValue("percentage",renewal.percentage)
        setValue("renewed", renewal.renewed)

    }, [renewal])


    useEffect(() => {
        if (Number(enabled) > 0 && Number(renewal.renewed) > 0) {
            const porcentaje = (Number(enabled) * 100 / Number(renewal.renewed)).toFixed(2);
            setValue("percentage", porcentaje);
        } else {
            setValue("percentage", "0");
        }
    }, [enabled, renewal]);


    useEffect(() => {
        setSelectedRenewal(renewal);
        // Resto del código...
    }, []);

    const updateDataGridRenewal = handleSubmit(async (data: any) => {

        const datos = {

            fund: String(data.fund),
            enabled: data.enabled,
            renewed: data.renewed,
            percentage: String(data.percentage),
            period: String(selectedperiodo)

        };

        setMessage({
            show: true,
            title: "Guardar cambios",
            description: "¿Estás segur@ de guardar la información?",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                confirmCreation(datos)
            },
            onCancel() {
                /* reset();
                setMessage({}); */
                setMessage({
                    show: true,
                    title: "Editar ítem",
                    description: <ItemsEditePage renewal={renewal} renewalitem={renewal} selectedperiodo={selectedperiodo} loadTableData={loadTableData} />,
                    background: true,
                    size: "items",
                    items: true,
                    onOk() {
                        setMessage({});
                    },
                });
            },
            background: true

        });
    });


    const confirmCreation = async (datos: ICallRenewal) => {

        const res = await createRenewal(datos);

        console.log('res', res)

        if (res && res?.operation?.code === EResponseCodes.OK) {
            setMessage({
                OkTitle: "Aceptar",
                description: "Guardado exitosamente",
                title: "Guardar información",
                show: true,
                type: EResponseCodes.OK,
                background: true,
                onOk() {
                    reset();
                    setMessage({});
                    //navigate("/fondos/maestros/consultar");
                    loadTableData({
                        period: selectedperiodo
                    })
                },
                onClose() {
                    reset();
                    setMessage({});
                },
            });
        } else {
            setMessage({
                type: EResponseCodes.FAIL,
                title: "Validación de datos",
                description: "¡El dato ya existe!",
                show: true,
                OkTitle: "Aceptar",
                background: true,
            });
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

        setMessage({
            show: true,
            title: "Cancelar edición ",
            description: "¿Estás segur@ de cancelar la edición?",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                setMessage({});
            },
            onCancel() {
                /* reset();
                setMessage({}); */
                setMessage({
                    show: true,
                    title: "Editar ítem",
                    description: <ItemsEditePage renewal={renewal} renewalitem={renewal} selectedperiodo={selectedperiodo} loadTableData={loadTableData} />,
                    background: true,
                    size: "items",
                    items: true,
                    onOk() {
                        setMessage({});
                    },
                });
            },
            background: true,
        });        
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