import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./common/contexts/app.context";
import "./styles/_app.scss";
// import "./styles/styles.scss";
import "./styles/_theme-prime.css";
import "primereact/resources/primereact.min.css";
import ModalMessageComponent from "./common/components/modal-message.component";
import ApplicationProvider from "./application-provider";
import VotingResultsRoutes from "./features/voting-results/voting-results-routes";
import MasterActivityRoutes from "./features/master-activity/master-activity-routes";
import UploadInformationRoutes from "./features/upload-information/upload-information-routes";
import useAppCominicator from "./common/hooks/app-communicator.hook";
import MasterRoutes from "./features/master/master-routes";
import ActaRoutes from "./features/acta/acta-routes";
import Socialization from "./features/socialization";
import Regulation from "./features/regulation";
import BudgetConvocationRoutes from "./features/budget-convocation/budget-convocation-routes";
import ResumenPriorizacionRoutes from "./features/resumen-priorizacion/resumen-priorizacion-routes";
import Cortes from "./features/cuts";
import ResourcePrioritizationRoutes from "./features/resource-prioritization/resource-prioritization-routes";

function App() {
  const { publish } = useAppCominicator();

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
              <Route
                path={"/fondos/priorizacion-recurso/*"}
                element={<ResourcePrioritizationRoutes />}
              />

              <Route
                path={"/fondos/resultados-votacion/*"}
                element={<VotingResultsRoutes />}
              />
              <Route
                path={"/fondos/resumen-priorizacion/*"}
                element={<ResumenPriorizacionRoutes />}
              />
              <Route 
                path={"/fondos/maestros-actividad/*"} 
                element={<MasterActivityRoutes />} 
              />
              <Route path={"/fondos/acta/*"} element={<ActaRoutes />} />
              <Route
                path={"/fondos/cargar-informacion/*"}
                element={<UploadInformationRoutes />}
              />
              <Route path={"/fondos/maestros/*"} element={<MasterRoutes />} />

              <Route
                path={"/fondos/presupuesto-convocatoria/*"}
                element={<BudgetConvocationRoutes />}
              />

              <Route
                path={"/fondos/socializacion/*"}
                element={<Socialization />}
              />

              <Route
                path={"/fondos/administracion/reglamento/*"}
                element={<Regulation />}
              />

              <Route
                path={"/fondos/administracion/cortes/*"}
                element={<Cortes />}
              />
            </Routes>
          </Suspense>
        </Router>
      </ApplicationProvider>
    </AppContextProvider>
  );
}

export default React.memo(App);
