import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import {
  IMasterActivity,
  IProgramTypes,
} from "../../../common/interfaces/funds.interfaces";

export default function useVotingItemApi() {
  const baseURL: string = process.env.urlApiFunds || "";
  const serviceUrl: string = "/api/v1/voting";
  const serviceUrlActivity: string = "/api/v1/activities";

  const { get, post, put } = useCrudService(baseURL);

  async function getMasterVotingById(
    id: number
  ): Promise<ApiResponse<IMasterActivity[]>> {
    return await get(`${serviceUrl}/${id}`);
  }

  async function createVotingResults(
    data: IMasterActivity
  ): Promise<ApiResponse<IMasterActivity>> {
    return await post(`${serviceUrl}/create/`, data);
  }

  async function editVotignResults(
    id: number,
    data: IMasterActivity
  ): Promise<ApiResponse<IMasterActivity>> {
    return await put(`${serviceUrl}/edit/${id}`, data);
  }

  async function getActivityProgram(id: number): Promise<ApiResponse<IProgramTypes[]>> {
    return await get(`${serviceUrl}/getActivityProgram/${id}`);
  }

  async function getProgramTypes(): Promise<ApiResponse<IProgramTypes[]>> {
    return await get(`${serviceUrlActivity}/programtypes/`);
  }
  
  return {
    getMasterVotingById,
    createVotingResults,
    editVotignResults,
    getActivityProgram,
    getProgramTypes,
  };
}
