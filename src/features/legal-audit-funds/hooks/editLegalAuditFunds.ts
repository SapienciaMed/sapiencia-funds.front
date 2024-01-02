import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { urlApiFunds } from "../../../common/utils/base-url";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { useGetcommuneFundIdHook } from "../../absorption-percentage/hooks/getcommuneFundIdHook";
import { ICallLegalResfilters } from "../../../common/interfaces/LegalAuditFunds";
import { editLegalAuditSchema } from "../../../common/schemas/legal-audit-schema";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";

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
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const [resourceRaw, setResourceRaw] = useState(0);

  const [resourceValue] = watch(["resource"]);
  const [formWatch, setFormWatch] = useState<ICallLegalResfilters>({});

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
      fiduciaryName: row?.fiduciaryName,
      resource: resourceRaw,
    };
    try {
      const endpoint = `/api/v1/legalized/update-commune-budget`;
      const resp = await put(endpoint, fullData);
      await reloadTable({ announcementId });

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
        onOk: async () => {
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

  useEffect(() => {
    const { resource, order } = formWatch;
    if (!resource || !order) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(false);
  }, [formWatch]);

  useEffect(() => {
    console.log("RESOURCE", resourceValue);
    let rawValue = parseInt(
      resourceValue
        ?.toString()
        ?.replace("$", "")
        .replace(",", "")
        .replace(".", "")
    );
    if (isNaN(rawValue)) rawValue = 0;
    setValue("resource", formaterNumberToCurrency(rawValue));
    setResourceRaw(rawValue);
  }, [resourceValue]);

  useEffect(() => {
    const rawValueFromRow = parseFloat(row?.resource);
    if (!isNaN(rawValueFromRow)) {
      setValue("resource", formaterNumberToCurrency(rawValueFromRow));
      setResourceRaw(rawValueFromRow);
    }
    setValue("update", new Date());
  }, [row]);

  useEffect(() => {
    reset(row);
    setValue("resource", formaterNumberToCurrency(row?.resource));
    setValue("update", new Date());
    setResourceRaw(row?.resource);
  }, [row]);

  return {
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
