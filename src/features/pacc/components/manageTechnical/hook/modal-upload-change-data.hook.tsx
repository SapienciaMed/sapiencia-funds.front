import { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { AppContext } from "../../../../../common/contexts/app.context";
import { BiPlusCircle } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";

export default function useModalUploadChangeData(
  state: boolean,
  observation: string,
  action: "edit" | "show",
  width: number,
  showUploadFile: boolean
) {
  const { setMessage } = useContext(AppContext);

  const [visible, setVisible] = useState(false);

  const [fileUploadData, setFileUploadData] = useState<File>(null);

  const { control, formState, unregister, handleSubmit } = useForm({
    defaultValues: {
      observation: observation ?? "",
      state: state ?? null,
    },
  });

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
  };
}
