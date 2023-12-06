
import axios from "axios";
import { ApiResponse } from "../../../../../common/utils/api-response";
import { EResponseCodes } from "../../../../../common/constants/api.enum";
import { Dispatch, SetStateAction } from "react";
import { IMessage } from "../../../../../common/interfaces/global.interface";
import { IAuthorization } from "../../../../../common/interfaces";


export const uploadFileManageTranfer = (
        filesUploadData: File[],
        setMessage: Dispatch<SetStateAction<IMessage>>,
        authorization: IAuthorization,
        url: string,
        showMessage: boolean,
        loadTableData?: () => void,
    ) => {
    return new Promise<void>((resolve, reject) => {
      const form = new FormData();
      const files = filesUploadData;
      files.forEach(file => {
        form.append('files', file);
      });
      const authToken = localStorage.getItem("token");
      const options = {
        method: 'POST',
        url: `${process.env.urlApiFunds}/api/v1${url}`,
        headers: { 
          'content-type': 'multipart/form-data', 
          Permissions: authorization.encryptedAccess, 
          authorization: `Bearer ${authToken}` 
        },
        data: form,
      };
      axios.request(options).then(response => {
        const data: ApiResponse<boolean> = response.data;
        if (data.operation.code === EResponseCodes.OK) {
          showMessage && loadTableData()
          resolve();
          showMessage &&  setMessage({
              background: true,
              show: true,
              title: "Adjuntar",
              description: data.operation.message,
              OkTitle: "Aceptar",
            });
        
        } else {
          reject(data.operation.message);
          showMessage && setMessage({
            background: true,
            show: true,
            title: "Adjuntar",
            description: data.operation.message,
            OkTitle: "Aceptar"
          });
        }
      }).catch(err => {
        reject(err.message);
        console.log(err.message);   
      });
    });
}