import React from "react";
import MasterActivityForm from "../forms/master-activity.form";

const MasterActivityCreatePage = (): React.JSX.Element => {
  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Gestión territorial
          </label>
        </div>

        <MasterActivityForm />
      </div>
    </div>
  );
};

export default React.memo(MasterActivityCreatePage);
