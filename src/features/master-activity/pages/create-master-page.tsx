import React from "react";

import {CreateMasterActivityForm}  from "../forms/create-master-activity.form";

import useCreateActivityHook from "../hooks/create-master-activity.hook";

import TableComponent from "../../../common/components/table.component";

const CreateMasterPage = (): React.JSX.Element => {
  const {
    control,
    formState,
    onSubmit,
    redirectCreate,
    clearFields,
    formValues,
    showTable,
    activity,
    tableComponentRef,
    tableColumns,
    tableActions,
  } = useCreateActivityHook();

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
          Gestión territorial
          </label>
        </div>

        {/* <CreateMasterActivityForm
        //control={control}
        formState={formState}
        //activityList = {activity}
        //redirectCreate={redirectCreate}
        //clearFields={clearFields}
        onSubmit={onSubmit}
        formValues={formValues}
        />
       */}

    </div>
  </div>
  );
};  
          

export default React.memo(CreateMasterPage);

