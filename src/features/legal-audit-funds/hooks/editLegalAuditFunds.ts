import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { urlApiFunds } from "../../../common/utils/base-url";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { createPeriodsAbsorptionSchema } from "../../../common/schemas/PeriodsAbsorption.shema";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";
import { useGetcommuneFundIdHook } from "../../absorption-percentage/hooks/getcommuneFundIdHook";
import {
  ICreatePeriodsAbsorption,
  IPeriodsAbsorption,
} from "../../../common/interfaces/PeriodsAbsorption.interface";

export const useEditLegalAuditFundsModal = (
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

  const [formWatch, setFormWatch] = useState<ICreatePeriodsAbsorption>({
    sceneryPercentage1: 0,
    sceneryPercentage2: 0,
    sceneryPercentage3: 0,
  });

  const [communeFundId, resourceValue] = watch(["communeFundId", "resource"]);
  const onSubmit = handleSubmit(async (formData) => {
    try {
      setMessage({
        title: "Actualizar",
        description: "¿Estas seguro que deseas actualizar la información?",
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
        description: "¡Información actualizada exitosamente!",
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
    setFormWatch({
      ...formWatch,
      [name]: parseFloat(value),
    });
    setValue(name, value);
  };

  useEffect(() => {
    const sceneryValue1 = resourceValue * formWatch.sceneryPercentage1;
    const sceneryValue2 = resourceValue * formWatch.sceneryPercentage2;
    const sceneryValue3 = resourceValue * formWatch.sceneryPercentage3;

    setValue("sceneryValue1", formaterNumberToCurrency(sceneryValue1));
    setValue("sceneryValue2", formaterNumberToCurrency(sceneryValue2));
    setValue("sceneryValue3", formaterNumberToCurrency(sceneryValue3));
  }, [
    row,
    resourceValue,
    formWatch.sceneryPercentage1,
    formWatch.sceneryPercentage2,
    formWatch.sceneryPercentage3,
  ]);

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
    const resourceFound = searchCommuneFundByValue(communeFundId);
    setValue("resource", resourceFound?.value);
  }, [communeFundId]);

  useEffect(() => {
    reset(row);
  }, [row]);

  console.log(row);

  return {
    handleChange,
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
