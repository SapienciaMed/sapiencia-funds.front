import { SetStateAction } from "react";
import { IAuthorization } from "../../../../../common/interfaces";
import { IFiles } from "../../../../../common/interfaces/storage.interfaces";
import { IMessage } from "../../../../../common/interfaces/global.interface";

export const downloadFile = ( data: IFiles[], authorization: IAuthorization, setMessage: (value: SetStateAction<IMessage>) => void ) => {
    const authToken = localStorage.getItem("token");
    let res 
    fetch(`${process.env.urlApiFunds}/api/v1/uploadInformation/files/get-file`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${authToken}`,
        Accept: "application/json",
        permissions: authorization.encryptedAccess,
      },
      body: JSON.stringify({ fileName: data[0].path }),
    }).then(async response => {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
      
        // Abrir una nueva pestaña con el PDF
        window.open(url, '_blank');
      
        // Liberar el objeto URL cuando ya no sea necesario
        window.URL.revokeObjectURL(url);

        res = true
    }).catch(err => {
      setMessage({
        title: "Ha ocurrido un error...",
        description: String(err),
        show: true,
        background: true,
        OkTitle: "Aceptar",
        onOk: () => {
          setMessage({});
        }
      })

      res = true
    })

    return res
  }