import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function ResumenPriorizacionRoutes() {
  const ResumenPriorizacionSearchPage = lazy(
    () => import("./pages/resumen-priorizacion-search.page")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<ResumenPriorizacionSearchPage />}
            allowedAction={"RESUMEN_PRIORIZACION_CONSULTAR"}
          />
        }
      />

      {/* <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<VotingResultsPage />}
            allowedAction={"VOTACION_CREAR"}
          />
        }
      /> */}
    </Routes>
  );
}

export default React.memo(ResumenPriorizacionRoutes);
