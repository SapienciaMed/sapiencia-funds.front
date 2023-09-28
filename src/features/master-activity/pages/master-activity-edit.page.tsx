import React, { useContext, useEffect, useState } from "react";
import { MasterActivityForm } from "../forms/master-activity.form";
import { useNavigate, useParams } from "react-router-dom";
import useMasterActivityApi from "../hooks/master-activity-api.hook";
import { IMasterActivity } from "../../../common/interfaces/funds.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";
import useCreateMasterHook from "../hooks/activity-create-update.hook";

const MasterActivityEditPage = (): React.JSX.Element => {
  const {
    control,
    formState,
    onSubmit,
    formValues,
    showTable,
    typeProgram,
    tableComponentRef,
  } = useCreateMasterHook();

  // Servicios
  const { id } = useParams();
  const { setMessage } = useContext(AppContext);
  const navigate = useNavigate();
  const { getMasterActivityById } = useMasterActivityApi();

  // States
  const [masterActivity, setMasterActivity] = useState<IMasterActivity>();

  // Effect que carga los datos iniciales
  useEffect(() => {
    getMasterActivityById(Number(id)).then((res) => {
      if (res.operation.code != EResponseCodes.OK || res.data.length == 0) {
        setMessage({
          show: true,
          title: "Actividad Mestro",
          background: true,
          description: res.operation.message,
          okTitle: "Aceptar",
          onOk() {
            navigate("fondos/maestro/consultar");
            setMessage({});
          },
        });
      } else {
        setMasterActivity(res.data[0]);
      }
    });
  }, [id]);

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large bold">
            Gestión territorial
          </label>
        </div>
        {masterActivity && 
        <MasterActivityForm
        onSubmit={onSubmit}
        formState={formState}
        typeProgram={typeProgram}
        initData={masterActivity} />}
      </div>
    </div>
  );
};

export default React.memo(MasterActivityEditPage);
