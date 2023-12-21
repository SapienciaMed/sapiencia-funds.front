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
import {
  IEditLegalAuditFunds,
  ILegalAuditFunds,
} from "../../../common/interfaces/LegalAuditFunds";

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

    setValue(name, value);
  };

  useEffect(() => {
    if (!communeFundId || !resourceValue) {
      return setSubmitDisabled(true);
    }
    setSubmitDisabled(false);
  }, [communeFundId]);

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
