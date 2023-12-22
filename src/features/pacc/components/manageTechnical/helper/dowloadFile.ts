import { SetStateAction } from "react";
import { IAuthorization } from "../../../../../common/interfaces";
import { IFiles } from "../../../../../common/interfaces/storage.interfaces";
import { IMessage } from "../../../../../common/interfaces/global.interface";

export const downloadFile = ( data: IFiles, authorization: IAuthorization, setMessage: (value: SetStateAction<IMessage>) => void, url: string ) => {
  const authToken = localStorage.getItem("token");
  let res 
  fetch(`${process.env.urlApiFunds}/api/v1${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${authToken}`,
      Accept: "application/json",
      permissions: authorization.encryptedAccess,
    },
    body: JSON.stringify({ fileName: data.path }),
  }).then(async response => {
    const blob = await response.blob();
    const blobWithType = new Blob([blob], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blobWithType);
    const a = document.createElement('a');
    a.href = url;
    a.download = data.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    const fileName = data.name;
    const fileUrl = new URL(url);
    fileUrl.pathname = `${fileName}.pdf`;
    window.open(fileUrl.toString(), '_blank');
    // Liberar el objeto URL cuando ya no sea necesario
    window.URL.revokeObjectURL(url);

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
  })

}