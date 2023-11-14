import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { useNavigate, useParams } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useRegulationApi } from "../service";
import { createRegulation } from "../../../common/schemas/regulation-schema";
import { IRegulation } from "../../../common/interfaces/regulation";
import { useRequerimentsApi } from "../service/requeriments";

export default function useRegulationHook(auth) {
  const { setMessage, authorization } = useContext(AppContext);
  const { id, onlyView } = useParams();
  const { getListByGrouper } = useGenericListService();
  const resolver = useYupValidationResolver(createRegulation);
  const {
    getRegulationById,
    editRegulation,
    createRegulationAction,
    getPrograms,
  } = useRegulationApi();
  const { deleteByReglamentId } = useRequerimentsApi();
  const navigate = useNavigate();
  const [updateData, setUpdateData] = useState<IRegulation>();
  const [loading, setLoading] = useState<boolean>(true);
  const [performancePeriodErrors, setPerformancePeriodErrors] = useState(false);
  const [accumulatedPerformanceErrors, setAccumulatedPerformanceErrors] =
    useState(false);
  const [toggleControl, setToggleControl] = useState<{
    applySocialService: boolean;
    knowledgeTransferApply: boolean;
    gracePeriodApply: boolean;
    continuousSuspensionApplies: boolean;
    applyDiscontinuousSuspension: boolean;
    applySpecialSuspensions: boolean;
    extensionApply: boolean;
    applyCondonationPerformancePeriod: boolean;
    accomulatedIncomeCondonationApplies: boolean;
  }>();
  const [listPrograms, setListPrograms] = useState<
    { name: string; value: number }[]
  >([]);

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
  }, [auth, authorization]);

  useEffect(() => {
    const getListPrograms = async () => {
      const res = await getPrograms();
      if (res?.data) {
        const buildData = res.data.map((item) => {
          return {
            name: item.value,
            value: item.id,
          };
        });
        setListPrograms(buildData);
      }
    };

    getListPrograms();
  }, []);

  const getUpdateData = async () => {
    if (id) {
      const res = await getRegulationById(id);
      if (res?.data[0]) {
        for (let clave in res?.data[0]) {
          if (res?.data[0][clave] === null) {
            delete res?.data[0][clave];
          }
        }
        setUpdateData(res?.data[0]);
      }
      controlToggle(res?.data[0]);
      return { ...res?.data[0] };
    }
  };

  const controlToggle = (data) => {
    setToggleControl({
      applySocialService: data.applySocialService,
      knowledgeTransferApply: data.knowledgeTransferApply,
      gracePeriodApply: data.gracePeriodApply,
      continuousSuspensionApplies: data.continuousSuspensionApplies,
      applyDiscontinuousSuspension: data.applyDiscontinuousSuspension,
      applySpecialSuspensions: data.applySpecialSuspensions,
      extensionApply: data.extensionApply,
      applyCondonationPerformancePeriod: data.applyCondonationPerformancePeriod,
      accomulatedIncomeCondonationApplies:
        data.accomulatedIncomeCondonationApplies,
    });
  };

  const validRangesJsonTable = (data: string) => {
    let sum = 0;
    const ranges = JSON.parse(data).dataTable;
    ranges.map((item) => {
      const initial = item.initialAverage;
      const end = item.endAverage;
      sum = 0.1 + sum + (end - initial);
    });

    if (sum < 5) return true;

    return false;
  };

  const onsubmitCreate = handleSubmit((data: IRegulation) => {
    if (data.applyCondonationPerformancePeriod && !data.performancePeriod) {
      return setPerformancePeriodErrors(true);
    } else {
      setPerformancePeriodErrors(false);
    }
    if (
      data.accomulatedIncomeCondonationApplies &&
      !data.accumulatedPerformance
    ) {
      return setAccumulatedPerformanceErrors(true);
    } else {
      setAccumulatedPerformanceErrors(false);
    }

    let validRangesAccumulated = false;
    let validRangesPerformance = false;
    const user = JSON.parse(localStorage.getItem("credentials"));

    if (data.accumulatedPerformance?.length) {
      validRangesAccumulated = validRangesJsonTable(
        data.accumulatedPerformance
      );
    }

    if (data.performancePeriod?.length) {
      validRangesPerformance = validRangesJsonTable(data.performancePeriod);
    }

    if (validRangesAccumulated) {
      return handleModalError(
        "No se ha configurado completamente los rangos de promedios de la condonación por rendimiento académico por periodo, debe finalizarla para poder guardar",
        false
      );
    }

    if (validRangesPerformance) {
      return handleModalError(
        "No se ha configurado completamente los rangos de promedios de la condonación por rendimiento académico final acumulado, debe finalizarla para poder guardar",
        false
      );
    }

    const buildData = {
      ...data,
      createUser: user.numberDocument,
      createDate: new Date().toISOString(),
      isOpenPeriod: data?.isOpenPeriod ? true : false,
      applySocialService: data?.applySocialService ? true : false,
      knowledgeTransferApply: data?.knowledgeTransferApply ? true : false,
      gracePeriodApply: data?.gracePeriodApply ? true : false,
      continuousSuspensionApplies: data?.continuousSuspensionApplies
        ? true
        : false,
      applyDiscontinuousSuspension: data?.applyDiscontinuousSuspension
        ? true
        : false,
      applySpecialSuspensions: data?.applySpecialSuspensions ? true : false,
      extensionApply: data?.extensionApply ? true : false,
      applyCondonationPerformancePeriod: data?.applyCondonationPerformancePeriod
        ? true
        : false,
      accomulatedIncomeCondonationApplies:
        data?.accomulatedIncomeCondonationApplies ? true : false,
    };

    setMessage({
      show: true,
      title: "Guardar información",
      description: "¿Estás segur@ de guardar la información?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        confirmRegulationCreate(buildData);
      },
      background: true,
    });
  });

  const confirmRegulationCreate = async (data: IRegulation) => {
    const { data: dataResponse, operation } = data?.id
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

  const goBack = () => {
    setMessage({
      show: true,
      title: "Cancelar",
      description: "¿Estás segur@ de salir sin guardar la información?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        confirmGoBack();
      },
      background: true,
    });
  };

  const confirmGoBack = async () => {
    const ReglamentId = Number(localStorage.getItem("reglamentId"));
    await deleteByReglamentId(ReglamentId);
    setMessage((prev) => {
      return { ...prev, show: false };
    });
    navigate("/fondos/administracion/reglamento/");
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
    toggleControl,
    setToggleControl,
    performancePeriodErrors,
    accumulatedPerformanceErrors,
    id,
    listPrograms,
    onlyView,
    reset,
  };
}
