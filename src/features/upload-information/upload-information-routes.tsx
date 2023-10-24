import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function UploadInformationRoutes() {
  const SearchUploadInformationPage = lazy(
    () => import("./pages/search-upload-information.page")
  );

  const UploadCreatepage = lazy(
    () => import("./pages/upload-create.page")
  );


  return (
    <Routes>
      <Route
        path={"/consultar"}
        element={
          <PrivateRoute
            element={<SearchUploadInformationPage />}
            allowedAction={"MAESTRO_ACTIVIDAD_CONSULTAR"}
          />
        }
      />
      <Route
        path={"/crear"}
        element={
          <PrivateRoute
            element={<UploadCreatepage/>}
            allowedAction={"MAESTRO_ACTIVIDAD_CREAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(UploadInformationRoutes);