import { Data } from "ws";
import { EResponseCodes } from "../../../common/constants/api.enum";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ICallRenewal, IProgramTypes} from "../../../common/interfaces/funds.interfaces";
import { ApiResponse } from "../../../common/utils/api-response";

interface ApiRes {
  array: ICallRenewal[];
  meta: {
    total: number;
    per_page: number;
    current_page: number | null;
    last_page: number;
    first_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    previous_page_url: string | null;
  };
}

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

    async function report(
        data: ICallRenewal
      ): Promise<ApiResponse<any[]>> {
        return await post(`${serviceUrl}/getrenewal-paginated/`, data);
      }
      
      
      async function createRenewal(
        data: ICallRenewal
        ): Promise<ApiResponse<ICallRenewal>> {
          return await post(`${serviceUrl}/create/`, data);
        }
        async function calculate(period:string): Promise<ApiResponse<any>> {
            return await get(`${serviceUrl}/calculate/${period}`);
          }
    
    return {
        getAnnouncement,
        getRenewalReport,
        createRenewal,
        report,
        calculate
    }
}