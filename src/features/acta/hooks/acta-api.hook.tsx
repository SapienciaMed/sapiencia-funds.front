import useCrudService from "../../../common/hooks/crud-service.hook";
import { IActa } from "../../../common/interfaces/acta.interface";
import { IUser } from "../../../common/interfaces/auth.interfaces";
import { IStatus } from "../../../common/interfaces/estado.interface";
import { IProgramTypes } from "../../../common/interfaces/funds.interfaces";
import { IProject } from "../../../common/interfaces/project.interface";
import { ApiResponse } from "../../../common/utils/api-response";


export default function useActaApi() {
    const baseURL: string = process.env.urlApiFunds || "";
    const baseURLProjects: string = process.env.urlApiProjects || "";
    const baseURLUsers: string = process.env.urlApiAuth || "";

    const serviceUrl: string = "/api/v1/master";   
    const serviceUrlActivity: string = "/api/v1/activities";
    const serviceUrlSapiencia: string = "/api/v1/sapiencia";   
    const serviceUrlStausList: string = "/api/v1/estatusList";   
    const serviceUrlActa: string = "/api/v1/actas";   
    const serviceUrlProjects: string = "/api/v1/project";  
    const serviceUrlUsers: string = "/api/v1/user";  


    const { get, post, put } = useCrudService(baseURL);
    const { get: getProjects } = useCrudService(baseURLProjects);
    const { get: getUser } = useCrudService(baseURLUsers);


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
      return await post(`${serviceUrlActa}/create`, data);
    }
    
    async function getUserList(): Promise<ApiResponse<IUser[]>> {
      return await getUser(`${serviceUrlUsers}/getUser`);
  } 

    async function getHours() {
      const hours =[
        { value: "00:00", name: "00:00" },
        { value: "00:30", name: "00:30" },
        { value: "01:00", name: "01:00" },
        { value: "01:30", name: "01:30" },
        { value: "02:00", name: "02:00" },
        { value: "02:30", name: "02:30" },
        { value: "03:00", name: "03:00" },
        { value: "03:30", name: "03:30" },
        { value: "04:00", name: "04:00" },
        { value: "04:30", name: "04:30" },
        { value: "05:00", name: "05:00" },
        { value: "05:30", name: "05:30" },
        { value: "06:00", name: "06:00" },
        { value: "06:30", name: "06:30" },
        { value: "07:00", name: "07:00" },
        { value: "07:30", name: "07:30" },
        { value: "08:00", name: "08:00" },
        { value: "08:30", name: "08:30" },
        { value: "09:00", name: "09:00" },
        { value: "09:30", name: "09:30" },
        { value: "10:00", name: "10:00" },
        { value: "10:30", name: "10:30" },
        { value: "11:00", name: "11:00" },
        { value: "11:30", name: "11:30" },
        { value: "12:00", name: "12:00" },
        { value: "12:30", name: "12:30" },
        { value: "13:00", name: "13:00" },
        { value: "13:30", name: "13:30" },
        { value: "14:00", name: "14:00" },
        { value: "14:30", name: "14:30" },
        { value: "15:00", name: "15:00" },
        { value: "15:30", name: "15:30" },
        { value: "16:00", name: "16:00" },
        { value: "16:30", name: "16:30" },
        { value: "17:00", name: "17:00" },
        { value: "17:30", name: "17:30" },
        { value: "18:00", name: "18:00" },
        { value: "18:30", name: "18:30" },
        { value: "19:00", name: "19:00" },
        { value: "19:30", name: "19:30" },
        { value: "20:00", name: "20:00" },
        { value: "20:30", name: "20:30" },
        { value: "21:00", name: "21:00" },
        { value: "21:30", name: "21:30" },
        { value: "22:00", name: "22:00" },
        { value: "22:30", name: "22:30" },
        { value: "23:00", name: "23:00" },
        { value: "23:30", name: "23:30" }

    ];

    return hours;
  }

  async function getActa(id: object): Promise<ApiResponse<IActa[]>> {
    const endpoint: string = "/getActa"; 
    return post(`${serviceUrlActa}${endpoint}`, id);
  }

  async function approveCitation(id: object):  Promise<ApiResponse<any>> {
    const endpoint: string = "/updateCitation"
    return put(`${serviceUrlActa}${endpoint}`, id);
  }
  
  async function getLastId():  Promise<ApiResponse<number>> {
    const endpoint: string = "/getLastId"
    return get(`${serviceUrlActa}${endpoint}`);
  }

  return {
    getProgramTypes,
    getMaster,
    getAnnouncement,
    getStatusList,
    getProjectsList,
    createActa,
    getUserList,
    getHours,
    getActa,
    approveCitation,
    getLastId
  };
}