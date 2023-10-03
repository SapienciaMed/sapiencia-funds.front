import { EResponseCodes } from "../constants/api.enum";
import {IWorker} from "../interfaces/funds.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useFundsService(){
    const baseURL: string = process.env.urlApiFunds;
    const authUrl: string = "/api/v1/upload";

    const { get, post, put } = useCrudService(baseURL);

    async function getWorkers(): Promise<ApiResponse<IWorker[]>> {
        try {
          const endpoint: string = `/worker`;
          return await get(`${authUrl}${endpoint}`);
        } catch (error) {
          return new ApiResponse(
            {} as IWorker[],
            EResponseCodes.FAIL,
            "Error no controlado"
          );
        }
      }
    
      return {
        getWorkers,
      };
}
  
export default useFundsService;