import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import {
  IMasterActivity,
  IProgramTypes,
  IProgramTypesActivity,
} from "../../../common/interfaces/funds.interfaces";
import { IItemsUpdate, IVotinItemCreate } from "../../../common/interfaces/voting.interfaces";
import { IProject } from "../../../common/interfaces/project.interface";

export default function useVotingItemApi() {
  const baseURL: string = process.env.urlApiFunds || "";
  const baseURLProjects: string = process.env.urlApiProjects || "";
  
  const serviceUrl: string = "/api/v1/voting";
  const serviceItems: string = '/api/v1/items'
  const serviceUrlActivity: string = "/api/v1/activities";
  const serviceUrlProjects: string = "/api/v1/project";  

  const { get, post, put } = useCrudService(baseURL);
  const { get: getProjects } = useCrudService(baseURLProjects);

  async function getMasterVotingById(
    id: number
  ): Promise<ApiResponse<IMasterActivity[]>> {
    return await get(`${serviceUrl}/${id}`);
  }

  async function getProjectsList(): Promise<ApiResponse<IProject[]>> {
    return await getProjects(`${serviceUrlProjects}/get-all`);
  } 

  async function createVotingResults(
    data: IVotinItemCreate
  ): Promise<ApiResponse<IVotinItemCreate>> {
    return await post(`${serviceUrl}/create/`, data);
  }

  async function updateItemsVotingResults(
    id: number,
    data: IItemsUpdate
  ): Promise<ApiResponse<IVotinItemCreate>> {
    return await put(`${serviceItems}/update/${id}`, data);
  }

  async function editVotignResults(
    id: number,
    data: IMasterActivity
  ): Promise<ApiResponse<IMasterActivity>> {
    return await put(`${serviceUrl}/edit/${id}`, data);
  }

  async function getActivityProgram(id: number): Promise<ApiResponse<IProgramTypesActivity[]>> {
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
    updateItemsVotingResults,
    getProjectsList,
  };
}
