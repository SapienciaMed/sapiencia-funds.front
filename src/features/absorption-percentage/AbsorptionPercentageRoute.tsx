import React, { lazy } from "react";
import PrivateRoute from "../../common/utils/auth-private-guard";
import { Routes, Route } from "react-router-dom";
import ConsultAbsorptionPercentage from "./pages/ConsultAbsorptionPercentage";
import EditAbsorptionPercentageModal from "./forms/formsActions/CreateAbsorptionPercentageModal";
import CreateAbsorptionPercentage from "./forms/formsActions/CreateAbsorptionPercentageModal";

function AbsorptionPercentageRoutes() {
  const ConsultAbsorptionPercentage = lazy(
    () => import("./pages/ConsultAbsorptionPercentage")
  );

  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<ConsultAbsorptionPercentage />}
            allowedAction={"FONDOS_PORCENTAJE_ABSORCION_CONSULTAR"}
          />
        }
      />
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={
              <CreateAbsorptionPercentage
                announcementId={undefined}
                reloadTable={undefined}
              />
            }
            allowedAction={"FONDOS_PORCENTAJE_ABSORCION_CONSULTAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(AbsorptionPercentageRoutes);
