import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";
import "./styles.scss";

function RegulationRoute() {
  const Regulation = lazy(() => import("./pages/regulation-serch.page"));
  const Form = lazy(() => import("./pages/regulation-form.page"));

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <Regulation
            auth={"CONSULTAR_REGLAMENTO"}
            authDetail={"DETALLE_REGLAMENTO"}
            authEdit={"EDITAR_REGLAMENTO"}
          />
        }
      />

      <Route path={"/form"} element={<Form auth={"CREAR_REGLAMENTO"} />} />
      <Route
        path={"/form/:id/:onlyView"}
        element={<Form auth={"DETALLE_REGLAMENTO"} />}
      />
      <Route path={"/form/:id"} element={<Form auth={"EDITAR_REGLAMENTO"} />} />
    </Routes>
  );
}

export default React.memo(RegulationRoute);
