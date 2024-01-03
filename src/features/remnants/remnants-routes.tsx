import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function RemnantsRoutes() {
 
  const RemnantsPage = lazy(
    () => import("./pages/remnants.page")
  );  


  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<RemnantsPage/>}
            allowedAction={"EXCEDENTE_CONTRATOS_CONSULTAR"}
          />
        }
      /> 
      
     
  
    </Routes>
  );
}

export default React.memo(RemnantsRoutes);
