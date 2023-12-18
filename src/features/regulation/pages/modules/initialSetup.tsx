import React, { useEffect, useState } from "react";
import {
  FormComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { SelectComponentOld } from "../../../../common/components/Form/select.component.old";
import SwitchComponent from "../../../../common/components/Form/switch.component";
import { Controller } from "react-hook-form";
import Acordion from "../../components/acordion";
import { LIST_DATA_GRACE_PERIOD } from "../../service";
import { InputNumberComponent } from "../../../../common/components/Form/input-number.component";
import { EDirection } from "../../../../common/constants/input.enum";

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
  loading,
  listPrograms,
  onlyView,
  reset,
}) => {
  if (loading) return <></>;
  return (
    <div className="container-form p-24">
      <div className="containerProgram mb-24px">
        <SelectComponentOld
          idInput={"program"}
          setValue={(e) => setValue("program", e)}
          value={
            updateData?.program
              ? Number(updateData?.program)
              : getValues().program
          }
          errors={errors}
          disabled={onlyView ? true : updateData?.program ? true : false}
          data={listPrograms.length ? listPrograms : []}
          label={
            <>
              Programa <span>*</span>
            </>
          }
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
            setValue={(e) => setValue("initialPeriod", e)}
            value={
              updateData?.initialPeriod
                ? updateData?.initialPeriod
                : getValues().initialPeriod
            }
            data={periods ? periods : []}
            disabled={onlyView ? true : false}
            label={
              <>
                Periodo inicial de convocatoria <span>*</span>
              </>
            }
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
            onChange={() => setValue("isOpenPeriod", undefined)}
            defaultValue={
              updateData?.isOpenPeriod
                ? updateData?.isOpenPeriod
                : getValues().isOpenPeriod
            }
            size="normal"
            disabled={onlyView ? true : false}
            label={
              <>
                Convocatoria abierta <span>*</span>
              </>
            }
            className="select-basic select-disabled-list input-size"
            classNameLabel="text-black biggest font-500"
          />
        </div>

        <div className="containerEndPeriod">
          <SelectComponentOld
            idInput={"endPeriod"}
            errors={errors}
            disabled={onlyView ? true : watch().isOpenPeriod ? true : false}
            setValue={(e) => setValue("endPeriod", e)}
            value={
              updateData?.endPeriod
                ? updateData?.endPeriod
                : getValues().endPeriod
            }
            data={watch().isOpenPeriod ? [] : periods ? periods : []} //pendiente
            label={
              <>
                Periodo final de convocatoria{" "}
                {!getValues().isOpenPeriod && <span>*</span>}
              </>
            }
            className="select-basic select-disabled-list input-size"
            classNameLabel="text-black biggest font-500"
            placeholder="Seleccionar"
          />
        </div>
      </div>
      
      <div>
        <Acordion
          title="¿Aplica porcentaje de pago teórico semestral?"
          isOpen={toggleControl?.applyTheoreticalSemester}
          onClick={async () => {
            if (onlyView) return;
            setValue("applyTheoreticalSemester", !getValues().applyTheoreticalSemester);
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyTheoreticalSemester: getValues().applyTheoreticalSemester,
              });
            }, 400);
              setValue("theoreticalPercentage", null);
          }}
          switchElement={
            <SwitchComponent
              idInput={"applyTheoreticalSemester"}
              errors={errors}
              disabled={onlyView ? true : false}
              control={control}
              onClick={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyTheoreticalSemester: !getValues().applyTheoreticalSemester,
                });
              }}
              onChange={() => {
                setValue("theoreticalPercentage", null);
              }}
              size="small"
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest font-500"
            />
          }
        >
          <div className="grid-form-2-container gap-15">
            <InputNumberComponent
              idInput={'theoreticalPercentage'}
              className="inputNumber-basic medium"
              label="Porcentaje de pago teórico semestral"
              classNameLabel='text-black big text-with-colons text-required'
              errors={errors}
              placeholder={""}
              direction={EDirection.column}
              suffix="%"
              mode="decimal"
              minFractionDigits={1}
              maxFractionDigits={1}
              min={0}
              max={100}
              control={control}
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica servicio social?"
          isOpen={toggleControl?.applySocialService}
          onClick={async () => {
            if (onlyView) return;
            setValue("applySocialService", !getValues().applySocialService);
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applySocialService: getValues().applySocialService,
              });
            }, 400);
            setValue("socialServicePercentage", null);
            setValue("socialServiceHours", null);
          }}
          switchElement={
            <SwitchComponent
              idInput={"applySocialService"}
              errors={errors}
              disabled={onlyView ? true : false}
              control={control}
              onClick={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applySocialService: !getValues().applySocialService,
                });
              }}
              onChange={() => {
                setValue("socialServicePercentage", null);
                setValue("socialServiceHours", null);
              }}
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
                      disabled={onlyView ? true : false}
                      defaultValue={`${updateData?.socialServicePercentage}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field?.value}
                      className="input-basic input-size "
                      classNameLabel="text-black biggest text-required font-500"
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
                      defaultValue={`${updateData?.socialServiceHours}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field?.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required font-500"
                      label="Horas por periodo"
                      disabled={onlyView ? true : false}
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
            if (onlyView) return;

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
              disabled={onlyView ? true : false}
              control={control}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  knowledgeTransferApply: !getValues().knowledgeTransferApply,
                });
                setValue("knowledgeTransferPercentage", undefined);
                setValue("knowledgeTransferHours", undefined);
              }}
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
                      defaultValue={`${updateData?.knowledgeTransferPercentage}`}
                      typeInput="number"
                      onChange={field.onChange}
                      disabled={onlyView ? true : false}
                      onBlur={field.onBlur}
                      value={field?.value}
                      className="input-basic input-size "
                      classNameLabel="text-black biggest text-required font-500"
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
                      defaultValue={`${updateData?.knowledgeTransferHours}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field?.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required font-500"
                      label="Horas totales por el crédito"
                      disabled={onlyView ? true : false}
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
            if (onlyView) return;
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
              disabled={onlyView ? true : false}
              control={control}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  gracePeriodApply: !getValues().gracePeriodApply,
                });
                setValue("gracePeriodMonths", undefined);
                setValue("gracePeriodApplication", undefined);
              }}
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
                      defaultValue={`${updateData?.gracePeriodMonths}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field?.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required font-500"
                      label="Meses"
                      disabled={onlyView ? true : false}
                    />
                  );
                }}
              />
            </div>
            <div className="mb-24px">
              <SelectComponentOld
                idInput={"gracePeriodApplication"}
                setValue={(e) => setValue("gracePeriodApplication", e)}
                value={getValues().gracePeriodApplication}
                errors={errors}
                data={LIST_DATA_GRACE_PERIOD ? LIST_DATA_GRACE_PERIOD : []} //pendiente
                label={
                  <>
                    Fecha de aplicación <span>*</span>
                  </>
                }
                className="select-basic select-disabled-list input-size"
                classNameLabel="text-black biggest font-500"
                placeholder="Seleccionar"
                disabled={onlyView ? true : false}
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
            if (onlyView) return;
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
              disabled={onlyView ? true : false}
              control={control}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  continuousSuspensionApplies:
                    !getValues().continuousSuspensionApplies,
                });
                setValue("continuosSuspencionQuantity", undefined);
              }}
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
                      defaultValue={`${updateData?.continuosSuspencionQuantity}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field?.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required font-500"
                      label="Cantidad"
                      disabled={onlyView ? true : false}
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
            if (onlyView) return;
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
              disabled={onlyView ? true : false}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyDiscontinuousSuspension:
                    !getValues().applyDiscontinuousSuspension,
                });
                setValue("discontinuousSuspensionQuantity", undefined);
              }}
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
                      defaultValue={`${updateData?.discontinuousSuspensionQuantity}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field?.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required font-500"
                      label="Cantidad"
                      disabled={onlyView ? true : false}
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
            if (onlyView) return;
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
              disabled={onlyView ? true : false}
              idInput={"applySpecialSuspensions"}
              errors={errors}
              control={control}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applySpecialSuspensions: !getValues().applySpecialSuspensions,
                });
                setValue("applySpecialSuspensionsQuantity", undefined);
              }}
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
                      disabled={onlyView ? true : false}
                      errors={errors}
                      defaultValue={`${updateData?.applySpecialSuspensionsQuantity}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field?.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required font-500"
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
          isOpen={toggleControl?.extensionApply}
          onClick={async () => {
            if (onlyView) return;
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
              disabled={onlyView ? true : false}
              control={control}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  extensionApply: !getValues().extensionApply,
                });
                setValue("extensionApplyQuantity", undefined);
              }}
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
                      disabled={onlyView ? true : false}
                      defaultValue={`${updateData?.extensionApplyQuantity}`}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field?.value}
                      className="input-basic input-size"
                      classNameLabel="text-black biggest text-required font-500"
                      label="Cantidad"
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
