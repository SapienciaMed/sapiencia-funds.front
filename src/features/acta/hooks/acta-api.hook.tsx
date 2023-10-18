import useCrudService from "../../../common/hooks/crud-service.hook";
import { IProgramTypes } from "../../../common/interfaces/funds.interfaces";
import { ApiResponse } from "../../../common/utils/api-response";


export default function useActaApi() {
    const baseURL: string = process.env.urlApiFunds || "";
    const serviceUrl: string = "/api/v1/master";   
    const serviceUrlActivity: string = "/api/v1/activities";
    const serviceUrlSapiencia: string = "/api/v1/sapiencia";   

    const { get, post, put } = useCrudService(baseURL);


    async function getProgramTypes(): Promise<ApiResponse<IProgramTypes[]>> {
        return await get(`${serviceUrlActivity}/programtypes/`);
      }

    async function getMaster(): Promise<ApiResponse<IProgramTypes[]>> {
        return await get(`${serviceUrl}/masterlist`);
      }

    async function getAnnouncement(): Promise<ApiResponse<IProgramTypes[]>> {
        return await get(`${serviceUrlSapiencia}/call-periods/get-all`);
      }

      /* async function TypeMasterList(
    ): Promise<ApiResponse<IMaster[]>> {
      return await get(`${serviceTypeMaster}/`);
    } */

    return {
        getProgramTypes,
        getMaster,
        getAnnouncement
    };
}