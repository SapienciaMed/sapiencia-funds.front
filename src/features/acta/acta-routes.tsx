import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";


function ActaRoutes() {

  const ActaPage = lazy(
    () => import("./pages/acta.page")
  );
  const ActaCreatePage = lazy(
    () => import("./pages/acta-create.page")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<ActaPage />}
            allowedAction={"MAESTROS_CONSULTAR"}
          />
        }
      />
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<ActaCreatePage />}
            allowedAction={"MAESTROS_CREAR"}
          />
        }
      />

    </Routes>
  );

}

export default React.memo(ActaRoutes);