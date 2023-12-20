import React, { lazy } from "react";
import PrivateRoute from "../../common/utils/auth-private-guard";
import { Routes, Route } from "react-router-dom";

function LegalAuditFundsRoutes() {
  const ConsultLegalAuditFundsRoute = lazy(
    () => import("./pages/ConsultLegalAuditFundsRoute")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<ConsultLegalAuditFundsRoute />}
            allowedAction={"FONDOS_LEGALIZADO"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(LegalAuditFundsRoutes);
