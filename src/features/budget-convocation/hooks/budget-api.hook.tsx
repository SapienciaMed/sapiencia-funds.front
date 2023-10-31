import { EResponseCodes } from "../../../common/constants/api.enum";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ICallBudget, IProgramTypes } from "../../../common/interfaces/funds.interfaces";
import { ApiResponse } from "../../../common/utils/api-response";


export default function useBudgetApi() {
    const baseURL: string = process.env.urlApiFunds || "";
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
    async function getbudget(): Promise<ApiResponse<ICallBudget[]>> {
        try{
            return await get(`${serviceUrlSapiencia}/call-budget/get-all`);
        } catch (error) {
            return new ApiResponse(
                {} as ICallBudget[],
                EResponseCodes.FAIL,
                "Error no controlado"
            );
        }
    }

    async function downloadCallBudget(id: number): Promise<ApiResponse<any>> {
        try {
          const endpoint: string = `/download/${id}`;
          return await get(`${serviceUrlSapiencia}${endpoint}`);
        } catch (error) {
          return new ApiResponse(false, EResponseCodes.FAIL, "Error no controlado");
        }
      }

    return {
        getAnnouncement,
        getbudget,
        downloadCallBudget,
    }
}