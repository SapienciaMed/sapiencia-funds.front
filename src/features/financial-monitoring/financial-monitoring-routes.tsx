import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function FinancialMonitoringRoutes() {
  const SearchFinancialMonitoringPage = lazy(
    () => import("./pages/financial-monitoring.page")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchFinancialMonitoringPage />}
            allowedAction={"MAESTRO_ACTIVIDAD_CONSULTAR"}
          />
        }
        />
    </Routes>
  );
}

export default React.memo(FinancialMonitoringRoutes);
