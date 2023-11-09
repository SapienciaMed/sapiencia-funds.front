import useCrudService from "../../../common/hooks/crud-service.hook";
import { IRequeriments } from "../../../common/interfaces/regulation";
import { ApiResponse } from "../../../common/utils/api-response";

export function useRequerimentsApi() {
  const baseURL: string = process.env.urlApiFunds || "";
  const serviceUrl: string = "/api/v1/requeriments";
  const { post, put, deleted } = useCrudService(baseURL);

  async function editRequeriment(
    id: number,
    data: IRequeriments
  ): Promise<ApiResponse<IRequeriments>> {
    return await put(`${serviceUrl}/edit/${id}`, data);
  }

  async function deleteRequeriment(
    id: number
  ): Promise<ApiResponse<IRequeriments>> {
    return await deleted(`${serviceUrl}/delete/${id}`);
  }

  async function deleteByReglamentId(
    id: number
  ): Promise<ApiResponse<IRequeriments>> {
    return await deleted(`${serviceUrl}/delete-by-reglament-id/${id}`);
  }

  async function createRequerimentAction(
    data: IRequeriments
  ): Promise<ApiResponse<IRequeriments>> {
    return await post(`${serviceUrl}/create/`, data);
  }

  return {
    createRequerimentAction,
    editRequeriment,
    deleteRequeriment,
    deleteByReglamentId,
  };
}
