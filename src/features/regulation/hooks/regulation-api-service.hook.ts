import useCrudService from "../../../common/hooks/crud-service.hook";
import {
  IPeriodSapiencia,
  IRegulation,
} from "../../../common/interfaces/regulation";
import { ApiResponse } from "../../../common/utils/api-response";

export const LIST_DATA_GRACE_PERIOD: { value: string; name: string, id: number }[] = [
  {
    id: 1,
    value: "A01",
    name: "Al culminar los estudios",
  },
  {
    id: 2,
    value: "A02",
    name: "Desde fecha de regreso al departamento ",
  },
  {
    id: 3,
    value:'A03',
    name: 'Después de último giro'
  }
];

export function useRegulationApi() {
  const baseURL: string = process.env.urlApiFunds || "";
  const serviceUrl: string = "/api/v1/reglament";

  const { get, post, put } = useCrudService(baseURL);

  async function getRegulationById(
    id: string
  ): Promise<ApiResponse<IRegulation>> {
    return await get(`/api/v1/reglament-v2/get-by-id/${id}`);
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
    return await post(`/api/v1/reglament-v2/edit-reglament/${id}`, data);
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
    getPrograms,
    getPeriodsFromSapiencia,
  };
}
