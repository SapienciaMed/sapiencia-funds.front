import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IMasterActivity, IProgramTypes } from "../../../common/interfaces/funds.interfaces";

export default function useMasterActivityApi() {
  const baseURL: string = process.env.urlApiFunds || "";
  const serviceUrl: string = "/api/v1/activities";

  const { get, post, put } = useCrudService(baseURL);
  
  async function getMasterActivity(
  ): Promise<ApiResponse<IMasterActivity[]>> {
    return await get(`${serviceUrl}/`);
  }

  async function getMasterActivityById(
    id: number
  ): Promise<ApiResponse<IMasterActivity[]>> {
    return await get(`${serviceUrl}/${id}`);
  }

  async function createMasterActivity(
    data: IMasterActivity
  ): Promise<ApiResponse<IMasterActivity>> {
    return await post(`${serviceUrl}/create/`, data);
  }

  async function editMasterActivity(
    id: number,
    data: IMasterActivity
  ): Promise<ApiResponse<IMasterActivity>> {
    return await put(`${serviceUrl}/edit/${id}`, data);
  }

  async function getProgramTypes(
  ): Promise<ApiResponse<IProgramTypes[]>> {
    return await get(`${serviceUrl}/programtypes/`);
  }
  

  return {
    createMasterActivity,
    getMasterActivityById,
    editMasterActivity,
    getProgramTypes,
    getMasterActivity
  };
}
