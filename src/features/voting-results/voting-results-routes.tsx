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
            allowedAction={"INDICADOR_ACCION_SEGURIDAD"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(VotingResultsRoutes);
