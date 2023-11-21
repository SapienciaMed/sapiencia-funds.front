import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function BudgetConvocationRoutes() {
  const SearchBudgetConvocationPage = lazy(
    () => import("./pages/budget-convocation.page")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchBudgetConvocationPage />}
            allowedAction={"PRESPUESTO_CONVOCATORIA_CONSULTAR"}
          />
        }
        />
    </Routes>
  );
}

export default React.memo(BudgetConvocationRoutes);
