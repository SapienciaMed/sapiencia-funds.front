import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IProgramTypes } from "../../../common/interfaces/funds.interfaces";
import { IMaster } from "../../../common/interfaces/master.interface";


export default function useRemnantsApi() {
  const baseURL: string = process.env.urlApiFunds || "";

  const serviceUrl: string = "/api/v1/remnants";
  const serviceUrlFiducia: string = "/api/v1/fiducia";


  const endpointPeriod = "/api/v1/sapiencia/call-periods/get-all";
  const endpointfund = "/api/v1/absorption-percentage/get-commune-resources";

  const { get, post, put, deleted } = useCrudService(baseURL);


  async function getPeriod(): Promise<ApiResponse<any[]>> {
    return await get(`${endpointPeriod}/`);
  }

  async function getFund(): Promise<ApiResponse<any[]>> {
    return await get(`${endpointfund}/`);
  }

  async function getFiducia(): Promise<ApiResponse<any[]>> {
    return await get(`${serviceUrlFiducia}/get-fiducias`);
  }

  async function editRemnant(id: number, data: any): Promise<ApiResponse<any>> {
    return await put(`${serviceUrl}/update/${id}`, data);
  }

  async function deleteRemnant(id: number): Promise<ApiResponse<any>> {
    return await deleted(`${serviceUrl}/delete/${id}`);
  }

  async function getReport(data: any): Promise<ApiResponse<any>> {
    return await post(`${serviceUrl}/get-all-paginated/`, data);
  }


  return {
    getPeriod,
    getFund,
    getFiducia,
    editRemnant,
    deleteRemnant,
    getReport
  };
}
