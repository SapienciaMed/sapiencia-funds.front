import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import { useGetAllPeriodsHook } from "./getAllPeriodsHook";
import { useGetcommuneFundIdHook } from "./getcommuneFundIdHook";
import {
  ICreatePeriodsAbsorption,
  IPeriodsAbsorption,
} from "../../../common/interfaces/PeriodsAbsorption.interface";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { urlApiFunds } from "../../../common/utils/base-url";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { createPeriodsAbsorptionSchema } from "../../../common/schemas/PeriodsAbsorption.shema";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";

export const useEditAbsorptionPercentageModal = (
  announcementId,
  row,
  reloadTable
) => {
  const { setMessage } = useContext(AppContext);
  const { put } = useCrudService(urlApiFunds);
  const { communeFund: communeFundData, searchCommuneFundByValue } =
    useGetcommuneFundIdHook();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const resolver = useYupValidationResolver(createPeriodsAbsorptionSchema);
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const [resourceRaw, setResourceRaw] = useState(0);
  const [formWatch, setFormWatch] = useState<ICreatePeriodsAbsorption>({
    sceneryPercentage1: 0,
    sceneryPercentage2: 0,
    sceneryPercentage3: 0,
    resource: 0,
  });

  const [
    communeFundId,
    resourceValue,
    sceneryPercentage1,
    sceneryPercentage2,
    sceneryPercentage3,
  ] = watch([
    "communeFundId",
    "resource",
    "sceneryPercentage1",
    "sceneryPercentage2",
    "sceneryPercentage3",
  ]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setMessage({
        title: "Actualizar",
        description: "¿Estás segur@ de guardar la información?",
        show: true,
        OkTitle: "Aceptar",
        cancelTitle: "Cancelar",
        onOk: async () => {
          await EditItem(formData);
        },
        onClose() {
          setMessage({});
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

  const EditItem = async (data: IPeriodsAbsorption) => {
    const resourceFound = searchCommuneFundByValue(data.communeFundId);
    const fullData = {
      ...data,
      resource: formWatch.resource,
      sceneryPercentage1: parseFloat(
        (data.sceneryPercentage1 || "").replace("%", "")
      ),
      sceneryPercentage2: parseFloat(
        (data.sceneryPercentage2 || "").replace("%", "")
      ),
      sceneryPercentage3: parseFloat(
        (data.sceneryPercentage3 || "").replace("%", "")
      ),
      announcementId,
      communeFundId: Number(resourceFound.name),
    };
    try {
      const endpoint = `/api/v1/absorption-percentage/${row.id}/update-by-id`;
      const resp = await put<IPeriodsAbsorption>(endpoint, fullData);
      await reloadTable({ announcementId });

      if (resp.operation.code === EResponseCodes.FAIL) {
        return setMessage({
          title: "Error",
          description: resp.operation.message,
          onOk: () => setMessage({ show: false }),
          show: true,
          OkTitle: "Cancelar",
          background: true,
        });
      }
      setMessage({
        title: "Actualizar",
        description: "¡Información guardada exitosamente!",
        show: true,
        OkTitle: "Cerrar",
        onOk: () => {
          setMessage({ show: false });
        },
        background: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setMessage((prev) => ({ ...prev, show: false }));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    let rawValue = parseInt(value.replace("%", ""));
    if (isNaN(rawValue)) rawValue = 0;
    setValue(name, `${rawValue}%`);
    setFormWatch({
      ...formWatch,
      [name]: rawValue,
    });
  };

  const handleChangeResource = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  useEffect(() => {
    let rawValue = parseInt(resourceValue?.replace("$", ""));
    if (isNaN(rawValue)) rawValue = 0;
    setValue("resource", `$${rawValue}`);
    setFormWatch({
      ...formWatch,
      resource: resourceRaw,
    });
  }, [resourceValue]);

  useEffect(() => {
    let rawValue = parseInt(sceneryPercentage1?.replace("%", ""));
    if (isNaN(rawValue)) rawValue = 0;
    setValue("sceneryPercentage1", `${rawValue}%`);
    setFormWatch({
      ...formWatch,
      sceneryPercentage1: rawValue,
    });
  }, [sceneryPercentage1]);

  useEffect(() => {
    let rawValue = parseInt(sceneryPercentage2?.replace("%", ""));
    if (isNaN(rawValue)) rawValue = 0;
    setValue("sceneryPercentage2", `${rawValue}%`);
    setFormWatch({
      ...formWatch,
      sceneryPercentage2: rawValue,
    });
  }, [sceneryPercentage2]);

  useEffect(() => {
    let rawValue = parseInt(sceneryPercentage3?.replace("%", ""));
    if (isNaN(rawValue)) rawValue = 0;
    setValue("sceneryPercentage3", `${rawValue}%`);
    setFormWatch({
      ...formWatch,
      sceneryPercentage3: rawValue,
    });
  }, [sceneryPercentage3]);

  useEffect(() => {
    // const resourceValueNumeric = parseFloat(resourceValue);
    let sceneryValue1 = 0;
    let sceneryValue2 = 0;
    let sceneryValue3 = 0;
    if (!isNaN(formWatch.sceneryPercentage1)) {
      sceneryValue1 = (resourceRaw * formWatch.sceneryPercentage1) / 100;
    }
    if (!isNaN(formWatch.sceneryPercentage2)) {
      sceneryValue2 = (resourceRaw * formWatch.sceneryPercentage2) / 100;
    }
    if (!isNaN(formWatch.sceneryPercentage3)) {
      sceneryValue3 = (resourceRaw * formWatch.sceneryPercentage3) / 100;
    }
    setValue("sceneryValue1", formaterNumberToCurrency(sceneryValue1));
    setValue("sceneryValue2", formaterNumberToCurrency(sceneryValue2));
    setValue("sceneryValue3", formaterNumberToCurrency(sceneryValue3));
  }, [resourceRaw, formWatch]);

  useEffect(() => {
    const { sceneryPercentage1, sceneryPercentage2, sceneryPercentage3 } =
      formWatch;
    if (
      !communeFundId ||
      !resourceValue ||
      !sceneryPercentage1 ||
      !sceneryPercentage2 ||
      !sceneryPercentage3
    ) {
      return setSubmitDisabled(true);
    }
    setSubmitDisabled(false);
  }, [communeFundId, formWatch]);

  useEffect(() => {
    if (communeFundId) {
      setResourceRaw(communeFundId);
      setFormWatch({
        ...formWatch,
        sceneryPercentage1: row?.sceneryPercentage1,
        sceneryPercentage2: row?.sceneryPercentage2,
        sceneryPercentage3: row?.sceneryPercentage3,
      });
      setValue("resource", formaterNumberToCurrency(communeFundId));
    }
  }, [communeFundId]);

  useEffect(() => {
    reset({
      ...row,
      communeFundId: Number(row?.resource),
      resource: formaterNumberToCurrency(row?.resource),
      sceneryValue1: formaterNumberToCurrency(row?.sceneryValue1),
      sceneryValue2: formaterNumberToCurrency(row?.sceneryValue2),
      sceneryValue3: formaterNumberToCurrency(row?.sceneryValue3),
      sceneryPercentage1: `${parseInt(row?.sceneryPercentage1)}%`,
      sceneryPercentage2: `${parseInt(row?.sceneryPercentage2)}%`,
      sceneryPercentage3: `${parseInt(row?.sceneryPercentage3)}%`,
    });
  }, []);

  return {
    handleChange,
    handleChangeResource,
    control,
    register,
    errors,
    isValid,
    handleCancel,
    submitDisabled,
    onSubmit: handleSubmit(onSubmit),
    communeFundData,
  };
};
