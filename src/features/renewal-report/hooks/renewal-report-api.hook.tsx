import { EResponseCodes } from "../../../common/constants/api.enum";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ICallRenewal, IProgramTypes, IRenewalDataGrid } from "../../../common/interfaces/funds.interfaces";
import { ApiResponse } from "../../../common/utils/api-response";


export default function useRenewalReportApi() {
    const baseURL: string = process.env.urlApiFunds || "";
    const serviceUrl: string = "/api/v1/renovacion";
    const serviceUrlSapiencia: string = "/api/v1/sapiencia";

    const { get, post, put } = useCrudService(baseURL);

    async function getAnnouncement(): Promise<ApiResponse<IProgramTypes[]>> {
        try {
            return await get(`${serviceUrlSapiencia}/call-periods/get-all`);
        } catch (error) {
            return new ApiResponse(
                {} as IProgramTypes[],
                EResponseCodes.FAIL,
                "Error no controlado"
            );
        }
    }
    async function getRenewalReport(
        data: ICallRenewal
      ): Promise<ApiResponse<ICallRenewal[]>> {
        return await post(`${serviceUrl}/getrenewal-paginated/`, data);
      }


      async function createRenewal(
        data: ICallRenewal
      ): Promise<ApiResponse<ICallRenewal>> {
        return await post(`${serviceUrl}/create/`, data);
      }
    
    return {
        getAnnouncement,
        getRenewalReport,
        createRenewal,
    }
}