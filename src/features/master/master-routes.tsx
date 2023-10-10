import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";
import MasterPage from "./pages/master.page";

function MasterRoutes() {
 
  const MasterCrudPage = lazy(
    () => import("./pages/master-crud.page")
  );
  const MasterPage = lazy(
    () => import("./pages/master.page")
  );


  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<MasterPage/>}
            allowedAction={"MAESTROS_CONSULTAR"}
          />
        }
      /> 
      
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<MasterCrudPage action={"new"}/>}
            allowedAction={"MAESTROS_CREAR"}
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
