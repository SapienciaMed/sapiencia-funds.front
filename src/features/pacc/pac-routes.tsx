import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function PacRouter() {
    
    const CosolidatedTray = lazy(
        () => import("./pages/consolidated-tray.page")
    );

    const ManagerPage = lazy(
        () => import("./pages/manage.page")
    );

    return (
        <Routes>
            <Route
                path={"/bandeja-consolidacion"}
                element={
                    <PrivateRoute
                        element={<CosolidatedTray />}
                        allowedAction={"BANDEJA_CONSOLIDACION"}
                    />
                }
            />
            <Route
                path={"/bandeja-consolidacion/gestion/:id"}
                element={
                    <PrivateRoute
                        element={<ManagerPage />}
                        allowedAction={"TECNICO_PASO_COBRO"}
                    />
                }
            />
        </Routes>
    );

}

export default React.memo(PacRouter);