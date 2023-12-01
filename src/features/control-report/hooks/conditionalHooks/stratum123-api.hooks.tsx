import { EResponseCodes } from "../../../../common/constants/api.enum";
import useCrudService from "../../../../common/hooks/crud-service.hook";
import { IItemUpdateStratum123, IStratum123 } from "../../../../common/interfaces/stratum123.interface";
import { ApiResponse } from "../../../../common/utils/api-response";




export default function useStratum123Api() {
  const baseURL: string = process.env.urlApiFunds || "";
  const baseURLProjects: string = process.env.urlApiProjects || "";

  const serviceUrl: string = "/api/v1/controlSelect";


  const { get, post, put } = useCrudService(baseURL);


  async function getEstratum123(
    data: IStratum123
  ): Promise<ApiResponse<IStratum123>> {
    return await post(`${serviceUrl}/getInfoEstratos123/`, data);
  }

  async function updateStratum123Item(
    id: number,
    data: IItemUpdateStratum123
  ): Promise<ApiResponse<IItemUpdateStratum123>> {
    return await put(`${serviceUrl}/updateStratum123/${id}`, data);
  }

  async function downloadFile(data: Object): Promise<ApiResponse<any>> {
    try {
      // const endpoint: string = `/get-report`;
      // return await post(`/api/v1/summary-priorizacion${endpoint}`, data);
      const endpoint: string = "/getInfoEstratos123Xlsx";
      return await post(`${serviceUrl}${endpoint}`, data);
    } catch (error) {
      return new ApiResponse(false, EResponseCodes.FAIL, "Error no controlado");
    }
  }

//   async function getActivityProgram(
//     id: number
//   ): Promise<ApiResponse<IProgramTypesActivity[]>> {
//     return await get(`${serviceUrl}/getActivityProgram/${id}`);
  //}


  return {
    getEstratum123,
    updateStratum123Item,
    downloadFile,
  };
}
