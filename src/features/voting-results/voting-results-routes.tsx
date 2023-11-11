import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";
import ResourcePrioritizationPage from "./pages/resource-prioritization.page";

function VotingResultsRoutes() {
  const VotingResultsPage = lazy(() => import("./pages/voting-create.page"));
  const VotingResultsSearchPage = lazy(
    () => import("./pages/voting-search.page")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<VotingResultsSearchPage />}
            allowedAction={"VOTACION_CONSULTAR"}
          />
        }
      />

      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<VotingResultsPage />}
            allowedAction={"VOTACION_CREAR"}
          />
        }
      />

      <Route
        path={"/priorizacion-recurso"}
        element={
          <PrivateRoute
            element={<ResourcePrioritizationPage />}
            allowedAction={"PRIORIZACION_RECURSOS_PP"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(VotingResultsRoutes);
