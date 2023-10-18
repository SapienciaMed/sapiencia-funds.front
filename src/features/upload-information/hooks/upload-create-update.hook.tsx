import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {IUploadInformation, IWorker} from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ApiResponse } from "../../../common/utils/api-response";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {filterUploadInformationSchema} from "../../../common/schemas/upload-information";
import useUploadApi from "./upload-information-api.hook";
import axios from "axios";


export default function useCreateUploadHook() {
    const { setMessage } = useContext(AppContext);
    const [showTable, setshowTable] = useState(false);
    const [activeWorkerList, setActiveWorkerList] = useState([]);
    const [filesUploadData, setFilesUploadData] = useState<File[]>([]);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<IUploadInformation>(null);
    const uploadFilesRef = useRef(null);
    const [workerInfo, setWorkerInfo] = useState([]);
    const tableComponentRef = useRef(null);
    const navigate = useNavigate();
    const { createUploadInformation, } = useUploadApi();
    
    
    // const getWorkersActive = () => {
    //   getWorkers()
    //     .then((response: ApiResponse<IWorker[]>) => {
    //       if (response && response?.operation?.code === EResponseCodes.OK) {
    //         setWorkerInfo(response.data);
    //         setActiveWorkerList(
    //           response.data.map((item) => {
    //             const list = {
    //               name: `${
    //                 item.numberDocument +
    //                 " - " +
    //                 item.firstName +
    //                 " " +
    //                 item.surname
    //               }`,
    //               value: item.id,
    //             };
    //             return list;
    //           })
    //         );
    //       }
    //     })
    //     .catch((err) => {});
    // };

    // useEffect(() => {
    //   getWorkersActive();
    // }, []);
    

    const resolver = useYupValidationResolver(filterUploadInformationSchema);
   
    const { register, handleSubmit, formState, control, watch, reset } =
      useForm<IUploadInformation>({ resolver });
    
    
      const formValues = watch();

      const handleModalError = (
        msg = `¡Ha ocurrido un error!`,
        navigateBoolean = true
      ) => {
        setMessage({
          title: "Error",
          description: msg,
          show: true,
          OkTitle: "cerrar",
          onOk: () => {
            if (navigateBoolean) {
              navigate("../consultar");
            }
            setMessage((prev) => {
              return { ...prev, show: false };
            });
          },
          onClose: () => {
            if (navigateBoolean) {
              navigate("../consultar");
            }
            setMessage({});
          },
          background: true,
        });
      };

      const handleModalSuccess = () => {
        setMessage({
          title: "Carga de archivo y notificación",
          description: `El archivo fue cargado con éxito y se ha notificado a los usuarios su carga`,
          show: true,
          OkTitle: "Aceptar",
          onOk: () => {
            navigate("../consultar");
            setMessage((prev) => {
              return { ...prev, show: false };
            });
          },
          onClose: () => {
            navigate("../consultar");
            setMessage({});
          },
          background: true,
        });
      };

      const onSubmit = handleSubmit(async (data: IUploadInformation) => {
        setMessage({
          title: "Cargar archivo y notificar",
          description: `¿Estás segur@ de cargar el archivo y notificarlo?`,
          show: true,
          OkTitle: "Aceptar",
          onOk: () => {

            data.fileName = "archivocargado.xml";
            handleCreateInformation(data);
            setMessage((prev) => {
              return { ...prev, show: false };
            });
          },
          cancelTitle: "Cancelar",
          background: true,
        });
      });

      const handleCreateInformation = async (data: IUploadInformation) => {
        const { data: dataResponse, operation } =
           
          await createUploadInformation(data);
    
        if (operation.code === EResponseCodes.OK) {
          handleModalSuccess();
        } else {
          handleModalError(operation.message, false);
        }
      };

      const redirectCancel = () => {
        setMessage({
          title: "Cancelar",
          description: `¿Estás segur@ que deseas 
          cancelar la cargar el archivo?`,
          show: true,
          OkTitle: "Aceptar",
          onOk: () => {
            navigate("../consultar");
            setMessage((prev) => {
              return { ...prev, show: false };
            });
          },
          cancelTitle: "Cancelar",
          background: true,
        });
      };

    useEffect(() => {            
        reset();
        if(showTable)  {
            tableComponentRef.current.emptyData();
            //setShowTable(false);
        }
    }, []);
    
    //cargar archivos por multipart/form-data
    const uploadFiles = () => {
      const form = new FormData();
      const files = filesUploadData;
      files.forEach(file => {
          form.append('files', file);
      });
      const options = {
          method: 'POST',
          url: `${process.env.urlApiStrategicDirection}/api/v1/project/upload/${selectedRow?.id}`,
          headers: { 'content-type': 'multipart/form-data' },
          data: form,
      };
      axios.request(options).then(response => {
          const data: ApiResponse<boolean> = response.data;
          if (data.operation.code === EResponseCodes.OK) {
              setFilesUploadData([]);
              setShowDialog(false);
              setMessage({
                  background: true,
                  show: true,
                  title: "Adjuntos del proyecto",
                  description: "¡Archivos guardados exitosamente!",
                  OkTitle: "Cerrar",
              });
          } else {
              setFilesUploadData([]);
              setShowDialog(false);
              setMessage({
                  background: true,
                  show: true,
                  title: "Adjuntos del proyecto",
                  description: data.operation.message,
                  OkTitle: "Cerrar"
              });
          }
      }).catch(err => {
          setShowDialog(false);
          setMessage({
              background: true,
              show: true,
              title: "Adjuntos del proyecto",
              description: String(err),
              OkTitle: "Cerrar"
          })
      });
  }

    const clearFields = () => {
      reset();
      tableComponentRef.current?.emptyData();
      //setshowTable(false);
    };


return {
    register,
    control,
    formState,
    onSubmit,
    formValues,
    showTable,
    tableComponentRef,
    //tableColumns,
    //tableActions,
    activeWorkerList,
    redirectCancel,
    setFilesUploadData,
    uploadFiles,
  };
}