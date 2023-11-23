import React, { Fragment, useEffect, useState } from "react";
import { FormComponent, InputComponent } from "../../../common/components/Form";
import { useConsultControlReport } from "../hooks/controlreport";

const Controlreporteditconsolidation = (data) => {
  const [comuna, setComuna] = useState(null);
  const [nroPreseleccionado, setnroPreseleccionado] = useState(null);
  const [cupos, setCupos] = useState(null);
  const [recursoDisponible, setRecursodisponible] = useState(null);
  const [otorgado, setOtorgado] = useState(null);
  const [disponible, setDisponible] = useState(null);
  const [porParcipacion, setPorParticipacon] = useState(null);
  const [noLegalizados, setnoLegalizados] = useState(null);
  const [redimientosFinancieros, setRendimientosFinancieros] = useState(null);
  const info = data.data;

  console.log(info);
  const setInfo = async (data) => {
    setComuna(data.resourcePrioritization.communeId);
    setnroPreseleccionado(data.consolidatedPreselected);
    setCupos(data.resourcePrioritization.places);
    setRecursodisponible(data.consolidatedResourceAvailable);
    setOtorgado(data.consolidatedGranted);
    setDisponible(
      Number(data.consolidatedResourceAvailable) -
        Number(data.consolidatedGranted)
    );
    setPorParticipacon(
      Math.round(
        (data.consolidatedGranted / data.consolidatedResourceAvailable) * 100
      )
    );
    setnoLegalizados(data.consolidatedLegalized);
    setRendimientosFinancieros(data.consolidatedFinancialReturns);
  };

  useEffect(() => {
    setInfo(info);
  }, []);
  return (
    <Fragment>
      <FormComponent id="createItemsForm" action={onsubmit}>
        <section>
          <div className="grid-form-4-container gap-25 mt-24px">
            <InputComponent
              idInput="noProject"
              label={<>Comuna o corregimiento</>}
              //register={register}
              typeInput="text"
              //errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              //onChange={handleChange}
              disabled
              value={String(comuna)}
            />
            <InputComponent
              idInput="noProject"
              label={<>Nro de preseleccionados</>}
              //register={register}
              typeInput="text"
              //errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              //onChange={handleChange}
              value={String(nroPreseleccionado)}
            />
            <InputComponent
              idInput="noProject"
              label={<>Cupos</>}
              //register={register}
              typeInput="text"
              //errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              value={String(cupos)}
            />
            <InputComponent
              idInput="noProject"
              label={<>Recurso disponible</>}
              //register={register}
              typeInput="text"
              //errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              value={String(recursoDisponible)}
            />
          </div>
        </section>

        <section>
          <div className="grid-form-4-container gap-25 mt-24px">
            <InputComponent
              idInput="noProject"
              label={<>Otorgado</>}
              //register={register}
              typeInput="text"
              //errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              //onChange={handleChange}
              value={String(otorgado)}
            />
            <InputComponent
              idInput="noProject"
              label={<>Disponible</>}
              //register={register}
              typeInput="text"
              //errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              //onChange={handleChange}
              disabled
              value={String(disponible)}
            />
            <InputComponent
              idInput="noProject"
              label={<>%Participacion</>}
              //register={register}
              typeInput="text"
              //errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
              value={String(porParcipacion)}
            />
            <InputComponent
              idInput="noProject"
              label={<>No. Legalizados</>}
              //register={register}
              typeInput="text"
              //errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              value={String(noLegalizados)}
            />
          </div>
        </section>
        <section>
          <div className="grid-form-4-container gap-25 mt-24px">
            <InputComponent
              idInput="noProject"
              label={<>Rendimientos financieros</>}
              //register={register}
              typeInput="text"
              //errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              //onChange={handleChange}
              value={String(redimientosFinancieros)}
            />
          </div>
        </section>
      </FormComponent>
    </Fragment>
  );
};

export default React.memo(Controlreporteditconsolidation);
