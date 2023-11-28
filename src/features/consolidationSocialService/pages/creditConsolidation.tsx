import React, { useState } from "react";
import { InputComponent } from "../../../common/components/Form";
import Tabs from "../components/tabs";
import { SocialServiceTab } from "../modules/SocialServiceTab";

const CreditConsolidation = () => {
  const [view, setView] = useState(0);
  return (
    <div className="container-form">
      <div className="title-area">
        <p className="text-black text-29 ml-24px mt-20px mg-0">
          Consolidación servicio social
        </p>
      </div>
      <div className="container-form padding-form ">
        <p className="subtitle">Información Beneficiario</p>
        <div className="container-1">
          <InputComponent
            idInput="idCredito"
            typeInput="number"
            className="input-basic input-size"
            classNameLabel="text-black biggest"
            label="Id Credito"
            disabled
          />
          <InputComponent
            idInput="document"
            typeInput="number"
            className="input-basic input-size"
            classNameLabel="text-black biggest"
            label="Documento"
            disabled
          />
          <InputComponent
            idInput="name"
            typeInput="number"
            className="input-basic input-size"
            classNameLabel="text-black biggest"
            label="Nombre completo"
            disabled
          />
        </div>
        <div className="container-2-3">
          <InputComponent
            idInput="contact"
            typeInput="number"
            className="input-basic input-size"
            classNameLabel="text-black biggest"
            label="Numero de contacto"
            disabled
          />
          <InputComponent
            idInput="email"
            typeInput="number"
            className="input-basic input-size"
            classNameLabel="text-black biggest"
            label="Correo"
            disabled
          />
          <InputComponent
            idInput="program"
            typeInput="number"
            className="input-basic input-size"
            classNameLabel="text-black biggest"
            label="Programa"
            disabled
          />
        </div>
        <div className="container-2-3">
          <InputComponent
            idInput="proyectGires"
            typeInput="number"
            className="input-basic input-size"
            classNameLabel="text-black biggest"
            label="Giros Proyectados"
            disabled
          />
          <InputComponent
            idInput="realizeGires"
            typeInput="number"
            className="input-basic input-size"
            classNameLabel="text-black biggest"
            label="Giros Realizados"
            disabled
          />
          <InputComponent
            idInput="ingreseDate"
            typeInput="number"
            className="input-basic input-size"
            classNameLabel="text-black biggest"
            label="Fecha de ingreso"
            disabled
          />
        </div>
        <div className="container-4">
          <InputComponent
            idInput="finalizationMotive"
            typeInput="number"
            className="input-basic input-size"
            classNameLabel="text-black biggest"
            label="Motivo finalización"
            disabled
          />
        </div>
      </div>
      <p
        className="subtitle"
        style={{
          marginLeft: "30px",
        }}
      >
        Consolidación del crédito
      </p>
      <Tabs view={view} setView={setView} />
      <div className="container-form padding-form ">
        {view === 0 && <SocialServiceTab />}
        {view === 1 && <div>Liquidacion</div>}
        {view === 2 && <div>pqrs</div>}
      </div>
    </div>
  );
};

export default CreditConsolidation;
