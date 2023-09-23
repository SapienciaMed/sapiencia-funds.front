import { EResponseCodes } from "../constants/api.enum";
import { IAuthorization } from "../interfaces/auth.interfaces"

import {
    IMasterActivity,
  } from "../interfaces/funds.interfaces";
  import { ApiResponse } from "../utils/api-response";
  import useCrudService from "./crud-service.hook";

export function useActivityService(){
  const baseURL: string = process.env.urlApiPayroll;
  const authUrl: string = "/api/v1/activities";
 
  const { get, post, put } = useCrudService( baseURL);

  async function getActivity(): Promise<ApiResponse<IMasterActivity[]>> {
    try {
      const endpoint: string = `/`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IMasterActivity[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    getActivity,
  };
  
}
  
export default useActivityService;