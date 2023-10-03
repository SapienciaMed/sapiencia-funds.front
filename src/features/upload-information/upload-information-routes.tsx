import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function UploadInformationRoutes() {
  const SearchUploadInformationPage = lazy(
    () => import("./pages/search-upload-information.page")
  );

  const UploadInformationCreateUpdatePage = lazy(
    () => import("./pages/upload-information-create-update.page")
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
            element={<UploadInformationCreateUpdatePage action={"new"}/>}
            allowedAction={"MAESTRO_ACTIVIDAD_CREAR"}
          />
        }
      />
      <Route
        path={"/editar/:id"}
        element={
          <PrivateRoute
            element={<UploadInformationCreateUpdatePage action={"edit"}/>}
            allowedAction={"MAESTRO_ACTIVIDAD_EDITAR"}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(UploadInformationRoutes);