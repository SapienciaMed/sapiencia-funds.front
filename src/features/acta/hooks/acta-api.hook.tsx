import useCrudService from "../../../common/hooks/crud-service.hook";
import { IActa } from "../../../common/interfaces/acta.interface";
import { IStatus } from "../../../common/interfaces/estado.interface";
import { IProgramTypes } from "../../../common/interfaces/funds.interfaces";
import { IProject } from "../../../common/interfaces/project.interface";
import { ApiResponse } from "../../../common/utils/api-response";


export default function useActaApi() {
    const baseURL: string = process.env.urlApiFunds || "";
    const baseURLProjects: string = process.env.urlApiProjects || "";
    const serviceUrl: string = "/api/v1/master";   
    const serviceUrlActivity: string = "/api/v1/activities";
    const serviceUrlSapiencia: string = "/api/v1/sapiencia";   
    const serviceUrlStausList: string = "/api/v1/estatusList";   
    const serviceActaCreate: string = "/api/v1/actas";   
    const serviceUrlProjects: string = "/api/v1/project";  


    const { get, post, put } = useCrudService(baseURL);
    const { get: getProjects } = useCrudService(baseURLProjects);


    async function getProgramTypes(): Promise<ApiResponse<IProgramTypes[]>> {
        return await get(`${serviceUrlActivity}/programtypes/`);
      }

    async function getMaster(): Promise<ApiResponse<IProgramTypes[]>> {
        return await get(`${serviceUrl}/masterlist`);
      }

    async function getAnnouncement(): Promise<ApiResponse<IProgramTypes[]>> {
        return await get(`${serviceUrlSapiencia}/call-periods/get-all`);
      }

      async function getStatusList(
    ): Promise<ApiResponse<IStatus[]>> {
      return await get(`${serviceUrlStausList}`);
    } 

    async function getProjectsList(): Promise<ApiResponse<IProject[]>> {
      return await getProjects(`${serviceUrlProjects}/get-all`);
  } 

    async function createActa(
      data: IActa
    ): Promise<ApiResponse<IActa>> {
      return await post(`${serviceActaCreate}/create`, data);
    }


    return {
        getProgramTypes,
        getMaster,
        getAnnouncement,
        getStatusList,
        getProjectsList,
        createActa
    };
}