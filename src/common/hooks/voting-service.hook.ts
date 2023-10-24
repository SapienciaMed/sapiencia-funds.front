import { EResponseCodes } from "../constants/api.enum";
import { IUser } from "../interfaces/auth.interfaces";
import { IVotingCreate } from "../interfaces/voting.interfaces";
import { ApiResponse, IPagingData } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useVotingService() {
  const baseURL: string = process.env.urlApiAuth;
  const userUrl: string = "/api/v1/user";
  const { get, post, put, deleted } = useCrudService(baseURL);

  async function getPagination(
    page: number,
    perPage: number,
    name: string
  ): Promise<ApiResponse<IPagingData<IVotingCreate>>> {
    const endpoint: string = "/get-paginated";
    const params = { page: page, perPage: perPage, name: name };
    return get(`${userUrl}${endpoint}`, params);
  }

  async function getVoting(id: number): Promise<ApiResponse<IVotingCreate>> {
    const endpoint: string = `/get-by-id/${id}`;
    return get(`${userUrl}${endpoint}`);
  }

  async function createVoting(data: Object): Promise<ApiResponse<IVotingCreate>> {
    const endpoint: string = "/create";
    return post(`${userUrl}${endpoint}`, data);
  }

  async function updateVoting(
    id: number,
    data: Object
  ): Promise<ApiResponse<IVotingCreate>> {
    const endpoint: string = `/update/${id}`;
    return put(`${userUrl}${endpoint}`, data);
  }

  async function deleteVoting(id: number): Promise<ApiResponse<boolean>> {
    const endpoint: string = `/delete/${id}`;
    return deleted(`${userUrl}${endpoint}`);
  }

  return {
    getPagination,
    getVoting,
    createVoting,
    updateVoting,
    deleteVoting,
  };
}