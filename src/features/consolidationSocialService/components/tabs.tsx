import React from "react";
import Tab from "../../../common/components/Form/tab.component";

const Tabs = ({ view, setView }) => {
  return (
    <div className="containerTabs">
      <Tab checked={view === 0} onClick={() => setView(0)}>
        Servicio Social
      </Tab>
      <Tab checked={view === 1} onClick={() => setView(1)}>
        Liquidacion
      </Tab>
      <Tab checked={view === 2} onClick={() => setView(2)}>
        Soportes PQRSDF
      </Tab>
    </div>
  );
};

export default Tabs;
