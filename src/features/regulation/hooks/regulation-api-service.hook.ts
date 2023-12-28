import useCrudService from "../../../common/hooks/crud-service.hook";
import {
  IPeriodSapiencia,
  IRegulation,
} from "../../../common/interfaces/regulation";
import { ApiResponse } from "../../../common/utils/api-response";

export const LIST_DATA_GRACE_PERIOD: { value: string; name: string }[] = [
  {
    value: "A01",
    name: "Al culminar los estudios",
  },
  {
    value: "A02",
    name: "Desde fecha de regreso al departamento ",
  },
  {
    value:'A03',
    name: 'Después de último giro'
  }
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

  async function createRegulation(
    data: IRegulation
  ): Promise<ApiResponse<IRegulation>> {
    return await post(`/api/v1/reglament-v2/create-reglament/`, data);
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
    return await get(`/api/v1/reglament/programs`);
  }

  async function getPeriodsFromSapiencia(): Promise<ApiResponse<IPeriodSapiencia[]>> {
    return post('/api/v1/reglament-v2/get-periods-sapi')
  }

  return {
    createRegulation,
    getRegulationById,
    editRegulation,
    getRegulation,
    getLastId,
    getPrograms,
    getPeriodsFromSapiencia,
  };
}
