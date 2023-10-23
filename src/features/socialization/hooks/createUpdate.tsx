import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createSocialization } from "../../../common/schemas/socialization-schema";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ISocialization } from "../../../common/interfaces/socialization.interface";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useSocializationApi } from "../service/api";

export default function useSocializationCrud() {
  const { setMessage, authorization } = useContext(AppContext);
  const { id } = useParams();
  const { getListByParent } = useGenericListService();
  const resolver = useYupValidationResolver(createSocialization);
  const { getSocializationById, editSocialization, createSocializationAction } =
    useSocializationApi();
  const navigate = useNavigate();
  const [deparmetList, setDeparmentList] = useState([]);
  const [updateData, setUpdateData] = useState<ISocialization>();
  const [loading, setLoading] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    control: control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ISocialization>({
    resolver,
    defaultValues: async () => await getUpdateData(),
  });

  useEffect(() => {
    getUpdateData();

    getListByParent({ grouper: "DEPARTAMENTOS", parentItemCode: "COL" }).then(
      (response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setDeparmentList(
            response.data.map((item) => {
              const list = {
                name: item.itemDescription,
                value: item.itemCode,
              };
              return list;
            })
          );
        }
      }
    );
  }, []);

  const getUpdateData = async () => {
    if (id) {
      const res = await getSocializationById(id);
      if (res?.data[0]) setUpdateData(res?.data[0]);
      setLoading(false);
      return { ...res?.data[0] };
    }
    setLoading(false);
  };

  const onsubmitCreate = handleSubmit((data: ISocialization) => {
    let buildData = { ...data };
    const newDate = new Date(data.socializationDate).toLocaleDateString(
      "en-GB"
    );

    if (id) {
      buildData = {
        ...data,
        socializationDate: newDate,
      };
    } else {
      const getCode: any = deparmetList.find(
        (dep) => dep.name === data.communeCode
      );

      buildData = {
        ...data,
        communeCode: getCode.value,
        socializationDate: newDate,
      };
    }

    setMessage({
      show: true,
      title: "Guardar información",
      description: "¿Estás segur@ de guardar la información?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        confirmSocializationCreate(buildData);
      },
      background: true,
    });
  });

  const actionCreacte = async () => {};

  const confirmSocializationCreate = async (data: ISocialization) => {
    const { data: dataResponse, operation } = updateData?.id
      ? await editSocialization(data.id, data)
      : await createSocializationAction(data);

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
        navigate("/fondos/socializacion/");
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
          navigate("/fondos/socializacion/");
        }
        setMessage({});
      },
      background: true,
    });
  };

  const goBack = () => navigate("/fondos/socializacion/");

  return {
    control,
    errors,
    register,
    setValue,
    handleSubmit,
    onsubmitCreate,
    deparmetList,
    goBack,
    updateData,
    loading,
  };
}
