import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";
import "./styles.scss";

function RegulationRoute() {
  const Regulation = lazy(() => import("./pages"));
  const Form = lazy(() => import("./pages/form"));

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <PrivateRoute
            element={<Regulation />}
            allowedAction={"MAESTRO_ACTIVIDAD_CONSULTAR"}
          />
        }
      />
      <Route
        path={"/form"}
        element={
          <PrivateRoute
            element={<Form />}
            allowedAction={"MAESTRO_ACTIVIDAD_CREAR"}
          />
        }
      />
      <Route
        path={"/form/:id"}
        element={
          <PrivateRoute
            element={<Form />}
            allowedAction={"MAESTRO_ACTIVIDAD_CREAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(RegulationRoute);
