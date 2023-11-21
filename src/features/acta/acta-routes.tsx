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

  const SearchResultPage = lazy(
    () => import("./pages/search-result.page")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<ActaPage />}
            allowedAction={"CONSULTAR_ACTAS"}
          />
        }
      />
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<ActaCreatePage />}
            allowedAction={"CREAR_ACTAS"}
          />
        }
      />

      <Route
        path={"/visualizar/:actaNro"}
        element={
          <PrivateRoute
            element={<SearchResultPage />}
            allowedAction={"CONSULTAR_ACTAS"}
          />
        }
      />

      <Route
        path={"/consultar/modificar-acta/:actaNro"}
        element={
          <PrivateRoute
            element={<SearchResultPage valueAction="edit" />}
            allowedAction={"EDITAR_ACTAS"}
          />
        }
      />

    </Routes>
  );

}

export default React.memo(ActaRoutes);