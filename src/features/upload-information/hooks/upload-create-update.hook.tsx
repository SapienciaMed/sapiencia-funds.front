import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFormState, useWatch } from "react-hook-form";
import {ITableAction,ITableElement,} from "../../../common/interfaces/table.interfaces";
import { IUser } from "../../../common/interfaces/auth.interfaces"
import {IEmail, IUploadInformation, IWorker} from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ApiResponse } from "../../../common/utils/api-response";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import {filterUploadInformationSchema} from "../../../common/schemas/upload-information";
import useUploadApi from "./upload-information-api.hook";
import { useAuthService } from "../../../common/hooks/auth-service.hook";
import axios from "axios";



export default function useCreateUploadHook() {
    const { setMessage, dataGridEmails, setDataGridEmails } = useContext(AppContext);
    const [showTable, setshowTable] = useState(false);
    const [activeWorkerList, setActiveWorkerList] = useState([]);
    const [filesUploadData, setFilesUploadData] = useState<File[]>([]);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [selectedRow, setSelectedRow] = useState<IUploadInformation>(null);
    const uploadFilesRef = useRef(null);
    const [activeUserList, setActiveUserList] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const tableComponentRef = useRef(null);
    const navigate = useNavigate();
    const { getUser } = useAuthService();
    const { createUploadInformation, } = useUploadApi();
    const [itemSave, setItemSave] = useState(Array<IEmail>);
    const [selectedCodEmployment, setSelectedCodEmployment] = useState(""); // Estado para el valor seleccionado
    
    
    //Cargar usuarios del sistema
    const getWorkersActive = () => {
      getUser()
        .then((response: ApiResponse<IUser[]>) => {
          if (response && response?.operation?.code === EResponseCodes.OK) {
            setUserInfo(response.data);
            setActiveUserList(
              response.data.map((item) => {
                const list = {
                  name: `${
                    item.numberDocument +
                    " - " +
                    item.names +
                    " " +
                    item.lastNames
                  }`,
                  value: item.id,
                };
                return list;
              })
            );
          }
        })
        .catch((err) => {});
    };

    useEffect(() => {
      getWorkersActive();
    }, []);
    
    const handleCodEmploymentChange = (value) => {
      setSelectedCodEmployment(value); // Actualiza el valor seleccionado en el estado
    };
  

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

      

  //   // Cambio en el selector de usuario
  //   const selectedProject = watch('codEmployment');

  //   useEffect(() => {
  //     const selectedProjectMeta = selectedCodEmployment[selectedProject]?.meta;
  //     setSelectedCodEmployment(selectedProjectMeta);
  //     //setValue("techo", projectMeta);
  // }, [selectedProject, selectedCodEmployment]);

  //     const EmailCreation = async (data: IEmail) => { 
  //       dataGridEmails.map((e) => {
  //         itemSave.push({
  //           lastNames: e.lastNames,
  //         });

  //         });
  //     }


      const handleCreateInformation = async (data: IUploadInformation) => {
        try {
          data.fileName = uploadedFileName;
          const { data: dataResponse, operation } = await createUploadInformation(data);
          if (operation.code === EResponseCodes.OK) {
            const id = dataResponse.id;
            await uploadFiles(id); // Espera a que la carga de archivos se complete
            handleModalSuccess();
          } else {
            handleModalError(operation.message, false);
          }
        } catch (error) {
          handleModalError(error, false);
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
    const uploadFiles = (recordId) => {
      return new Promise<void>((resolve, reject) => {
        const form = new FormData();
        const files = filesUploadData;
        files.forEach(file => {
          form.append('files', file);
        });
        const authToken = localStorage.getItem("token");
        const options = {
          method: 'POST',
          url: `${process.env.urlApiFunds}/api/v1/uploadInformation/upload/${recordId}`,
          headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${authToken}`
          },
          data: form,
        };
        axios.request(options).then(response => {
          const data: ApiResponse<boolean> = response.data;
          if (data.operation.code === EResponseCodes.OK) {
            setFilesUploadData([]);
            setShowDialog(false);
            resolve(); // Resuelve la promesa
          } else {
            setFilesUploadData([]);
            setShowDialog(false);
            reject(data.operation.message); // Rechaza la promesa con el mensaje de error
          }
        }).catch(err => {
          setShowDialog(false);
          reject(String(err)); // Rechaza la promesa con el error
        });
      });
    }

  const onSubmit = handleSubmit(async (data: IUploadInformation) => {
    setMessage({
      title: "Cargar archivo y notificar",
      description: `¿Estás segur@ de cargar el archivo y notificarlo?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
         if(uploadedFileName === ""){
          console.log("Pintar mensaje de cargar archivo valido")
          setMessage({
            title: "Cargar archivo y notificar",
            description: "El archivo no fue cargado. ",
            show: true,
            background: true,
            OkTitle: "Aceptar"
          });
        }else{
          handleCreateInformation(data);
        }
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  });

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
    setUserInfo,
    activeWorkerList,
    redirectCancel,
    setFilesUploadData,
    filesUploadData,
    uploadFiles,
    activeUserList,
    dataGridEmails,
    setUploadedFileName,
    selectedCodEmployment
  };
}