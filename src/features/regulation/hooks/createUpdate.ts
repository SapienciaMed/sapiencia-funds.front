import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ISocialization } from "../../../common/interfaces/socialization.interface";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useRegulationApi } from "../service";
import { createRegulation } from "../../../common/schemas/regulation-schema";
import { IRegulation } from "../../../common/interfaces/regulation";

export default function useRegulationHook() {
  const { setMessage, authorization } = useContext(AppContext);
  const { id } = useParams();
  const { getListByGrouper } = useGenericListService();
  const resolver = useYupValidationResolver(createRegulation);
  const { getRegulationById, editRegulation, createRegulationAction } =
    useRegulationApi();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState<IRegulation>();
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
  } = useForm<IRegulation>({
    resolver,
    defaultValues: async () => await getUpdateData(),
  });

  console.log(watch());

  useEffect(() => {
    getUpdateData();
  }, []);

  const getUpdateData = async () => {
    if (id) {
      const res = await getRegulationById(id);
      if (res?.data[0]) setUpdateData(res?.data[0]);
      return { ...res?.data[0] };
    }
    setLoading(false);
  };

  const onsubmitCreate = handleSubmit((data: IRegulation) => {
    let buildData = { ...data };
    console.log(data);
    // const newDate = new Date(data.socializationDate).toISOString();
    // const getValueGroup: any = dataGroup.find(
    //   (item) => item.name === data.valueGroup || item.value === data.valueGroup
    // );

    // if (id) {
    //   buildData = {
    //     ...data,
    //     socializationDate: newDate,
    //     valueGroup: getValueGroup.value,
    //   };
    // } else {
    //   const getCode: any = deparmetList.find(
    //     (dep) => dep.name === data.communeCode
    //   );

    //   buildData = {
    //     ...data,
    //     communeCode: getCode.value,
    //     socializationDate: newDate,
    //     valueGroup: getValueGroup.value,
    //   };
    // }

    // setMessage({
    //   show: true,
    //   title: "Guardar información",
    //   description: "¿Estás segur@ de guardar la información?",
    //   OkTitle: "Aceptar",
    //   cancelTitle: "Cancelar",
    //   onOk() {
    //     confirmSocializationCreate(buildData);
    //   },
    //   background: true,
    // });
  });

  const confirmRegulationCreate = async (data: IRegulation) => {
    const { data: dataResponse, operation } = updateData?.id
      ? await editRegulation(data.id, data)
      : await createRegulationAction(data);

    if (operation.code === EResponseCodes.OK) {
      handleModalSuccess();
    } else {
      handleModalError(operation.message, false);
    }
  };

  const handleModalSuccess = () => {
    setMessage({
      title: "Cambios guardados",
      description: `¡Cambios guardados exitosamente!`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        navigate("/fondos/administracion/reglamento");
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
      OkTitle: "cerrar",
      onClose: () => {
        if (navigateBoolean) {
          navigate("/fondos/administracion/reglamento/");
        }
        setMessage({});
      },
      background: true,
    });
  };

  const goBack = () => navigate("/fondos/administracion/reglamento/");

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
  };
}
