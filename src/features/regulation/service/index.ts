import useCrudService from "../../../common/hooks/crud-service.hook";
import { IRegulation } from "../../../common/interfaces/regulation";
import { ApiResponse } from "../../../common/utils/api-response";

export const periods: { value: string; name: string }[] = [
  {
    value: "period-1",
    name: "2022-1(1Enero a 30 Junio)",
  },
  {
    value: "period-2",
    name: "2022-2(1Julio a 31 Diciembre)",
  },
  {
    value: "period-3",
    name: "2023-1(1Enero a 30 Junio)",
  },
  {
    value: "period-4",
    name: "2023-1(1Julio a 31 Diciembre)",
  },
];

export function useRegulationApi() {
  const baseURL: string = process.env.urlApiFunds || "";
  const serviceUrl: string = "/api/v1/regulation";

  const { get, post, put } = useCrudService(baseURL);

  async function getRegulation(): Promise<ApiResponse<IRegulation[]>> {
    return await get(`${serviceUrl}/`);
  }

  async function getRegulationById(
    id: string
  ): Promise<ApiResponse<IRegulation>> {
    return await get(`${serviceUrl}/get-by-id/${id}`);
  }

  async function createRegulationAction(
    data: IRegulation
  ): Promise<ApiResponse<IRegulation>> {
    return await post(`${serviceUrl}/create/`, data);
  }

  async function editRegulation(
    id: number,
    data: IRegulation
  ): Promise<ApiResponse<IRegulation>> {
    return await put(`${serviceUrl}/edit/${id}`, data);
  }

  return {
    createRegulationAction,
    getRegulationById,
    editRegulation,
    getRegulation,
  };
}
