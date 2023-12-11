import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IRequerimentsResultSimple } from "../components/manageTechnical/interface/manage-technical";
import { typePrefixeTabs } from "../helpers/TypePrefixeTab";
import { IConsolidationTrayForTechnicianCollection, IConsolidationTrayForTechnicianCollectionParams, ICutInterface } from "../interface/pacc";

export const usePaccServices = (typeState: number) => {
    console.log("🚀 ~ file: pacc-serviceshook.tsx:9 ~ usePaccServices ~ typeState:", typeState)
    const baseURL: string = process.env.urlApiFunds || "";
    const roleUrl: string = `/api/v1/${typePrefixeTabs(typeState)}`; 
    const { get, post } = useCrudService( baseURL);

    async function GetCutsForConsolidationTray(): Promise<ApiResponse<ICutInterface[]>> {
        const endpoint: string = "/get-cuts-generic"; 
        return get(`${roleUrl}${endpoint}`);
    }

    async function GeConsolidationTrayTechnicianCollectionByCut(data: IConsolidationTrayForTechnicianCollection): Promise<ApiResponse<any>> {
        const endpoint: string = "/get-consolidation-tray-by-cut"; 
        return post(`${roleUrl}${endpoint}`, data);
    }

    async function GeBeneficiaryById(id: string): Promise<ApiResponse<IConsolidationTrayForTechnicianCollectionParams>> {
        const endpoint: string = "/get-beneficiary-by-id"; 
        return get(`${roleUrl}${endpoint}/${id}`); 
    }

    async function UpdateCutBeneficiary(data: Object):Promise<ApiResponse<any>> {
        const endpoint: string = "/update-cut-beneficiary"; 
        return post(`${roleUrl}${endpoint}`, data);
    }

    async function GetRequirementsByBeneficiary(data: Object): Promise<ApiResponse<any>> {
        const endpoint: string = "/get-requirements-by-beneficiary"; 
        return post(`${roleUrl}${endpoint}`, data);
    }
    
    async function GetRequirementFile(id: string): Promise<ApiResponse<any>> {
        const endpoint: string = "/get-requirement-file"; 
        return get(`${roleUrl}${endpoint}/${id}`);
    }

    async function ComplianceAssignmentBeneficiary(data: Object): Promise<ApiResponse<any>> {
        const endpoint: string = "/compliance-assignment-beneficiary"; 
        return post(`${roleUrl}${endpoint}`, data);
    }

    async function DeleteUploadFiles(id: string, idbeneficiary): Promise<ApiResponse<any>> {
        const endpoint: string = "/delete-requirement-file"; 
        return post(`${roleUrl}${endpoint}/${id}/${idbeneficiary}`);
    }

    async function ChangeApproveOrRejectKnowledgeTransfer(data: Object): Promise<ApiResponse<any>> {
        const endpoint: string = "/change-approve-or-reject-knowledge-transfer"; 
        return post(`${roleUrl}${endpoint}`, data);
    }

    async function GetUploadKnowledgeTransferFiles(id: string): Promise<ApiResponse<any>> {
        const endpoint: string = "/get-knowledge-transfer-file"; 
        return get(`${roleUrl}${endpoint}/${id}`);
    }

    async function GetRequirementsKnowledgeTransfer(idBeneficiary: number ): Promise<ApiResponse<IRequerimentsResultSimple[]>> {
        const endpoint: string = "/get-requirements-knowledge-transfer"; 
        const params = { idBeneficiary }
        return post(`${roleUrl}${endpoint}`, params);
    }

    return {
        GetCutsForConsolidationTray,
        GeConsolidationTrayTechnicianCollectionByCut,
        GeBeneficiaryById,
        UpdateCutBeneficiary,
        GetRequirementsByBeneficiary,
        GetRequirementFile,
        ComplianceAssignmentBeneficiary,
        DeleteUploadFiles,
        ChangeApproveOrRejectKnowledgeTransfer,
        GetUploadKnowledgeTransferFiles,
        GetRequirementsKnowledgeTransfer
    }

}