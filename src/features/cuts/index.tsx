import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";
import "./style.scss";

function CutRoute() {
  const Search = lazy(() => import("./pages/search"));
  const Form = lazy(() => import("./pages/form"));

  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <Search
            auth={"CONSULTAR_CORTE"}
            authDelete={"ELIMINAR_CORTE"}
            authEdit={"EDITAR_CORTE"}
          />
        }
      />

      <Route path={"/form"} element={<Form auth={"CREAR_CORTE"} />} />
      <Route path={"/form/:id"} element={<Form auth={"EDITAR_CORTE"} />} />
    </Routes>
  );
}

export default React.memo(CutRoute);
