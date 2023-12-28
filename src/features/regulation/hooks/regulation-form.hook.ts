import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useRegulationApi } from "./regulation-api-service.hook";
import { shemaFormRegulation } from "../../../common/schemas/regulation-schema";
import {IRegulation} from "../../../common/interfaces/regulation";
import { useRequerimentsApi } from "./requeriments-api-service.hook";

export default function useFormRegulation(auth) {
  // Servicios
  const { setMessage, authorization } = useContext(AppContext);
  const { id, onlyView } = useParams();
  const resolver = useYupValidationResolver(shemaFormRegulation);
  const {
    getRegulationById,
    editRegulation,
    createRegulation,
    getPrograms,
    getPeriodsFromSapiencia,
  } = useRegulationApi();
  const { deleteByReglamentId } = useRequerimentsApi();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
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

  // States
  const [updateData, setUpdateData] = useState<IRegulation>();
  const [loading, setLoading] = useState<boolean>(true);
  const [performancePeriodErrors, setPerformancePeriodErrors] = useState(false);
  const [listPrograms, setListPrograms] = useState<
    { name: string; value: string }[]
  >([]);
  const [arrayPeriod, setArrayPeriod] = useState<
    { name: string; value: string; id: number; nameComplementary?: string }[]
  >([]);
  const [accumulatedPerformanceErrors, setAccumulatedPerformanceErrors] =
    useState(false);
  const [toggleControl, setToggleControl] = useState<{
    applySocialService: number;
    applyKnowledgeTransfer: number;
    applyGracePeriod: number;
    applyContinuousSuspension: number;
    applyDiscontinuousSuspension: number;
    applySpecialSuspensions: boolean;
    applyExtension: boolean;
    applyCondonationPerformancePeriod: boolean;
    applyAccomulatedIncomeCondonation: boolean;
    applyTheoreticalSemester?: boolean;
    applyAcademicPerformancePercent?: boolean;
    applyRequirementsPercent?: boolean
    applyTheoreticalSemiannualPercent?: boolean
  }>();

  // Effects
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
    getPrograms().then((res) => {
      if (res?.data) {
        const buildData = res.data.map((item) => {
          return {
            name: item.value,
            value: item.id.toString(),
          };
        });
        setListPrograms(buildData);
      }
    });

    getPeriodsFromSapiencia().then((resp) => {
      if (resp.operation.code === EResponseCodes.OK) {
        const data = resp.data.map((item) => {
          return {
            name: item.nameComplementary,
            value: item.name,
            id: item.id,
            nameComplementary: item.nameComplementary,
          };
        });
        setArrayPeriod(data);
      }
    });
  }, []);

  // Metodos
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
      applyKnowledgeTransfer: data.applyKnowledgeTransfer,
      applyGracePeriod: data.applyGracePeriod,
      applyContinuousSuspension: data.applyContinuousSuspension,
      applyDiscontinuousSuspension: data.applyDiscontinuousSuspension,
      applySpecialSuspensions: data.applySpecialSuspensions,
      applyExtension: data.applyExtension,
      applyCondonationPerformancePeriod: data.applyCondonationPerformancePeriod,
      applyAccomulatedIncomeCondonation: data.applyAccomulatedIncomeCondonation,
    });
  };

  const onSubmitRegulationForm = handleSubmit((data: IRegulation) => {
    // console.log("🚀 ~ file: regulation-form.hook.ts:155 ~ onSubmitRegulationForm ~ data:", data)
    if (
      data.applyCondonationPerformancePeriod &&
      !data.performancePeriodStructure
    ) {
      return setPerformancePeriodErrors(true);
    } else {
      setPerformancePeriodErrors(false);
    }
    if (
      data.applyAccomulatedIncomeCondonation &&
      !data.accumulatedPerformanceDataTable
    ) {
      return setAccumulatedPerformanceErrors(true);
    } else {
      setAccumulatedPerformanceErrors(false);
    }

    // Ajustar
    const defaultData = {
      idProgram: "",
      initialPeriod: "",
      isOpenPeriod: false,
      endPeriod: "",
      applyTheoreticalSemiannualPercent: false,
      theoreticalSemiannualPercent: 0,

      applyAcademicPerformancePercent: false,
      academicPerformancePercent: 0,
      applyRequirementsPercent: false,
      requirementsPercent: 0,

      applySocialService: false,
      socialServicePercent: 0,
      socialServiceHours: 0,
      socialServiceCondonationType: "",
      socialServiceCondonationPercent: '',
      applyKnowledgeTransfer: true,
      knowledgeTransferPercent: 0,
      knowledgeTransferHours: 0,
      knowledgeTransferCondonationType: "",
      knowledgeTransferCondonationPercent: '',
      applyGracePeriod: false,
      gracePeriodMonths: 0,
      graceDateApplication: "",

      applyContinuousSuspension: false,
      continuosSuspencionQuantity: 0,
      applyDiscontinuousSuspension: false,
      discontinuousSuspensionQuantity: 0,
      applySpecialSuspensions: false,
      specialSuspensionsQuantity: 0,

      applyExtension: false,
      extensionQuantity: 0,

      applyCondonationPerformancePeriod: false,
      performancePeriodStructure: {
        percentCondonation: 0,
      },
    };

    const buildData = {
      ...data,
      createUser: authorization.user.numberDocument,
      createDate: new Date().toISOString(),
      isOpenPeriod: data?.isOpenPeriod ? true : false,
      applySocialService: data?.applySocialService == 1,
      applyKnowledgeTransfer: data?.applyKnowledgeTransfer == 1,
      applyGracePeriod: data?.applyGracePeriod == 1,
      applyContinuousSuspension: data?.applyContinuousSuspension == 1,
      applyDiscontinuousSuspension: data?.applyDiscontinuousSuspension == 1,
      applySpecialSuspensions: data?.applySpecialSuspensions ? true : false,
      applyExtension: data?.applyExtension ? true : false,
      applyCondonationPerformancePeriod: data?.applyCondonationPerformancePeriod ? true : false,
      applyAccomulatedIncomeCondonation: data?.applyAccomulatedIncomeCondonation ? true : false,
      academicPerformancePercent: data?.academicPerformancePercent || 0,
      requirementsPercent: data?.requirementsPercent || 0
    };

    console.log("🚀 buildData:", {
      ...defaultData,
      ...buildData,
    });

    setMessage({
      show: true,
      title: "Guardar información",
      description: "¿Estás segur@ de guardar la información?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        confirmRegulationCreate({
          ...defaultData,
          ...buildData,
        });
      },
      background: true,
    });
  });

  const confirmRegulationCreate = async (data: any) => {
    const { data: dataResponse, operation } = data?.id
      ? await editRegulation(data.id, data)
      : await createRegulation(data);

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
      OkTitle: "Cerrar",
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
    setValue,
    handleSubmit,
    onSubmitRegulationForm,
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
    arrayPeriod,
  };
}
