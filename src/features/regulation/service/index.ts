import useCrudService from "../../../common/hooks/crud-service.hook";
import { IRegulation } from "../../../common/interfaces/regulation";
import { ApiResponse } from "../../../common/utils/api-response";

export const periods: { value: string; name: string }[] = [
  {
    value: "period-1",
    name: "2022-1 (1 Enero a 30 Junio)",
  },
  {
    value: "period-2",
    name: "2022-2 (1 Julio a 31 Diciembre)",
  },
  {
    value: "period-3",
    name: "2023-1 (1 Enero a 30 Junio)",
  },
  {
    value: "period-4",
    name: "2023-2 (1 Julio a 31 Diciembre)",
  },
];

export const LIST_DATA_GRACE_PERIOD: { value: string; name: string }[] = [
  {
    value: "from_date_return",
    name: "Desde fecha de regreso al departamento",
  },
  {
    value: "after_last_turn",
    name: "Después de último giro",
  },
];

export function useRegulationApi() {
  const baseURL: string = process.env.urlApiFunds || "";
  const serviceUrl: string = "/api/v1/reglament";

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

  async function getLastId(): Promise<ApiResponse<number>> {
    return await get(`${serviceUrl}/get-last-id`);
  }

  async function getPrograms(): Promise<
    ApiResponse<{ value: string; id: number }[]>
  > {
    return await get(`${serviceUrl}/programs`);
  }

  return {
    createRegulationAction,
    getRegulationById,
    editRegulation,
    getRegulation,
    getLastId,
    getPrograms,
  };
}
