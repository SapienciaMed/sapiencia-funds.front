import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function ControlReportsRoutes() {
  const ControlReportPage = lazy(() => import("./pages/control-report.page"));

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<ControlReportPage />}
            allowedAction={"INFORME_CONTROL"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(ControlReportsRoutes);
