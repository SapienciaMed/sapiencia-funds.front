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

      <Route
        path={"/visualizar/:actaNro"}
        element={
          <PrivateRoute
            element={<SearchResultPage />}
            allowedAction={"MAESTROS_CONSULTAR"}
          />
        }
      />

      <Route
        path={"/consultar/modificar-acta/:actaNro"}
        element={
          <PrivateRoute
            element={<SearchResultPage valueAction="edit" />}
            allowedAction={"MAESTROS_CONSULTAR"}
          />
        }
      />

    </Routes>
  );

}

export default React.memo(ActaRoutes);