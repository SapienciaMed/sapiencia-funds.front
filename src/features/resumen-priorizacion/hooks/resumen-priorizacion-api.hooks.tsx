import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import {
  IMasterActivity,
  IProgramTypes,
  IProgramTypesActivity,
} from "../../../common/interfaces/funds.interfaces";
import { IItemsUpdate, IVotinItemCreate } from "../../../common/interfaces/voting.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IResumenPriorizacion } from "../../../common/interfaces/resumenPriorizacion.interfaces";

export default function useSumaryPrioricions() {
    
    const baseURL: string = process.env.urlApiFunds || "";
    const serviceUrl: string = "/api/v1/summary-priorizacion";

    const { get, post, put } = useCrudService(baseURL);
    

    async function downloadFile(
      data: IResumenPriorizacion
    ): Promise<ApiResponse<any>> {
      try {
        const endpoint: string = `/get-report`;
        return await post(`/api/v1/summary-priorizacion${endpoint}`, data);
      } catch (error) {
        return new ApiResponse(
          false,
          EResponseCodes.FAIL,
          "Error no controlado"
        );
      }
    }

    return {
      downloadFile,
    };
}