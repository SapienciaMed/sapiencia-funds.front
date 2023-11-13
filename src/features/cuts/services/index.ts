import useCrudService from "../../../common/hooks/crud-service.hook";
import { ICut } from "../../../common/interfaces/cut";
import { ApiResponse } from "../../../common/utils/api-response";

export function useCutApi() {
  const baseURL: string = process.env.urlApiFunds || "";
  const serviceUrl: string = "/api/v1/cuts";

  const { get, post, put, deleted } = useCrudService(baseURL);

  async function getCut(): Promise<ApiResponse<ICut[]>> {
    return await get(`${serviceUrl}/`);
  }

  async function getCutById(id: string): Promise<ApiResponse<ICut>> {
    return await get(`${serviceUrl}/get-by-id/${id}`);
  }

  async function createCutAction(data: ICut): Promise<ApiResponse<ICut>> {
    return await post(`${serviceUrl}/create/`, data);
  }

  async function editCut(id: number, data: ICut): Promise<ApiResponse<ICut>> {
    return await put(`${serviceUrl}/edit/${id}`, data);
  }

  async function deleteCut(id: number): Promise<ApiResponse<ICut>> {
    return await deleted(`${serviceUrl}/delete/${id}`);
  }

  return {
    getCut,
    getCutById,
    createCutAction,
    editCut,
    deleteCut,
  };
}
