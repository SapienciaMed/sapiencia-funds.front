import { EResponseCodes } from "../constants/api.enum";
import { IAuthorization, IUser } from "../interfaces/auth.interfaces";
import { ApiResponse } from "../utils/api-response";
import useCrudService from "./crud-service.hook";

export function useAuthService() {
  const baseURL: string = process.env.urlApiAuth;
  const authUrl: string = "/api/v1/auth";
  const authUserUrl: string = "/api/v1/user";

  const { get, post } = useCrudService( baseURL);

  async function getAuthorization(
    token: string
  ): Promise<ApiResponse<IAuthorization>> {
    try {
      const endpoint: string = `/authorization/get-by-token/${token}`;
      return await get(`${authUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IAuthorization,
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  async function getUser(): Promise<ApiResponse<IUser[]>> {
    try {
      const endpoint: string = `/getUser`;
      return await get(`${authUserUrl}${endpoint}`);
    } catch (error) {
      return new ApiResponse(
        {} as IUser[],
        EResponseCodes.FAIL,
        "Error no controlado"
      );
    }
  }

  return {
    getAuthorization,
    getUser,
  };
}

export default useAuthService;
