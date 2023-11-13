import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function ResourcePrioritizationRoutes() {
  const ResourcePrioritizationPage = lazy(
    () => import("./pages/resource-prioritization.page")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
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

export default React.memo(ResourcePrioritizationRoutes);
