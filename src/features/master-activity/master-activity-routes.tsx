import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function MasterActivityRoutes() {
    const SearchMasterActivityPage = lazy(
        () => import("./pages/search-master-activity.page")
    );
 
    const CreateUpdateMasterActivityPage = lazy(
        () => import("./pages/create-update-master-page")
    );

    return (
        <Routes>
            <Route
                path={"/consultar"}
                element={
                    <PrivateRoute
                        element={<SearchMasterActivityPage />}
                        allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
                    />
                }
            />
            <Route
                path={"/crear"}
                element={
                    <PrivateRoute
                        element={<CreateUpdateMasterActivityPage />}
                        allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
                    />
                }
            />
            <Route
                path={"/edit/:id"}
                element={
                    <PrivateRoute
                        element={< CreateUpdateMasterActivityPage />}
                        allowedAction={"NMN_TRABAJADOR_CONTRATAR"}
                    />
                }
            />
        </Routes>
    );
}

export default React.memo(MasterActivityRoutes);