import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function VotingResultsRoutes() {
  const VotingResultsPage = lazy(() => import("./pages/voting-results.page"));

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<VotingResultsPage />}
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
    </Routes>
  );
}

export default React.memo(VotingResultsRoutes);
