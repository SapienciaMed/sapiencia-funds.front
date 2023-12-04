import axios from "axios";
import { ApiResponse } from "../../../../../common/utils/api-response";
import { EResponseCodes } from "../../../../../common/constants/api.enum";
import { Dispatch, SetStateAction } from "react";
import { IMessage } from "../../../../../common/interfaces/global.interface";

export const uploadFiles = (idRequirement: string, filesUploadData: File, setMessage: Dispatch<SetStateAction<IMessage>>, loadTableData: () => void ) => {
    return new Promise<void>((resolve, reject) => {
      const form = new FormData();
      const files = [filesUploadData];
      files.forEach(file => {
        form.append('files', file);
      });
      const authToken = localStorage.getItem("token");
      const options = {
        method: 'POST',
        url: `${process.env.urlApiFunds}/api/v1/consolidation-tray/upload-requirement-file/${idRequirement}`,
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`
        },
        data: form,
      };
      axios.request(options).then(response => {
        const data: ApiResponse<boolean> = response.data;
        if (data.operation.code === EResponseCodes.OK) {

          resolve();
        
        } else {
          reject(data.operation.message);
        }
      }).catch(err => {
        reject(String(err));
      });
    });
  }
  