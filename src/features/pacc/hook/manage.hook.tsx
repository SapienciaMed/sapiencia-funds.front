import { useNavigate, useParams } from "react-router-dom"
import { IManagePage } from "../interface/pacc"
import TabsManageTechnical from "../components/tabs-manage-technical"
import { usePaccServices } from "./pacc-serviceshook"
import { useContext, useEffect, useState } from "react"
import { EResponseCodes } from "../../../common/constants/api.enum"
import { AppContext } from "../../../common/contexts/app.context"

export const useManage = () => {

    const { id } =  useParams()
    const navigate = useNavigate();
    const {GeBeneficiaryById} = usePaccServices()
    const [uploadedFileName, setUploadedFileName] = useState("");
    const { setMessage } = useContext(AppContext);
    const [dataManager, setDataManager] = useState<IManagePage>({
        title: "",
        beneficiaryInformationValues: {
            idCredit: "",
            document: "",
            name: "",
            contactNumber: "",
            email: "",
            program: "",
            draftsProjected: "",
            draftsPerformed: "",
            dateInput: "",
            reasonCompletion: ""
        },
        component: <></>
    })
    const [ showSpinner,  setShowSpinner ] = useState(false)

    useEffect(() => {
        setShowSpinner(true)
        GeBeneficiaryById(id).then(response => {
            if(response.operation.code === EResponseCodes.OK){
                const date = new Date(response.data.dateIncome);
                const day = date.getUTCDate();
                const month = date.getUTCMonth() + 1;
                const year = date.getUTCFullYear();

                setDataManager({
                    title: "Consolidación del crédito",
                    beneficiaryInformationValues: {
                        idCredit: String(response.data.creditId),
                        document: response.data.document,
                        name: response.data.fullName,
                        contactNumber: response.data.contactNumber,
                        email: response.data.email,
                        program: response.data.program,
                        draftsProjected: String(response.data.countSpinProjected),
                        draftsPerformed: String(response.data.countSpins), 
                        dateInput: `${ day < 10 ? '0' + day :  day}/${ month < 10 ? '0'+ month :  month }/${year}`, 
                        reasonCompletion: response.data.reason 
                    },
                    component: <TabsManageTechnical document={response.data.document}/>
                })

                setShowSpinner(false)
            }
        })
    },[])

    useEffect(() => {
        return () => {
            setDataManager({
                title: "",
                beneficiaryInformationValues: {
                    idCredit: "",
                    document: "",
                    name: "",
                    contactNumber: "",
                    email: "",
                    program: "",
                    draftsProjected: "",
                    draftsPerformed: "",
                    dateInput: "",
                    reasonCompletion: ""
                },
                component: <></>
            })
        }
    },[])

    const onCancel = () => {
        setMessage({
            show: true,
            title: "Cancelar",
            description: "¿Segur@ que deseas cancelar",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                setMessage((prev) => ({ ...prev, show: false }));
                navigate('/fondos/pacc/bandeja-consolidacion')  
            },
            background: true,
          });
        
    }

    return {
        dataManager,
        showSpinner,
        onCancel
    }

}