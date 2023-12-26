import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { AppContext } from "../../../../../common/contexts/app.context";
import { BiPlusCircle } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import useYupValidationResolver from "../../../../../common/hooks/form-validator.hook";
import { updateSocialServiceSchema } from "../../../../../common/schemas/social-service-schema";
import { ISocialServiceBeneficiaryUpdate } from "../interface/social-service";
import { ApiResponse } from "../../../../../common/utils/api-response";
import { EResponseCodes } from "../../../../../common/constants/api.enum";

export default function useModalUploadChangeData(
  id: number,
  idConsolidationBeneficiary: number,
  state: boolean,
  observation: string,
  action: "edit" | "show",
  width: number,
  showUploadFile: boolean,
  loadTableData: (searchCriteria?: object) => void,
  editable: boolean,
  executeFunctionSubmit?: (data: FormData) => Promise<ApiResponse<any>>
) {
  const { setMessage } = useContext(AppContext);

  const [visible, setVisible] = useState(false);

  const [fileUploadData, setFileUploadData] = useState<File>(null);

  const { control, formState, unregister, handleSubmit } =
    useForm<ISocialServiceBeneficiaryUpdate>({
      defaultValues: {
        id,
        observation: observation ?? null,
        state: state ?? null,
        editable,
        idConsolidationBeneficiary,
      },
      resolver: useYupValidationResolver(updateSocialServiceSchema),
    });

  const showModalOnSubmit = handleSubmit(
    (data: ISocialServiceBeneficiaryUpdate) => {
      setMessage({
        title: "Servicio Social",
        description:
          "¿Estás segur@ de guardar la información de servicio social?",
        show: true,
        OkTitle: "Aceptar",
        cancelTitle: "Cancelar",
        onOk: () => {
          const formData = new FormData();
          formData.append("id", String(data.id));

          if (fileUploadData) {
            formData.append("files", fileUploadData);
          }

          formData.append(
            "idConsolidationBeneficiary",
            String(data.idConsolidationBeneficiary)
          );
          formData.append("state", Number(data.state) ? "true" : "false");
          formData.append("observation", data.observation);

          executeFunctionSubmit(formData).then((response) => {
            if (response.operation.code === EResponseCodes.OK) {
              setMessage({
                title: "Guardar",
                description: `¡Cambios guardados exitosamente!`,
                show: true,
                OkTitle: "Aceptar",
                onOk: () => {
                  setMessage((prev) => {
                    return { ...prev, show: false };
                  });
                  loadTableData();
                  // getUploadKnow()
                  handleChangeUploadFile(null);
                },
                onClose: () => {
                  setMessage({});
                  loadTableData();
                  // getUploadKnow()
                  handleChangeUploadFile(null);
                },
                background: true,
              });
            } else {
              setMessage({
                title: "Errpr",
                description: `Error al guardar cambios!`,
                show: true,
                OkTitle: "Aceptar",
                onOk: () => {
                  setMessage((prev) => {
                    return { ...prev, show: false };
                  });
                  handleChangeUploadFile(null);
                },
                onClose: () => {
                  setMessage({});
                  handleChangeUploadFile(null);
                },
                background: true,
              });
            }
          });
        },
        onClose: () => {
          setMessage({});
          handleChangeUploadFile(null);
        },
        onCancel: () => {
          setMessage({});
          handleChangeUploadFile(null);
        },
        background: true,
      });
    }
  );

  const handleChangeShowDialog = (e: boolean) => {
    setVisible(e);
  };

  const handleChangeUploadFile = (file: File) => {
    setFileUploadData(file);
  };

  const renderElementFile = (): React.JSX.Element => {
    if (!showUploadFile && action === "show") {
      return <></>;
    } else {
      if (!fileUploadData) {
        return (
          <div className="title-area-3 mt-14px">
            <div
              className={`title-button ${
                width < 300 ? "font-medium" : "font-big"
              } no-margin`}
              // disabled={action !== "edit"}
              onClick={() => handleChangeShowDialog(true)}
            >
              Adjuntar archivos <BiPlusCircle />
            </div>
          </div>
        );
      } else {
        return (
          <div className="title-area-3 mt-14px">
            <div
              className={`title-button color-red ${
                width < 300 ? "font-medium" : "font-big"
              } no-margin spc-common-table`}
              // disabled={action !== "edit"}
              style={{ justifyContent: "center" }}
              onClick={() => {
                handleChangeUploadFile(null);
              }}
            >
              {fileUploadData.name}{" "}
              <BsTrash className="button grid-button button-delete" />
            </div>
          </div>
        );
      }
    }
  };

  return {
    visible,
    fileUploadData,
    control,
    formState,
    renderElementFile,
    unregister,
    handleSubmit,
    handleChangeShowDialog,
    handleChangeUploadFile,
    setMessage,
    showModalOnSubmit,
  };
}
