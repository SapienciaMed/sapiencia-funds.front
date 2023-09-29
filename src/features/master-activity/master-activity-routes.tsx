import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function MasterActivityRoutes() {
  const SearchMasterActivityPage = lazy(
    () => import("./pages/search-master-activity.page")
  );

  const MasterActivityCreatePage = lazy(
    () => import("./pages/master-activity-create.page")
  );


  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchMasterActivityPage />}
            allowedAction={"MAESTRO_ACTIVIDAD_CONSULTAR"}
          />
        }
      />
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<MasterActivityCreatePage action={"new"}/>}
            allowedAction={"MAESTRO_ACTIVIDAD_CREAR"}
          />
        }
      />
      <Route
        path={"/editar/:id"}
        element={
          <PrivateRoute
            element={<MasterActivityCreatePage action={"edit"}/>}
            allowedAction={"MAESTRO_ACTIVIDAD_EDITAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(MasterActivityRoutes);
