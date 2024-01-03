import React, { lazy } from "react";
import PrivateRoute from "../../common/utils/auth-private-guard";
import { Routes, Route } from "react-router-dom";

function FinancialMonitoringRoutes() {
  const ConsultFinancialMonitoring = lazy(
    () => import("./pages/ConsultFinancialMonitoring")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<ConsultFinancialMonitoring />}
            allowedAction={"FONDOS_PORCENTAJE_ABSORCION_CONSULTAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(FinancialMonitoringRoutes);
