import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate, useParams } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { cutSchema } from "../../../common/schemas/cut-schema";
import { useCutApi } from "../services";
import { ICut } from "../../../common/interfaces/cut";
import { useForm } from "react-hook-form";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { jwtDecode } from "jwt-decode";

export default function useCutHook(auth) {
  const { setMessage, authorization } = useContext(AppContext);
  const { id } = useParams();
  const resolver = useYupValidationResolver(cutSchema);
  const { createCutAction, editCut, getCutById, getCut } = useCutApi();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState<ICut>();
  const [loading, setLoading] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    control: control,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<ICut>({
    resolver,
    defaultValues: async () => {
      const res = await getUpdateData();
      setLoading(false);
      return res;
    },
  });

  //permissions
  useEffect(() => {
    const findPermission = authorization?.allowedActions?.findIndex(
      (i) => i == auth
    );
    if (!findPermission) return;
    if (findPermission <= 0) {
      setMessage({
        title: "¡Acceso no autorizado!",
        description: "Consulte con el admimistrador del sistema.",
        show: true,
        OkTitle: "Aceptar",
        onOk: () => {
          navigate("/core");
          setMessage({});
        },
        background: true,
      });
      return;
    }
    setLoading(false);
  }, [auth, authorization]);

  const getUpdateData = async () => {
    if (id) {
      const res = await getCutById(id);
      if (res?.data[0]) {
        setUpdateData(res?.data[0]);
      }
      return { ...res?.data[0] };
    }
  };

  const padZero = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const formatToMySQLDateTime = (date) => {
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const getUser = () => {
    const token = localStorage.getItem("token");
    try {
      const decoded: any = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error al deserializar el token:", error.message);
    }
  };

  const onsubmitCreate = handleSubmit((data: ICut) => {
    const user = getUser();
    const buildData = {
      ...data,
      from: formatToMySQLDateTime(new Date(data.from)),
      until: formatToMySQLDateTime(new Date(data.until)),
      createUser: user?.document ? user?.document : "797940",
      createDate: formatToMySQLDateTime(new Date()),
    };

    setMessage({
      show: true,
      title: id ? "Editar corte" : "Guardar corte",
      description: "¿Estás segur@ de guardar la información?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        confirmRegulationCreate(buildData);
      },
      background: true,
    });
  });

  const confirmRegulationCreate = async (data: ICut) => {
    const { data: dataResponse, operation } = data?.id
      ? await editCut(data.id, data)
      : await createCutAction(data);

    if (operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(operation.message, false);
    }
  };

  const handleModalSuccess = () => {
    setMessage({
      title: "Guardar",
      description: id ? "Actualización exitosa" : `Creación exitosa`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        navigate("/fondos/administracion/cortes");
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      background: true,
    });
  };

  const handleModalError = (
    msg = `¡Ha ocurrido un error!`,
    navigateBoolean = true
  ) => {
    setMessage({
      title: "Error",
      description: msg,
      show: true,
      OkTitle: "Aceptar",
      onClose: () => {
        if (navigateBoolean) {
          navigate("/fondos/administracion/cortes/");
        }
        setMessage({});
      },
      background: true,
    });
  };

  const goBack = () => {
    setMessage({
      show: true,
      title: "Cancelar",
      description: "¿Estás segur@ de salir sin guardar la información?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        navigate("/fondos/administracion/cortes/");
        setMessage({});
      },
      background: true,
    });
  };

  return {
    control,
    errors,
    register,
    setValue,
    handleSubmit,
    onsubmitCreate,
    goBack,
    updateData,
    loading,
    getValues,
    watch,
    id,
    reset,
  };
}
