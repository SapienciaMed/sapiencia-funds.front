import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function DatingReportRoutes() {
  const SearchDatingReportPages = lazy(
    () => import("./pages/search-dating-report")
  );


  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchDatingReportPages />}
            allowedAction={"CONSULTAR_INFOME_CITAS"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(DatingReportRoutes);