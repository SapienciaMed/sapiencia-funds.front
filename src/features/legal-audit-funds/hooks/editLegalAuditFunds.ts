import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { urlApiFunds } from "../../../common/utils/base-url";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { useGetcommuneFundIdHook } from "../../absorption-percentage/hooks/getcommuneFundIdHook";
import {
  ICallLegalResfilters,
  ILegalAuditFunds,
} from "../../../common/interfaces/LegalAuditFunds";
import { editLegalAuditSchema } from "../../../common/schemas/legal-audit-schema";

export const useEditLegalAuditFundsModal = (
  announcementId,
  row,
  reloadTable
) => {
  const { setMessage } = useContext(AppContext);
  const { put } = useCrudService(urlApiFunds);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { communeFund: communeFundData, searchCommuneFundByValue } =
    useGetcommuneFundIdHook();
  const resolver = useYupValidationResolver(editLegalAuditSchema);
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });

  // const [communeFundId, resource] = watch(["communeFundId", "resource"]);

  const [formWatch, setFormWatch] = useState<ILegalAuditFunds>({
    resource: "",
    order: "",
    fiduciaryId: "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formWatch);
  }, [formWatch]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      setMessage({
        title: "Actualizar",
        description: "¿Estás seguro que deseas actualizar la información?",
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
      console.error(err);
    }
  });

  const EditItem = async (data: ICallLegalResfilters) => {
    const fullData = {
      ...data,
      ...formWatch,
      announcementId,
    };
    try {
      const endpoint = `/api/v1/legalized/update-commune-budget`;
      const resp = await put(endpoint, fullData);
      // await reloadTable({ announcementId });

      if (resp.operation.code === "FAIL") {
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
        onOk: () => setMessage({ show: false }),
        background: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setMessage((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    setValue("communeFundId", row?.communeFundId);
    setValue("resource", row?.resource);
    setValue("fiduciaryId", row?.fiduciaryId);
    setValue("update", new Date());
    setValue("order", row?.order);
  }, [row]);

  useEffect(() => {
    const { resource, order } = formWatch;
    if (!resource || !order) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(false);
  }, [formWatch]);

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
