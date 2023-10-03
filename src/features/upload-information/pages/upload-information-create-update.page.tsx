import React from "react";
import { CreateUploadInformationForm } from "../forms/upload-information.form";
import {UserNotifyUploadInformationForm} from "../forms/users-notice-upload-information.form"
import {FileUploadInformationForm} from "../forms/file-upload-information.form"
import useCreateUploadHook from "../hooks/upload-create-update.hook";
import { ButtonComponent } from "../../../common/components/Form";

interface IPropsCreateUpdateActivity {
  action: string;
}

const MasterActivityCreatePage = ({
  action,
}: IPropsCreateUpdateActivity): React.JSX.Element => {
  const {
    register,
    control,
    formState,
    onSubmit,
    formValues,
    showTable,
    tableComponentRef,
    //tableColumns,
    //tableActions,
    activeWorkerList,
  } = useCreateUploadHook();


  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Cargar archivo
          </label>
        </div>

        <CreateUploadInformationForm
          register={register}
          control={control}
          formState={formState}
          onSubmit={onSubmit}
          formValues={formValues}
        />

        <div className="">
          <br />
          <h3>Si tienes más de un documento, se deben unir en un solo archivo para ser cargados.</h3>
        </div>

        <FileUploadInformationForm
          register={register}
          control={control}
          formState={formState}
          onSubmit={onSubmit}
          formValues={formValues}
        />

        <div className="title-area">
          <label className="text-black extra-large bold">
            Usuarios a notificar
          </label>
        </div>

        <UserNotifyUploadInformationForm
          register={register}
          control={control}
          formState={formState}
          onSubmit={onSubmit}
          formValues={formValues}
          activeWorkerList = {activeWorkerList}
        />

        <div className="button-save-container-display">
          <ButtonComponent
            value={"Guardar"}
            className="button-save disabled-black big"
          //disabled={!name}
          />
        </div>

      </div>
    </div>
  );
};

export default React.memo(MasterActivityCreatePage);
