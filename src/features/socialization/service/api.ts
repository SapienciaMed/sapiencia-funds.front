import useCrudService from "../../../common/hooks/crud-service.hook";
import { ISocialization } from "../../../common/interfaces/socialization.interface";
import { ApiResponse } from "../../../common/utils/api-response";

export const data: { value: string; name: string }[] = [
  {
    value: "JAL",
    name: "JAL",
  },
  {
    value: "CCCP",
    name: "CCCP",
  },
  {
    value: "JA-CP",
    name: "JA-CP",
  },
  {
    value: "OTRO",
    name: "OTRO",
  },
];

export function useSocializationApi() {
  const baseURL: string = process.env.urlApiFunds || "";
  const serviceUrl: string = "/api/v1/socialization";

  const { get, post, put } = useCrudService(baseURL);

  async function getSocialization(): Promise<ApiResponse<ISocialization[]>> {
    return await get(`${serviceUrl}/`);
  }

  async function getSocializationById(
    id: string
  ): Promise<ApiResponse<ISocialization>> {
    return await get(`${serviceUrl}/get-by-id/${id}`);
  }

  async function createSocializationAction(
    data: ISocialization
  ): Promise<ApiResponse<ISocialization>> {
    return await post(`${serviceUrl}/create/`, data);
  }

  async function editSocialization(
    id: number,
    data: ISocialization
  ): Promise<ApiResponse<ISocialization>> {
    return await put(`${serviceUrl}/edit/${id}`, data);
  }

  return {
    createSocializationAction,
    getSocializationById,
    editSocialization,
    getSocialization,
  };
}
