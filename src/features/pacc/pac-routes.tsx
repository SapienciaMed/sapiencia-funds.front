import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/utils/auth-private-guard";

function PacRouter() {
    
    const CosolidatedTray = lazy(
        () => import("./pages/consolidated-tray.page")
    );

    return (
        <Routes>
            <Route
                path={"/bandeja-consolidacion"}
                element={
                <PrivateRoute
                    element={<CosolidatedTray />}
                    allowedAction={"MENU_CONSULTAS"}
                />
                }
            />
        </Routes>
    );

}

export default React.memo(PacRouter);