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

  const MasterActivityEditPage = lazy(
    () => import("./pages/master-activity-edit.page")
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
            element={<MasterActivityCreatePage />}
            allowedAction={"MAESTRO_ACTIVIDAD_CREAR"}
          />
        }
      />
      <Route
        path={"/editar/:id"}
        element={
          <PrivateRoute
            element={<MasterActivityEditPage />}
            allowedAction={"MAESTRO_ACTIVIDAD_EDITAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(MasterActivityRoutes);
