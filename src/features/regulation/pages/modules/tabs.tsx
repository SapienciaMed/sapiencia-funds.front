import React from "react";
import Tab from "../../../../common/components/Form/tab.component";

const Tabs = ({ view }) => {
  return (
    <div className="containerTabs">
      <Tab checked={view === 0}>Configuracion inicial</Tab>
      <Tab checked={view === 1}>Porcentajes de condonación</Tab>
      <Tab checked={view === 2}>Requisitos</Tab>
    </div>
  );
};

export default Tabs;
