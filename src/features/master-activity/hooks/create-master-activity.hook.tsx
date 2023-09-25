import { useState, useRef, useEffect, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { createmasterActivity } from "../../../common/schemas/master-schema";

import {ITableAction,ITableElement,} from "../../../common/interfaces/table.interfaces";
import {IMasterActivityFilter, IMasterActivity} from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import useActivityService from "../../../common/hooks/activity-service.hook";
import { AppContext } from "../../../common/contexts/app.context";
import {
    DataItem,
    ResponsiveTable,
  } from "../../../common/components/Form/table-detail.component";

import useYupValidationResolver from "../../../common/hooks/form-validator.hook";

export default function useCreateActivityHook(action: string) {
  // Context
  const { setMessage } = useContext(AppContext);

  //custom hooks
  const { getActivity } = useActivityService();

  const {
    createMasterActivity,
    updateMasterActivity,
    getActivityById
  } = useActivityService();


  //states
  const [showTable, setshowTable] = useState(false);
  const [activity, setActivity] = useState<IDropdownProps[]>([]);

  //ref
  const tableComponentRef = useRef(null);

  //react-router-dom
  const navigate = useNavigate();
  const { id } = useParams();

  //useForm
  const resolver = useYupValidationResolver(createmasterActivity);

  const { register, handleSubmit, control, formState, watch, setValue } =
    useForm<IMasterActivity>({
      resolver,
      mode: "all",
      defaultValues: async () => loadDefaultValues(),
    });


const redirectCreate = () => {
 navigate("../crear");
};


const onSubmit = handleSubmit(async (data: IMasterActivity) => {
  setMessage({
    title: action === "edit" ? "Editar" : "Guardar",
    description: `¿Estás segur@ de ${
      action === "edit" ? "editar" : "guardar"
    } el incremento de salario?`,
    show: true,
    //OkTitle: "Aceptar",
    onOk: () => {
      handleCreateIncrementSalary(data);
      setMessage((prev) => {
        return { ...prev, show: false };
      });
    },
    cancelTitle: "Cancelar",
    background: true,
  });
});

const handleModalSuccess = () => {
  setMessage({
    title: action === "edit" ? "Editado" : "Guardado",
    description: `¡Se ha ${
      action === "edit" ? "editado" : "guardado"
    } el incremento de salario exitosamente!`,
    show: true,
    //OkTitle: "cerrar",
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

const handleModalError = (msg = `¡Ha ocurrido un error!`) => {
  setMessage({
    title: "Error",
    description: msg,
    show: true,
    //OkTitle: "cerrar",
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



const handleCreateIncrementSalary = async (
  dataIncrement: IMasterActivity
) => {
  const response =
    action === "edit"
      ? await updateMasterActivity(dataIncrement)
      : await createMasterActivity(dataIncrement);

  if (response.operation.code === EResponseCodes.OK) {
    handleModalSuccess();
  } else {
    handleModalError(
      `¡Ha ocurrido un error al ${
        action === "edit" ? "editar" : "crear"
      } el incremento de salario!`
    );
  }
};






const loadDefaultValues = async (): Promise<IMasterActivity> => {
  if (action === "edit" && id) {
    const { data, operation } = await getActivityById(Number(id));

    if (operation.code === EResponseCodes.OK) {
      //console.log(data.effectiveDate)
      return {
        

      } as IMasterActivity;
    } else {
      handleModalError("¡Ha ocurrido un error al cargar los datos!");
    }
  } else {
    return {
      id: null,
      name: null,
      totalValue: null,
      codProgramCode: null,
      description: null

    } as IMasterActivity;
  }
};

const redirectCancel = () => {
  setMessage({
    title: "Cancelar",
    description: `¿Estás segur@ que deseas 
    cancelar el incremento?`,
    show: true,
    //OkTitle: "Aceptar",
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






  return {
    register,
    control,
    formState,
    onSubmit,
    redirectCreate,
    redirectCancel,
    showTable,
    activity,
    tableComponentRef,
    
  }

}
