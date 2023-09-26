import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./common/contexts/app.context";
import "./styles/_app.scss";
import "./styles/_theme-prime.css";
import "primereact/resources/primereact.min.css";
import ModalMessageComponent from "./common/components/modal-message.component";
import ApplicationProvider from "./application-provider";
import VotingResultsRoutes from "./features/voting-results/voting-results-routes";
import MasterActivityRoutes from "./features/master-activity/master-activity-routes"
import useAppCominicator from "./common/hooks/app-communicator.hook";

function App() {
  const { publish } = useAppCominicator();
  const HomePage = lazy(() => import("./common/components/home.page"));

  // Effect que comunica la aplicacion actual
  useEffect(() => {
    localStorage.setItem("currentAplication", process.env.aplicationId);
    setTimeout(
      () => publish("currentAplication", process.env.aplicationId),
      500
    );
  }, []);

  return (
    <AppContextProvider>
      <ModalMessageComponent />
      <ApplicationProvider>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path={"/fondos/"} element={<HomePage />} />;
              <Route
                path={"/fondos/resultados-votacion/*"}
                element={<VotingResultsRoutes />}
              />
              <Route
                path={"/fondos/maestro/*"}
                element={<MasterActivityRoutes />}
              />
            </Routes>
          </Suspense>
        </Router>
      </ApplicationProvider>
    </AppContextProvider>
  );
}

export default React.memo(App);
