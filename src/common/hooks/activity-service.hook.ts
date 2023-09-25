import { EResponseCodes } from "../constants/api.enum";
import { IAuthorization } from "../interfaces/auth.interfaces"

import {
    IMasterActivity,
  } from "../interfaces/funds.interfaces";
  import { ApiResponse } from "../utils/api-response";
  import useCrudService from "./crud-service.hook";

export function useActivityService(){
  const baseURL: string = process.env.urlApiFunds;
  const authUrl: string = "/api/v1/activities";
 
  const { get, post, put } = useCrudService( baseURL);

  async function getActivity(): Promise<ApiResponse<IMasterActivity[]>> {
    try {
      
      return await get(`${authUrl}`);
    } catch (error) {
      return new ApiResponse(
        {} as IMasterActivity[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getActivityById(id: number): Promise<ApiResponse<IMasterActivity[]>> {
    try {
      const endpoint: string = `/${id}`;
      return await get(`${authUrl}${endpoint}/`);
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
    getActivityById
    
  };
  
}
  
export default useActivityService;