import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IUploadInformation } from "../../../common/interfaces/funds.interfaces";

export default function useUploadApi() {
    const baseURL: string = process.env.urlApiFunds || "";
    const serviceUrl: string = "/api/v1/uploadInformation";

    const { get, post, put } = useCrudService(baseURL);

    async function createUploadInformation(
        data: IUploadInformation
      ): Promise<ApiResponse<IUploadInformation>> {
        return await post(`${serviceUrl}/create`, data);
    }

    async function UserNotificacion(
      data: IUploadInformation
    ): Promise<ApiResponse<IUploadInformation>> {
      return await post(`${serviceUrl}/mail-notification`, data);
  }

    return {
        createUploadInformation,
        UserNotificacion,
      };
    }
    