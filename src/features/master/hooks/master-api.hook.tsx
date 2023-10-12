import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import {  IProgramTypes } from "../../../common/interfaces/funds.interfaces";
import { IMaster } from "../../../common/interfaces/master.interface";


export default function useMasterApi() {
  const baseURL: string = process.env.urlApiFunds || "";
  const serviceUrl: string = "/api/v1/master";
  const serviceTypeMaster = "/api/v1/typemasterlist"

  const { get, post, put } = useCrudService(baseURL);
  
  async function getMaster(
  ): Promise<ApiResponse<IMaster[]>> {
    return await get(`${serviceUrl}/`);
  }

  async function getMasterById(
    id: number
  ): Promise<ApiResponse<IMaster[]>> {
    return await get(`${serviceUrl}/${id}`);
  }

  async function createMaster(
    data: IMaster
  ): Promise<ApiResponse<IMaster>> {
    return await post(`${serviceUrl}/create/`, data);
  }

  async function editMaster(
    id: number,
    data: IMaster
  ): Promise<ApiResponse<IMaster>> {
    return await put(`${serviceUrl}/edit/${id}`, data);
  }

  async function TypeMasterList(
    ): Promise<ApiResponse<IMaster[]>> {
      return await get(`${serviceTypeMaster}/`);
    }

  /* async function getProgramTypes(
  ): Promise<ApiResponse<IProgramTypes[]>> {
    return await get(`${serviceUrl}/programtypes/`);
  } */
  

  return {
    createMaster,
    getMasterById,
    editMaster,
    //getProgramTypes,
    getMaster,
    TypeMasterList
  };
}
