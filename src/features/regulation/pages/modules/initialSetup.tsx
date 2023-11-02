import React, { useState } from "react";
import {
  FormComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { SelectComponentOld } from "../../../../common/components/Form/select.component.old";
import SwitchComponent from "../../../../common/components/Form/switch.component";
import { Controller } from "react-hook-form";
import Acordion from "../../components/acordion";
import { LIST_DATA_GRACE_PERIOD } from "../../service";

const InitialSetup = ({
  register,
  errors,
  updateData,
  periods,
  control,
  getValues,
  setValue,
  watch,
  toggleControl,
  setToggleControl,
}) => {
  return (
    <div className="container-form p-24">
      <div className="containerProgram mb-24px">
        <SelectComponentOld
          idInput={"program"}
          setValue={(e) => setValue("program", e)}
          value={getValues().program}
          errors={errors}
          disabled={updateData?.program ? true : false}
          data={periods ? periods : []} //pendiente
          label={
            <>
              Programa <span>*</span>
            </>
          }
          className="select-basic select-disabled-list input-size"
          classNameLabel="text-black biggest bold"
          placeholder="Seleccionar"
        />
      </div>

      <div className="containerGroup mb-24px">
        <div className="containerInitialPeriod ">
          <SelectComponentOld
            idInput={"initialPeriod"}
            errors={errors}
            setValue={(e) => setValue("initialPeriod", e)}
            value={getValues().initialPeriod}
            disabled={updateData?.initialPeriod ? true : false}
            data={periods ? periods : []} //pendiente
            label={
              <>
                Periodo inicial de convocatoria <span>*</span>
              </>
            }
            className="select-basic select-disabled-list input-size"
            classNameLabel="text-black biggest bold"
            placeholder="Seleccionar"
          />
        </div>
        <div className="containerIsOpenPeriod ml-24px">
          <SwitchComponent
            idInput={"isOpenPeriod"}
            errors={errors}
            control={control}
            onChange={() => setValue("endPeriod", undefined)}
            size="normal"
            disabled={updateData?.isOpenPeriod ? true : false}
            label={
              <>
                Convocatoria abierta <span>*</span>
              </>
            }
            className="select-basic select-disabled-list input-size"
            classNameLabel="text-black biggest bold"
          />
        </div>

        <div className="containerEndPeriod ml-24px">
          <SelectComponentOld
            idInput={"endPeriod"}
            errors={errors}
            setValue={(e) => setValue("endPeriod", e)}
            value={getValues().endPeriod}
            disabled={getValues().isOpenPeriod ? true : false}
            data={getValues().isOpenPeriod ? [] : periods ? periods : []} //pendiente
            label={
              <>
                Periodo inicial de convocatoria{" "}
                {!getValues().isOpenPeriod && <span>*</span>}
              </>
            }
            className="select-basic select-disabled-list input-size"
            classNameLabel="text-black biggest bold"
            placeholder="Seleccionar"
          />
        </div>
      </div>
      <div className="percentageSemiannualPayment mb-24px">
        <Controller
          control={control}
          name={"theoreticalPercentage"}
          render={({ field }) => {
            return (
              <InputComponent
                idInput={field.name}
                errors={errors}
                defaultValue={`${updateData?.theoreticalPercentage}`}
                typeInput="number"
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                className="input-basic input-size"
                classNameLabel="text-black biggest text-required bold"
                label="Porcentaje de pago teórico semestral"
                disabled={updateData?.theoreticalPercentage ? true : false}
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
          isOpen={toggleControl?.applySocialService}
          onClick={async () => {
            setValue("applySocialService", !getValues().applySocialService);
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applySocialService: getValues().applySocialService,
              });
            }, 400);
            setValue("socialServicePercentage", undefined);
            setValue("socialServiceHours", undefined);
          }}
          switchElement={
            <SwitchComponent
              idInput={"applySocialService"}
              errors={errors}
              control={control}
              onClick={() => {
                setToggleControl({
                  ...toggleControl,
                  applySocialService: !getValues().applySocialService,
                });
              }}
              onChange={() => {
                setValue("socialServicePercentage", undefined);
                setValue("socialServiceHours", undefined);
              }}
              size="small"
              disabled={updateData?.applySocialService ? true : false}
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest bold"
            />
          }
        >
          <div className="containerApplyService">
            <div>
              <Controller
                control={control}
                name={"socialServicePercentage"}
                render={({ field }) => {
                  return (
                    <InputComponent
                      idInput={field.name}
                      errors={errors}
                      defaultValue={`${updateData?.socialServicePercentage}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required bold"
                      label="Porcentaje de descuento por periodo"
                      disabled={
                        updateData?.socialServicePercentage ? true : false
                      }
                    />
                  );
                }}
              />
            </div>
            <div>
              <Controller
                control={control}
                name={"socialServiceHours"}
                render={({ field }) => {
                  return (
                    <InputComponent
                      idInput={field.name}
                      errors={errors}
                      defaultValue={`${updateData?.socialServiceHours}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required bold"
                      label="Horas por periodo"
                      disabled={updateData?.socialServiceHours ? true : false}
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
          isOpen={toggleControl?.knowledgeTransferApply}
          onClick={async () => {
            setValue(
              "knowledgeTransferApply",
              !getValues().knowledgeTransferApply
            );
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                knowledgeTransferApply: getValues().knowledgeTransferApply,
              });
            }, 400);
            setValue("knowledgeTransferPercentage", undefined);
            setValue("knowledgeTransferHours", undefined);
          }}
          switchElement={
            <SwitchComponent
              idInput={"knowledgeTransferApply"}
              errors={errors}
              control={control}
              onChange={() => {
                setToggleControl({
                  ...toggleControl,
                  knowledgeTransferApply: !getValues().knowledgeTransferApply,
                });
                setValue("knowledgeTransferPercentage", undefined);
                setValue("knowledgeTransferHours", undefined);
              }}
              size="small"
              disabled={updateData?.knowledgeTransferApply ? true : false}
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest bold"
            />
          }
        >
          <div className="containerApplyService">
            <div>
              <Controller
                control={control}
                name={"knowledgeTransferPercentage"}
                render={({ field }) => {
                  return (
                    <InputComponent
                      idInput={field.name}
                      errors={errors}
                      defaultValue={`${updateData?.knowledgeTransferPercentage}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required bold"
                      label="Porcentaje de cumplimiento"
                      disabled={
                        updateData?.knowledgeTransferPercentage ? true : false
                      }
                    />
                  );
                }}
              />
            </div>
            <div>
              <Controller
                control={control}
                name={"knowledgeTransferHours"}
                render={({ field }) => {
                  return (
                    <InputComponent
                      idInput={field.name}
                      errors={errors}
                      defaultValue={`${updateData?.knowledgeTransferHours}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required bold"
                      label="Horas totales por el crédito"
                      disabled={
                        updateData?.knowledgeTransferHours ? true : false
                      }
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
          isOpen={toggleControl?.gracePeriodApply}
          onClick={async () => {
            setValue("gracePeriodApply", !getValues().gracePeriodApply);
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                gracePeriodApply: getValues().gracePeriodApply,
              });
            }, 400);
            setValue("gracePeriodMonths", undefined);
            setValue("gracePeriodApplication", undefined);
          }}
          switchElement={
            <SwitchComponent
              idInput={"gracePeriodApply"}
              errors={errors}
              control={control}
              onChange={() => {
                setToggleControl({
                  ...toggleControl,
                  gracePeriodApply: !getValues().gracePeriodApply,
                });
                setValue("gracePeriodMonths", undefined);
                setValue("gracePeriodApplication", undefined);
              }}
              size="small"
              disabled={updateData?.gracePeriodApply ? true : false}
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest bold"
            />
          }
        >
          <div className="containerApplyService">
            <div>
              <Controller
                control={control}
                name={"gracePeriodMonths"}
                render={({ field }) => {
                  return (
                    <InputComponent
                      idInput={field.name}
                      errors={errors}
                      defaultValue={`${updateData?.gracePeriodMonths}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required bold"
                      label="Meses"
                      disabled={updateData?.gracePeriodMonths ? true : false}
                    />
                  );
                }}
              />
            </div>
            <div>
              <SelectComponentOld
                idInput={"gracePeriodApplication"}
                setValue={(e) => setValue("gracePeriodApplication", e)}
                value={getValues().gracePeriodApplication}
                errors={errors}
                disabled={updateData?.gracePeriodApplication ? true : false}
                data={LIST_DATA_GRACE_PERIOD ? LIST_DATA_GRACE_PERIOD : []} //pendiente
                label={
                  <>
                    Fecha de aplicación <span>*</span>
                  </>
                }
                className="select-basic select-disabled-list input-size"
                classNameLabel="text-black biggest bold"
                placeholder="Seleccionar"
              />
            </div>
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica suspensiones continuas?"
          isOpen={toggleControl?.continuousSuspensionApplies}
          onClick={async () => {
            setValue(
              "continuousSuspensionApplies",
              !getValues().continuousSuspensionApplies
            );
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                continuousSuspensionApplies:
                  getValues().continuousSuspensionApplies,
              });
            }, 400);
            setValue("continuosSuspencionQuantity", undefined);
          }}
          switchElement={
            <SwitchComponent
              idInput={"continuousSuspensionApplies"}
              errors={errors}
              control={control}
              onChange={() => {
                setToggleControl({
                  ...toggleControl,
                  continuousSuspensionApplies:
                    !getValues().continuousSuspensionApplies,
                });
                setValue("continuosSuspencionQuantity", undefined);
              }}
              size="small"
              disabled={updateData?.continuousSuspensionApplies ? true : false}
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest bold"
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
                      defaultValue={`${updateData?.continuosSuspencionQuantity}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required bold"
                      label="Cantidad"
                      disabled={
                        updateData?.continuosSuspencionQuantity ? true : false
                      }
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
          isOpen={toggleControl?.applyDiscontinuousSuspension}
          onClick={async () => {
            setValue(
              "applyDiscontinuousSuspension",
              !getValues().applyDiscontinuousSuspension
            );
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyDiscontinuousSuspension:
                  getValues().applyDiscontinuousSuspension,
              });
            }, 400);
            setValue("discontinuousSuspensionQuantity", undefined);
          }}
          switchElement={
            <SwitchComponent
              idInput={"applyDiscontinuousSuspension"}
              errors={errors}
              control={control}
              onChange={() => {
                setToggleControl({
                  ...toggleControl,
                  applyDiscontinuousSuspension:
                    !getValues().applyDiscontinuousSuspension,
                });
                setValue("discontinuousSuspensionQuantity", undefined);
              }}
              size="small"
              disabled={updateData?.applyDiscontinuousSuspension ? true : false}
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest bold"
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
                      defaultValue={`${updateData?.discontinuousSuspensionQuantity}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required bold"
                      label="Cantidad"
                      disabled={
                        updateData?.discontinuousSuspensionQuantity
                          ? true
                          : false
                      }
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
          isOpen={toggleControl?.applySpecialSuspensions}
          onClick={async () => {
            setValue(
              "applySpecialSuspensions",
              !getValues().applySpecialSuspensions
            );
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applySpecialSuspensions: getValues().applySpecialSuspensions,
              });
            }, 400);
            setValue("applySpecialSuspensionsQuantity", undefined);
          }}
          switchElement={
            <SwitchComponent
              idInput={"applySpecialSuspensions"}
              errors={errors}
              control={control}
              onChange={() => {
                setToggleControl({
                  ...toggleControl,
                  applySpecialSuspensions: !getValues().applySpecialSuspensions,
                });
                setValue("applySpecialSuspensionsQuantity", undefined);
              }}
              size="small"
              disabled={updateData?.applySpecialSuspensions ? true : false}
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest bold"
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
                      errors={errors}
                      defaultValue={`${updateData?.applySpecialSuspensionsQuantity}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required bold"
                      label="Cantidad"
                      disabled={
                        updateData?.applySpecialSuspensionsQuantity
                          ? true
                          : false
                      }
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
          isOpen={toggleControl?.extensionApply}
          onClick={async () => {
            setValue("extensionApply", !getValues().extensionApply);
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                extensionApply: getValues().extensionApply,
              });
            }, 400);
            setValue("extensionApplyQuantity", undefined);
          }}
          switchElement={
            <SwitchComponent
              idInput={"extensionApply"}
              errors={errors}
              control={control}
              onChange={() => {
                setToggleControl({
                  ...toggleControl,
                  extensionApply: !getValues().extensionApply,
                });
                setValue("extensionApplyQuantity", undefined);
              }}
              size="small"
              disabled={updateData?.extensionApply ? true : false}
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest bold"
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
                      defaultValue={`${updateData?.extensionApplyQuantity}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required bold"
                      label="Cantidad"
                      disabled={
                        updateData?.extensionApplyQuantity ? true : false
                      }
                    />
                  );
                }}
              />
            </div>
          </div>
        </Acordion>
      </div>
    </div>
  );
};

export default InitialSetup;
