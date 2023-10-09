import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import {
  IMasterActivityFilter,
  IMasterActivity,
} from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import useActivityService from "../../../common/hooks/activity-service.hook";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createmasterActivity } from "../../../common/schemas/master-schema";
import useMasterActivityApi from "./master-activity-api.hook";


export default function useCreateMasterHook(action: string) {

  // Context
  const { message, setMessage } = useContext(AppContext);

  //react router dom
  const navigate = useNavigate();
  const { id } = useParams();

  //states
  const [showTable, setshowTable] = useState(false);
  const [typeProgram, setTypeProgram] = useState([]);
  const [existingActivity, setExistingActivity] = useState([]);

  //ref
  const tableComponentRef = useRef(null);

  // Servicios
  const {
    createMasterActivity,
    editMasterActivity,
    getProgramTypes,
    getMasterActivityById,
    getMasterActivity,
  } = useMasterActivityApi();

  //use form
  const resolver = useYupValidationResolver(createmasterActivity);

  const {
    handleSubmit,
    register,
    control,
    formState,
    watch,
  } = useForm<IMasterActivity>({
    defaultValues: async () => loadDefaultValues(),
    mode: "all",
    resolver
  });


  // carga Tipo de Porgrama
  useEffect(() => {
    ProgramType();
  }, []);

  //Effect que inicializa el Tipo de Porgrama
  const ProgramType = async () => {
    const { data, operation } = await getProgramTypes();
    if (operation.code === EResponseCodes.OK) {
      const programList = data.map((item) => {
        return {
          name: item.name,
          value: item.id,
        };
      });
      setTypeProgram(programList);
    } else {
      setTypeProgram([]);
    }
  };


  //cargar validador actividad unica
  useEffect(() => {
    loadExistingNames();
  }, []);

  //Listado de Activiades
  const loadExistingNames = async () => {
    const { data, operation } = await getMasterActivity();
    if (operation.code === EResponseCodes.OK) {
      const activityList = data.map((item) => {
        return {
          name: item.name,
        };
      });
      setExistingActivity(activityList);
    } else {
      setExistingActivity([]);
    }
  };


  //functions
  const renderTitleMasterActivity = () => {
    return action === "edit" ? "Editar maestro actividad" : "Crear maestro actividad";
  };

  const loadDefaultValues = async (): Promise<IMasterActivity> => {
    if (action === "new") {
      return {
        id: null,
        name: "",
        codProgramCode: null,
        totalValue: null,
        description: "",

      };
    }

    if (action === "edit") {
      const { data, operation } = await getMasterActivityById(Number(id));

      if (operation.code === EResponseCodes.OK) {
        if (data.length > 0) {
          return {
            id: data[0].id,
            name: data[0].name,
            codProgramCode: data[0].codProgramCode,
            totalValue: data[0].totalValue,
            description: data[0].description,
            typesProgram: data[0].typesProgram


          };
        } else {
          handleModalError("No se han cargado los datos");

          return {
            id: null,
            name: "",
            codProgramCode: null,
            totalValue: null,
            description: "",
            typesProgram: null
          };
        }
      } else {
        handleModalError("No se han cargado los datos");

        return {
          id: null,
          name: "",
          codProgramCode: null,
          totalValue: null,
          description: "",
          typesProgram: null
        };
      }
    }
  };

  const redirectCancel = () => {
    navigate("../consultar");
  };

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
      title: "Cambios guardados",
      description: `¡Cambios guardados exitosamente!`,
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

  const onSubmit = handleSubmit(async (data: IMasterActivity) => {
    const nameExists = existingActivity.some((item) => item.name === data.name);
    action === "edit" ?
      setMessage({
        title: "Guardar cambios",
        description: `¿Estás segur@ de guardar los cambios?`,
        show: true,
        OkTitle: "Aceptar",
        onOk: () => {
          handleCreateOrUpdateActivity(data);
          setMessage((prev) => {
            return { ...prev, show: false };
          });
        },
        cancelTitle: "Cancelar",
        background: true,
      }): 
      nameExists === true ?
      setMessage({
        title: "Validación de datos",
        description: `¡El dato ya existe!`,
        show: true,
        OkTitle: "Aceptar",
        onOk: () => {
          navigate("../consultar");
          setMessage((prev) => {
            return { ...prev, show: false };
          });
        },
        background: true,
      }):
      setMessage({
        title: "Guardar cambios",
        description: `¿Estás segur@ de guardar los cambios?`,
        show: true,
        OkTitle: "Aceptar",
        onOk: () => {
          handleCreateOrUpdateActivity(data);
          setMessage((prev) => {
            return { ...prev, show: false };
          });
        },
        cancelTitle: "Cancelar",
        background: true,
      })
  });


  const handleCreateOrUpdateActivity = async (data: IMasterActivity) => {

    const { data: dataResponse, operation } =
      action === "edit"
        ? await editMasterActivity(data.id, data)
        : await createMasterActivity(data);

    if (operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(operation.message, false);
    }
  };

  const formValues = watch();

  return {
    control,
    formState,
    register,
    redirectCancel,
    onSubmit,
    typeProgram,
    tableComponentRef,
    formValues,
    renderTitleMasterActivity,
  };


};
