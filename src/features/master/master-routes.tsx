import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function MasterRoutes() {
 
  const MasterCrudPage = lazy(
    () => import("./pages/master-crud.page")
  );


  return (
    <Routes>
      {/* <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchMasterActivityPage />}
            allowedAction={"MAESTRO_ACTIVIDAD_CONSULTAR"}
          />
        }
      /> */}
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<MasterCrudPage action={"new"}/>}
            allowedAction={"MAESTRO_ACTIVIDAD_CREAR"}
          />
        }
      />
    {/*   <Route
        path={"/editar/:id"}
        element={
          <PrivateRoute
            element={<MasterActivityCreatePage action={"edit"}/>}
            allowedAction={"MAESTRO_ACTIVIDAD_EDITAR"}
          />
        }
      /> */}
    </Routes>
  );
}

export default React.memo(MasterRoutes);
