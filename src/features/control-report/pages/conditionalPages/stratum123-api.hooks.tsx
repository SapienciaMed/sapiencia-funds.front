import useCrudService from "../../../../common/hooks/crud-service.hook";
import { IStratum123 } from "../../../../common/interfaces/stratum123.interface";
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


//   async function editVotignResults(
//     id: number,
//     data: IMasterActivity
//   ): Promise<ApiResponse<IMasterActivity>> {
//     return await put(`${serviceUrl}/edit/${id}`, data);
//   }

//   async function getActivityProgram(
//     id: number
//   ): Promise<ApiResponse<IProgramTypesActivity[]>> {
//     return await get(`${serviceUrl}/getActivityProgram/${id}`);
  //}


  return {
    getEstratum123,
    // createVotingResults,
    // editVotignResults,
    // getActivityProgram,
  };
}
