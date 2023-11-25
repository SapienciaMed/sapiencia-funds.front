import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IConsolidationTrayForTechnicianCollection, IConsolidationTrayForTechnicianCollectionParams, ICutInterface } from "../interface/pacc";

export const usePaccServices = () => {
    const baseURL: string = process.env.urlApiFunds || "";
    const roleUrl: string = "/api/v1/consolidation-tray"; 
    const { get, post } = useCrudService( baseURL);

    async function GetCutsForConsolidationTray(): Promise<ApiResponse<ICutInterface[]>> {
        const endpoint: string = "/get-cuts-generic"; 
        return get(`${roleUrl}${endpoint}`);
    }

    async function GeConsolidationTrayTechnicianCollectionByCut(data: IConsolidationTrayForTechnicianCollection): Promise<ApiResponse<any>> {
        const endpoint: string = "/get-consolidation-tray-technician-collection-by-cut"; 
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

    return {
        GetCutsForConsolidationTray,
        GeConsolidationTrayTechnicianCollectionByCut,
        GeBeneficiaryById,
        UpdateCutBeneficiary
    }

}