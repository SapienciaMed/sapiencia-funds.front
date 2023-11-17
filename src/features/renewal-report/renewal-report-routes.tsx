import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function RenewalReportRoutes() {
    const SearchRenewalReportPage = lazy(
        () => import("./pages/renewal-report.page")
      );

      return (
        <Routes>
          <Route
            path={"/consultar"}
            element={
              <PrivateRoute
                element={<SearchRenewalReportPage />}
                allowedAction={"MAESTRO_ACTIVIDAD_CONSULTAR"}
              />
            }
            />
        </Routes>
      );
    }
    

export default React.memo(RenewalReportRoutes);
