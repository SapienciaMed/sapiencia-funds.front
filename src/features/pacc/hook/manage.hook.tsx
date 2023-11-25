import { useParams } from "react-router-dom"
import { IManagePage } from "../interface/pacc"
import TabsManageTechnical from "../components/tabs-manage-technical"
import { usePaccServices } from "./pacc-serviceshook"
import { useEffect, useState } from "react"
import { EResponseCodes } from "../../../common/constants/api.enum"

export const useManage = () => {

    const { id } =  useParams()
    const {GeBeneficiaryById} = usePaccServices()
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

    useEffect(() => {
        GeBeneficiaryById(id).then(response => {
            if(response.operation.code === EResponseCodes.OK){
                console.log(response.data)
                setDataManager({
                    title: "Consolidación del crédito",
                    beneficiaryInformationValues: {
                        idCredit: String(response.data.creditId),
                        document: response.data.document,
                        name: response.data.fullName,
                        contactNumber: response.data.contactNumber,
                        email: response.data.email,
                        program: response.data.program,
                        draftsProjected: '', // faltan del servicio
                        draftsPerformed: '', // faltan del servicio
                        dateInput: '', // faltan del servicio
                        reasonCompletion: '' // faltan del servicio
                    },
                    component: <TabsManageTechnical/>
                })
            }
        })
    },[])

    return {
        dataManager,
    }

}