import Acordion from "./acordion";
import SwitchComponent from "../../../common/components/Form/switch.component";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { InputComponent } from "../../../common/components/Form";
import TableJson from "./tableJson";
import { IPropDetailReglament } from "../../../common/interfaces/regulation";
import { EDirection } from "../../../common/constants/input.enum";
import TableRegulationView from "../modules/requeriments/table-regulation-view";

const RegulationDetailComponent = ({
  detailData,
  setValue,
  getValues,
  listPrograms,
  errors,
  control,
}: IPropDetailReglament) => {
  const preventClick = (e) => {
    return e.preventDefault();
  };

  return (
    <div className="container-modal-body">
      <Acordion
        title="Configuración inicial"
        classname="container-modal-acordion-title"
        onClick={async () => {}}
        switchElement={<></>}
        iconRow={true}
      >
        <>
          <div className="grid-form-2-container mb-16p">
            <SelectComponentOld
              idInput={"program"}
              value={String(detailData?.idProgram) ?? ""}
              disabled={true}
              data={listPrograms}
              label="Programa"
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest font-500"
              placeholder="Seleccionar"
            />
          </div>
          <div className="container-designation-three-objects grid-template-container-fourth col-gap-small mt-16px mb-16px">
            <InputComponent
              idInput="initialPeriod"
              disabled={true}
              defaultValue={detailData?.initialPeriod ?? "0"}
              typeInput="text"
              value={detailData?.initialPeriod}
              className="input-basic input-size"
              classNameLabel="text-black biggest font-500"
              label="Periodo inicial de convocatoria"
            />
            <div className="containerIsOpenPeriod">
              <SwitchComponent
                idInput={"isOpenPeriod"}
                defaultValue={detailData.isOpenPeriod == 1}
                size="normal"
                control={control}
                disabled={true}
                label={<>Convocatoria abierta</>}
                className="select-basic select-disabled-list input-size"
                classNameLabel="text-black biggest font-500"
              />
            </div>
            <InputComponent
              idInput="endPeriod"
              disabled={true}
              defaultValue={detailData?.endPeriod ?? "0"}
              typeInput="text"
              value={detailData?.endPeriod}
              className="input-basic input-size"
              classNameLabel="text-black biggest font-500"
              label="Periodo final de convocatoria"
            />
          </div>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica porcentaje de pago teórico semestral?"
              isOpen={detailData?.applyTheoreticalSemiannualPercent == 1}
              onClick={() => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  idInput={"theoreticalSemiannualPercent"}
                  disabled={true}
                  defaultValue={
                    detailData?.applyTheoreticalSemiannualPercent == 1
                  }
                  size="small"
                  classNameSwitch="opacity"
                  className="select-basic select-disabled-list input-size opacity"
                />
              }
            >
              <div className="containerApplyService">
                <div className="mb-24px">
                  <InputComponent
                    idInput="theoreticalSemiannualPercent"
                    disabled={true}
                    defaultValue={`${
                      detailData?.theoreticalSemiannualPercent ?? "0"
                    }%`}
                    typeInput="text"
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Porcentaje de pago teórico semestral"
                  />
                </div>
              </div>
            </Acordion>
          </div>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica porcentaje de rendimiento académico?"
              isOpen={detailData?.applyAcademicPerformancePercent == 1}
              onClick={() => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  idInput={"applyExtension"}
                  disabled={true}
                  defaultValue={
                    detailData?.applyAcademicPerformancePercent == 1
                  }
                  size="small"
                  classNameSwitch="opacity"
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest font-500"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <InputComponent
                    idInput="academicPerformancePercent"
                    disabled={true}
                    defaultValue={`${
                      detailData?.academicPerformancePercent ?? 0
                    }%`}
                    typeInput="text"
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Porcentaje de pago teórico semestral"
                  />
                </div>
              </div>
            </Acordion>
          </div>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica porcentaje de requisitos?"
              isOpen={detailData?.applyRequirementsPercent == 1}
              onClick={() => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  idInput={"applyExtension"}
                  disabled={true}
                  defaultValue={detailData?.applyRequirementsPercent == 1}
                  size="small"
                  classNameSwitch="opacity"
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest font-500"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <InputComponent
                    idInput="requirementsPercent"
                    disabled={true}
                    defaultValue={`${detailData?.requirementsPercent ?? 0}%`}
                    typeInput="text"
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Porcentaje de requisitos"
                  />
                </div>
              </div>
            </Acordion>
          </div>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica servicio social?"
              isOpen={detailData?.applySocialService == 1}
              onClick={() => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  idInput={"applySocialService"}
                  disabled={true}
                  defaultValue={detailData?.applySocialService == 1}
                  size="small"
                  classNameSwitch="opacity"
                  className="select-basic select-disabled-list input-size opacity"
                  classNameLabel="text-black biggest font-500"
                />
              }
            >
              <div className="grid-form-3-container gap-15">
                <InputComponent
                  idInput="socialServicePercent"
                  disabled={true}
                  defaultValue={`${detailData?.socialServicePercent || "0"} %`}
                  typeInput="text"
                  className="input-basic medium"
                  classNameLabel="text-black big text-required font-500"
                  label="Porcentaje de descuento por periodo"
                />
                <InputComponent
                  idInput="socialServiceHours"
                  defaultValue={`${detailData?.socialServiceHours}`}
                  typeInput="number"
                  className="input-basic medium"
                  classNameLabel="text-black big text-required font-500"
                  label="Horas por periodo"
                  disabled={true}
                />
                <InputComponent
                  idInput="socialServiceCondonationType"
                  defaultValue={`${detailData?.socialServiceCondonationType}`}
                  typeInput="text"
                  className="input-basic medium"
                  classNameLabel="text-black big text-required font-500"
                  label="Tipo de condonación"
                  disabled={true}
                />
              </div>
              {detailData?.knowledgeTransferCondonationPercent?.length > 0 && (
                <div className="mt-16px">
                  <TableRegulationView
                    detailData={detailData}
                    typeTable={{ socialService: 2 }}
                    viewPaginator={false}
                  />
                </div>
              )}
            </Acordion>
          </div>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica trasferencia de conocimiento?"
              isOpen={detailData?.applyKnowledgeTransfer == 1}
              onClick={() => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  idInput="applyKnowledgeTransfer"
                  disabled={true}
                  defaultValue={detailData?.applyKnowledgeTransfer == 1}
                  size="small"
                  classNameSwitch="opacity"
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest font-500"
                />
              }
            >
              <div className="grid-form-2-container gap-15">
                <InputComponent
                  idInput="knowledgeTransferPercent"
                  defaultValue={`${detailData?.knowledgeTransferPercent}`}
                  typeInput="number"
                  disabled={true}
                  className="input-basic medium"
                  classNameLabel="text-black big text-required font-500"
                  label="Porcentaje de cumplimiento"
                />
                <InputComponent
                  idInput="knowledgeTransferHours"
                  defaultValue={`${detailData?.knowledgeTransferHours}`}
                  typeInput="number"
                  className="input-basic medium"
                  classNameLabel="text-black big text-required font-500"
                  label="Horas totales por el crédito"
                  disabled={true}
                />
              </div>
            </Acordion>
          </div>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica periodo de gracia?"
              isOpen={detailData?.applyGracePeriod == 1}
              onClick={() => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  idInput={"applyGracePeriod"}
                  disabled={true}
                  defaultValue={detailData?.applyGracePeriod == 1}
                  size="small"
                  classNameSwitch="opacity"
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest font-500"
                />
              }
            >
              <div className="containerApplyService">
                <div className="mb-24px">
                  <InputComponent
                    idInput="gracePeriodMonths"
                    defaultValue={`${detailData?.gracePeriodMonths}`}
                    typeInput="number"
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Meses"
                    disabled={true}
                  />
                </div>
                <div className="mb-24px">
                  <InputComponent
                    idInput="graceDateApplication"
                    defaultValue={`${detailData?.graceDateApplication}`}
                    typeInput="text"
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Fecha de aplicación"
                    disabled={true}
                  />
                </div>
              </div>
            </Acordion>
          </div>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica suspensiones continuas?"
              isOpen={detailData?.applyContinuousSuspension == 1}
              onClick={() => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  idInput={"applyContinuousSuspension"}
                  defaultValue={detailData?.applyContinuousSuspension == 1}
                  disabled={true}
                  size="small"
                  classNameSwitch="opacity"
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest font-500"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <InputComponent
                    idInput="continuosSuspencionQuantity"
                    defaultValue={`${detailData?.continuosSuspencionQuantity}`}
                    typeInput="number"
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Cantidad"
                    disabled={true}
                  />
                </div>
              </div>
            </Acordion>
          </div>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica suspensiones discontinuas?"
              isOpen={detailData?.applyDiscontinuousSuspension == 1}
              onClick={async () => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  idInput={"applyDiscontinuousSuspension"}
                  defaultValue={detailData?.applyDiscontinuousSuspension == 1}
                  disabled={true}
                  size="small"
                  classNameSwitch="opacity"
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest font-500"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <InputComponent
                    idInput="discontinuousSuspensionQuantity"
                    defaultValue={`${detailData?.discontinuousSuspensionQuantity}`}
                    typeInput="number"
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Cantidad"
                    disabled={true}
                  />
                </div>
              </div>
            </Acordion>
          </div>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica suspensiones especiales?"
              isOpen={detailData?.applySpecialSuspensions == 1}
              onClick={async () => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  disabled={true}
                  idInput={"applySpecialSuspensions"}
                  defaultValue={detailData?.applySpecialSuspensions == 1}
                  size="small"
                  classNameSwitch="opacity"
                  className="select-basic select-disabled-list input-size mb-24px"
                  classNameLabel="text-black biggest font-500"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <InputComponent
                    idInput="specialSuspensionsQuantity"
                    disabled={true}
                    defaultValue={`${detailData?.specialSuspensionsQuantity}`}
                    typeInput="number"
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Cantidad"
                  />
                </div>
              </div>
            </Acordion>
          </div>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica prórroga?"
              isOpen={detailData?.applyExtension == 1}
              onClick={() => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  idInput={"applyExtension"}
                  disabled={true}
                  defaultValue={detailData?.applyExtension == 1}
                  size="small"
                  classNameSwitch="opacity"
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest font-500"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <InputComponent
                    idInput="extensionQuantity"
                    disabled={true}
                    defaultValue={`${detailData?.extensionQuantity}`}
                    typeInput="number"
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Cantidad"
                  />
                </div>
              </div>
            </Acordion>
          </div>
        </>
      </Acordion>
      <Acordion
        title="Porcentajes de condonación"
        classname="container-modal-acordion-title"
        onClick={() => {}}
        switchElement={<></>}
        iconRow={true}
      >
        <>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica condonación por rendimiento académico por periodo?"
              isOpen={detailData?.applyCondonationPerformancePeriod == 1}
              onClick={async () => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  idInput={"applyCondonationPerformancePeriod"}
                  defaultValue={
                    detailData?.applyCondonationPerformancePeriod == 1
                  }
                  disabled={true}
                  classNameSwitch="opacity"
                  size="small"
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest font-500"
                />
              }
            >
              <div>
                <TableJson
                  idInput="performancePeriod"
                  isOpen={detailData?.applyCondonationPerformancePeriod == 1}
                  setValue={setValue}
                  title="promedio y porcentaje de condonación"
                  onlyView={true}
                  getValues={getValues}
                  error={errors}
                  dataRead={detailData.performancePeriodStructure}
                />
              </div>
            </Acordion>
          </div>
          <div onClick={preventClick}>
            <Acordion
              title="¿Aplica condonación por rendimiento académico final acumulado?"
              isOpen={detailData?.applyAccomulatedIncomeCondonation == 1}
              onClick={async () => {}}
              onlyView
              switchElement={
                <SwitchComponent
                  control={control}
                  direction={EDirection.other}
                  idInput="applyAccomulatedIncomeCondonation"
                  disabled={true}
                  defaultValue={
                    detailData?.applyAccomulatedIncomeCondonation == 1
                  }
                  classNameSwitch="opacity"
                  size="small"
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest font-500"
                />
              }
            >
              <div>
                <TableJson
                  isOpen={detailData?.applyAccomulatedIncomeCondonation == 1}
                  idInput="accumulatedPerformance"
                  setValue={setValue}
                  title="Agregar promedio y porcentaje de condonación"
                  getValues={getValues}
                  error={errors}
                  onlyView={true}
                  dataRead={detailData.accumulatedPerformanceDataTable}
                />
              </div>
            </Acordion>
          </div>
        </>
      </Acordion>
      <Acordion
        title="Requisitos"
        classname="container-modal-acordion-title"
        onClick={async () => {}}
        switchElement={<></>}
        iconRow={true}
      >
        {detailData?.requirementsForReglament?.length > 0 && (
          <TableRegulationView
            detailData={detailData}
            typeTable={{ requirement: 1 }}
            viewPaginator={true}
          />
        )}
      </Acordion>
    </div>
  );
};

export default RegulationDetailComponent;
