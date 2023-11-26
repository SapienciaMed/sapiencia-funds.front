import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import {
  IResourcePrioritization,
  ITotalsPrioritizationFilters,
} from "../../../common/interfaces/resource-prioritization.interface";

export default function useResourcePrioritizationApi() {
  const { post } = useCrudService(
    `${process.env.urlApiFunds}/api/v1/resource-prioritization`
  );

  async function getResourcePrioritizationPaginate(
    data: ITotalsPrioritizationFilters
  ): Promise<ApiResponse<IResourcePrioritization>> {
    return await post<IResourcePrioritization>(`/get-totals/`, data);
  }

  async function setResourcePrioritization(
    data: IResourcePrioritization
  ): Promise<ApiResponse<IResourcePrioritization>> {
    return await post<IResourcePrioritization>(`/set/`, data);
  }

  async function getResourcePrioritizationExcel(
    data: ITotalsPrioritizationFilters
  ): Promise<ApiResponse<any>> {
    return await post<any>(`/generate-excel/`, data);
  }

  return {
    getResourcePrioritizationPaginate,
    setResourcePrioritization,
    getResourcePrioritizationExcel
  };
}
