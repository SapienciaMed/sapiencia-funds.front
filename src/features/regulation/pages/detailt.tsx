import React from "react";
import Acordion from "../components/acordion";
import SwitchComponent from "../../../common/components/Form/switch.component";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { Controller } from "react-hook-form";
import { InputComponent } from "../../../common/components/Form";
import TableJson from "../components/tableJson";
import Requirements from "./modules/requeriments/Requirements";
import { LIST_DATA_GRACE_PERIOD, periods } from "../service";

const DetailReglament = ({
  isOpen,
  onClose,
  detailData,
  control,
  errors,
  setValue,
  getValues,
  listPrograms,
}) => {
  if (!isOpen || !detailData) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-reglament">
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
        <p className="title-modal-reglament">Detalle Reglamento</p>
        <div className="container-modal-body">
          <Acordion
            title="Configuración inicial"
            classname="container-modal-acordion-title"
            onClick={async () => {}}
            switchElement={<></>}
          >
            <>
              <div className="containerProgram mb-24px">
                <SelectComponentOld
                  idInput={"program"}
                  value={detailData?.program ? detailData?.program : ""}
                  errors={errors}
                  disabled={true}
                  data={listPrograms}
                  label={<>Programa</>}
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest font-500"
                  placeholder="Seleccionar"
                />
              </div>
              <div className="containerGroup mb-24px">
                <div className="containerInitialPeriod ">
                  <SelectComponentOld
                    idInput={"initialPeriod"}
                    errors={errors}
                    value={
                      detailData?.initialPeriod ? detailData?.initialPeriod : ""
                    }
                    data={periods}
                    disabled={true}
                    label={<>Periodo inicial de convocatoria</>}
                    className="select-basic select-disabled-list input-size"
                    classNameLabel="text-black biggest font-500"
                    placeholder="Seleccionar"
                  />
                </div>
                <div className="containerIsOpenPeriod">
                  <SwitchComponent
                    idInput={"isOpenPeriod"}
                    errors={errors}
                    control={control}
                    defaultValue={detailData?.isOpenPeriod}
                    size="normal"
                    disabled={true}
                    label={<>Convocatoria abierta</>}
                    className="select-basic select-disabled-list input-size"
                    classNameLabel="text-black biggest font-500"
                  />
                </div>

                <div className="containerEndPeriod">
                  <SelectComponentOld
                    idInput={"endPeriod"}
                    errors={errors}
                    disabled={true}
                    value={detailData?.endPeriod}
                    data={periods}
                    label={<>Periodo final de convocatoria</>}
                    className="select-basic select-disabled-list input-size"
                    classNameLabel="text-black biggest font-500"
                    placeholder="Seleccionar"
                  />
                </div>
              </div>
              <div className="percentageSemiannualPayment mb-24px">
                <Controller
                  control={control}
                  name={"theoreticalPercentage"}
                  defaultValue={`${detailData?.theoreticalPercentage}%`}
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        errors={errors}
                        disabled={true}
                        defaultValue={`${detailData?.theoreticalPercentage}%`}
                        typeInput="text"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={`${detailData?.theoreticalPercentage}%`}
                        className="input-basic input-size"
                        classNameLabel="text-black biggest font-500"
                        label="Porcentaje de pago teórico semestral"
                        min={0}
                        max={100}
                      />
                    );
                  }}
                />
              </div>
              <div>
                <Acordion
                  title="¿Aplica servicio social?"
                  isOpen={detailData?.applySocialService}
                  onClick={() => {}}
                  switchElement={
                    <SwitchComponent
                      idInput={"applySocialService"}
                      errors={errors}
                      disabled={true}
                      control={control}
                      onClick={() => {}}
                      onChange={() => {}}
                      size="small"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div className="mb-24px">
                      <Controller
                        control={control}
                        name={"socialServicePercentage"}
                        render={({ field }) => {
                          return (
                            <InputComponent
                              idInput={field.name}
                              errors={errors}
                              disabled={true}
                              defaultValue={`${detailData?.socialServicePercentage}`}
                              typeInput="number"
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              value={field.value}
                              className="input-basic input-size "
                              classNameLabel="text-black biggest font-500"
                              label="Porcentaje de descuento por periodo"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="mb-24px">
                      <Controller
                        control={control}
                        name={"socialServiceHours"}
                        render={({ field }) => {
                          return (
                            <InputComponent
                              idInput={field.name}
                              errors={errors}
                              defaultValue={`${detailData?.socialServiceHours}`}
                              typeInput="number"
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              value={field.value}
                              className="input-basic input-size"
                              classNameLabel="text-black biggest font-500"
                              label="Horas por periodo"
                              disabled={true}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div>
                <Acordion
                  title="¿Aplica trasferencia de conocimiento?"
                  isOpen={detailData?.knowledgeTransferApply}
                  onClick={() => {}}
                  switchElement={
                    <SwitchComponent
                      idInput={"knowledgeTransferApply"}
                      errors={errors}
                      disabled={true}
                      control={control}
                      onChange={() => {}}
                      size="small"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div className="mb-24px">
                      <Controller
                        control={control}
                        name={"knowledgeTransferPercentage"}
                        render={({ field }) => {
                          return (
                            <InputComponent
                              idInput={field.name}
                              errors={errors}
                              defaultValue={`${detailData?.knowledgeTransferPercentage}`}
                              typeInput="number"
                              onChange={field.onChange}
                              disabled={true}
                              onBlur={field.onBlur}
                              value={field.value}
                              className="input-basic input-size "
                              classNameLabel="text-black biggest font-500"
                              label="Porcentaje de cumplimiento"
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="mb-24px">
                      <Controller
                        control={control}
                        name={"knowledgeTransferHours"}
                        render={({ field }) => {
                          return (
                            <InputComponent
                              idInput={field.name}
                              errors={errors}
                              defaultValue={`${detailData?.knowledgeTransferHours}`}
                              typeInput="number"
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              value={field.value}
                              className="input-basic input-size"
                              classNameLabel="text-black biggest font-500"
                              label="Horas totales por el crédito"
                              disabled={true}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div>
                <Acordion
                  title="¿Aplica periodo de gracia?"
                  isOpen={detailData?.gracePeriodApply}
                  onClick={async () => {}}
                  switchElement={
                    <SwitchComponent
                      idInput={"gracePeriodApply"}
                      errors={errors}
                      disabled={true}
                      control={control}
                      onChange={() => {}}
                      size="small"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div className="mb-24px">
                      <Controller
                        control={control}
                        name={"gracePeriodMonths"}
                        render={({ field }) => {
                          return (
                            <InputComponent
                              idInput={field.name}
                              errors={errors}
                              defaultValue={`${detailData?.gracePeriodMonths}`}
                              typeInput="number"
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              value={field.value}
                              className="input-basic input-size"
                              classNameLabel="text-black biggest font-500"
                              label="Meses"
                              disabled={true}
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="mb-24px">
                      <SelectComponentOld
                        idInput={"gracePeriodApplication"}
                        value={detailData?.gracePeriodApplication}
                        errors={errors}
                        data={LIST_DATA_GRACE_PERIOD} //pendiente
                        label={<>Fecha de aplicación</>}
                        className="select-basic select-disabled-list input-size"
                        classNameLabel="text-black biggest font-500"
                        placeholder="Seleccionar"
                        disabled={true}
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div>
                <Acordion
                  title="¿Aplica suspensiones continuas?"
                  isOpen={detailData?.continuousSuspensionApplies}
                  onClick={() => {}}
                  switchElement={
                    <SwitchComponent
                      idInput={"continuousSuspensionApplies"}
                      errors={errors}
                      disabled={true}
                      control={control}
                      onChange={() => {}}
                      size="small"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div>
                      <Controller
                        control={control}
                        name={"continuosSuspencionQuantity"}
                        render={({ field }) => {
                          return (
                            <InputComponent
                              idInput={field.name}
                              errors={errors}
                              defaultValue={`${detailData?.continuosSuspencionQuantity}`}
                              typeInput="number"
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              value={field.value}
                              className="input-basic input-size"
                              classNameLabel="text-black biggest font-500"
                              label="Cantidad"
                              disabled={true}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div>
                <Acordion
                  title="¿Aplica suspensiones discontinuas?"
                  isOpen={detailData?.applyDiscontinuousSuspension}
                  onClick={async () => {}}
                  switchElement={
                    <SwitchComponent
                      idInput={"applyDiscontinuousSuspension"}
                      errors={errors}
                      control={control}
                      disabled={true}
                      onChange={() => {}}
                      size="small"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div>
                      <Controller
                        control={control}
                        name={"discontinuousSuspensionQuantity"}
                        render={({ field }) => {
                          return (
                            <InputComponent
                              idInput={field.name}
                              errors={errors}
                              defaultValue={`${detailData?.discontinuousSuspensionQuantity}`}
                              typeInput="number"
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              value={field.value}
                              className="input-basic input-size"
                              classNameLabel="text-black biggest font-500"
                              label="Cantidad"
                              disabled={true}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div>
                <Acordion
                  title="¿Aplica suspensiones especiales?"
                  isOpen={detailData?.applySpecialSuspensions}
                  onClick={async () => {}}
                  switchElement={
                    <SwitchComponent
                      disabled={true}
                      idInput={"applySpecialSuspensions"}
                      errors={errors}
                      control={control}
                      onChange={() => {}}
                      size="small"
                      className="select-basic select-disabled-list input-size mb-24px"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div>
                      <Controller
                        control={control}
                        name={"applySpecialSuspensionsQuantity"}
                        render={({ field }) => {
                          return (
                            <InputComponent
                              idInput={field.name}
                              disabled={true}
                              errors={errors}
                              defaultValue={`${detailData?.applySpecialSuspensionsQuantity}`}
                              typeInput="number"
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              value={field.value}
                              className="input-basic input-size"
                              classNameLabel="text-black biggest font-500"
                              label="Cantidad"
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div>
                <Acordion
                  title="¿Aplica prórroga?"
                  isOpen={detailData?.extensionApply}
                  onClick={async () => {}}
                  switchElement={
                    <SwitchComponent
                      idInput={"extensionApply"}
                      errors={errors}
                      disabled={true}
                      control={control}
                      onChange={() => {}}
                      size="small"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div>
                      <Controller
                        control={control}
                        name={"extensionApplyQuantity"}
                        render={({ field }) => {
                          return (
                            <InputComponent
                              idInput={field.name}
                              errors={errors}
                              disabled={true}
                              defaultValue={`${detailData?.extensionApplyQuantity}`}
                              typeInput="number"
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              value={field.value}
                              className="input-basic input-size"
                              classNameLabel="text-black biggest font-500"
                              label="Cantidad"
                            />
                          );
                        }}
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
            onClick={async () => {}}
            switchElement={<></>}
          >
            <>
              <Acordion
                title="¿Aplica condonación por rendimiento académico por periodo?"
                isOpen={detailData?.applyCondonationPerformancePeriod}
                onClick={async () => {}}
                switchElement={
                  <SwitchComponent
                    idInput={"applyCondonationPerformancePeriod"}
                    errors={errors}
                    control={control}
                    onChange={() => {}}
                    size="small"
                    className="select-basic select-disabled-list input-size"
                    classNameLabel="text-black biggest font-500"
                  />
                }
              >
                <div>
                  <TableJson
                    idInput="performancePeriod"
                    isOpen={detailData?.applyCondonationPerformancePeriod}
                    setValue={setValue}
                    title="promedio y porcentaje de condonación"
                    onlyView={true}
                    getValues={getValues}
                    error={errors}
                    dataRead={detailData}
                  />
                </div>
              </Acordion>
              <Acordion
                title="¿Aplica condonación por rendimiento académico final acumulado?"
                isOpen={detailData?.accomulatedIncomeCondonationApplies}
                onClick={async () => {}}
                switchElement={
                  <SwitchComponent
                    idInput={"accomulatedIncomeCondonationApplies"}
                    errors={errors}
                    disabled={true}
                    control={control}
                    onChange={() => {}}
                    size="small"
                    className="select-basic select-disabled-list input-size"
                    classNameLabel="text-black biggest font-500"
                  />
                }
              >
                <div>
                  <TableJson
                    isOpen={detailData?.accomulatedIncomeCondonationApplies}
                    idInput="accumulatedPerformance"
                    setValue={setValue}
                    title="Agregar promedio y porcentaje de condonación"
                    getValues={getValues}
                    error={errors}
                    onlyView={true}
                    dataRead={detailData}
                  />
                </div>
              </Acordion>
            </>
          </Acordion>
          <Acordion
            title="Requisitos"
            classname="container-modal-acordion-title"
            onClick={async () => {}}
            switchElement={<></>}
          >
            <Requirements onlyView id={detailData.id} />
          </Acordion>
        </div>
      </div>
    </div>
  );
};

export default DetailReglament;
