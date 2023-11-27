import React, { lazy } from "react";
import "./styles.scss";
import { Route, Routes } from "react-router-dom";

function ConsolidationSocialServiceRoute() {
  const CreditConsolidation = lazy(() => import("./pages/creditConsolidation"));
  return (
    <Routes>
      <Route path={"/"} element={<CreditConsolidation />} />
    </Routes>
  );
}

export default React.memo(ConsolidationSocialServiceRoute);
