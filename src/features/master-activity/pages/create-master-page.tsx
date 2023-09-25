import React from "react";

import {CreateMasterActivityForm}  from "../forms/create-master-activity.form";

import useCreateActivityHook from "../hooks/create-master-activity.hook";

import TableComponent from "../../../common/components/table.component";

interface IPropsCreateUpdateIncrementSalary {
  action: string;
}


const CreateMasterPage = ({
  action,
}: IPropsCreateUpdateIncrementSalary): React.JSX.Element => {
  const {
    control,
    formState,
    onSubmit,
    register,
    redirectCreate,
    redirectCancel,
    //formValues,
    showTable,
    activity,
    tableComponentRef,

  } = useCreateActivityHook(action);

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
          Gestión territorial
          </label>
        </div>

        <CreateMasterActivityForm
        register={register}
        control={control}
        formState={formState}
        onSubmit={onSubmit}
        redirectCancel={redirectCancel}
        />
      

    </div>
  </div>
  );
};  
          

export default React.memo(CreateMasterPage);

