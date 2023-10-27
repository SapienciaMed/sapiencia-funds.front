import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFormState, useWatch } from "react-hook-form";
import { ITableAction, ITableElement, } from "../../../common/interfaces/table.interfaces";
import { IUser } from "../../../common/interfaces/auth.interfaces"
import { IEmailDataGrid, IUploadInformation, IWorker } from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ApiResponse } from "../../../common/utils/api-response";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { filterUploadInformationSchema } from "../../../common/schemas/upload-information";
import useUploadApi from "./upload-information-api.hook";
import { useAuthService } from "../../../common/hooks/auth-service.hook";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';



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
  const { createUploadInformation, UserNotificacion} = useUploadApi();
  const [itemSave, setItemSave] = useState(Array<IEmailDataGrid>);
  const [UserList, setUserList] = useState(Array<IEmailDataGrid>);
  const [selectedCodEmployment, setSelectedCodEmployment] = useState(""); // Estado para el valor seleccionado

  const resolver = useYupValidationResolver(filterUploadInformationSchema);

  const {
    register,
    handleSubmit,
    formState,
    control,
    watch,
    reset
  } = useForm<IUploadInformation>({ resolver });
  const formValues = watch();


  //Cargar usuarios del sistema
  const getWorkersActive = () => {
    getUser()
      .then((response: ApiResponse<IUser[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setUserInfo(response.data);
          setActiveUserList(
            response.data.map((item) => {
              const list = {
                value: item.id,
                name: `${item.numberDocument +
                  " - " +
                  item.names +
                  " " +
                  item.lastNames
                  }`,
                email: item.email
              };
              return list;
            })
          );
        }
      })
      .catch((err) => { });
  };

  useEffect(() => {
    getWorkersActive();
  }, []);



  // Cambio en el selector de usuario
  const selectedUser = watch('User');
  const getSelectedLabel = (value, list) => {
    const selectedOption = list.find(option => option.value === value);
    return selectedOption ? { email: selectedOption.email, name: selectedOption.name } : null;
  };
  const selectedLabelUser = getSelectedLabel(selectedUser, activeUserList)
  const addUsergrid = handleSubmit((data: IUploadInformation) => {
    console.log("llegue al boton");
    if (selectedUser) {
      dataGridEmails.push({
        ident: uuidv4(),
        user: selectedLabelUser.name,
        email: selectedLabelUser.email,
      });
    }
    
   const emails = dataGridEmails.map((e) => e.email).join(',');
   console.log("************",emails);
    
  });


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



  const handleCreateInformation = async (data: IUploadInformation) => {
    
    try {
      data.fileName = uploadedFileName;
      
      const { data: dataResponse, operation } = await createUploadInformation(data);
      if (operation.code === EResponseCodes.OK) {
        const id = dataResponse.id;
        await uploadFiles(id); 
        handleUserNotificacion(data);
        setDataGridEmails([])
      } else {
        handleModalError(operation.message, false);
      }
    } catch (error) {
      handleModalError(error, false);
    }
  };


  const handleUserNotificacion = async (data: IUploadInformation) => {
    // Crear un arreglo de correos electrónicos a partir de dataGridEmails
    const emailsArray = dataGridEmails.map((e) => e.email);
    
    data.emails = emailsArray;

    try {
      const { data: dataResponse, operation } = await UserNotificacion(data);
      if (operation.code === EResponseCodes.OK) {
        handleModalSuccess();
        setDataGridEmails([])
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
        setDataGridEmails([])
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
    if (showTable) {
      tableComponentRef.current.emptyData();
      //setShowTable(false);
    }
  }, []);

  const onSubmit = handleSubmit(async (data: IUploadInformation) => {
    if (uploadedFileName === ""){
      setMessage({
        title: `Cargar archivo y notificar`,
        show: true,
        description: `Deber cargar un documento valido`,
        OkTitle: "Aceptar",
        background: true,
        onOk: () => {
          setMessage({});
        },
      });
    }else{
    setMessage({
      title: "Cargar archivo y notificar",
      description: `¿Estás segur@ de cargar el archivo y notificarlo?`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
          handleCreateInformation(data);
      },
      cancelTitle: "Cancelar",
      background: true,
    });
  }
  });
  

  const clearFields = () => {
    reset();
    tableComponentRef.current?.emptyData();
    //setshowTable(false);
  };

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
    selectedCodEmployment,
    addUsergrid,
  };
}