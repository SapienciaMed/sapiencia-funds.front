import { EResponseCodes } from "../constants/api.enum";
import { IAuthorization } from "../interfaces/auth.interfaces"
import {IUploadInformation} from "../interfaces/funds.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useUploadService(){
  const baseURL: string = process.env.urlApiFunds;
  const authUrl: string = "/api/v1/uploadInformation";

    const { get, post, put } = useCrudService(baseURL);

    async function getUpload(): Promise<ApiResponse<IUploadInformation[]>> {
      try {
        
        return await get(`${authUrl}`);
      } catch (error) {
        return new ApiResponse(
          {} as IUploadInformation[],
          EResponseCodes.FAIL,
          "Error no controlado"
        );
      }
    }
  
    async function getUploadById(id: number): Promise<ApiResponse<IUploadInformation[]>> {
      try {
        const endpoint: string = `/${id}`;
        return await get(`${authUrl}${endpoint}/`);
      } catch (error) {
        return new ApiResponse(
          {} as IUploadInformation[],
          EResponseCodes.FAIL,
          "Error no controlado"
        );
      }
    }
    
      return {
        getUpload,
        getUploadById,
      };
}
  
export default useUploadService;