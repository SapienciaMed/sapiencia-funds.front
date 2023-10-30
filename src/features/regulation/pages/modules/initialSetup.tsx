import React from "react";
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
}) => {
  return (
    <div className="container-form p-24">
      <div className="containerProgram mb-24px">
        <SelectComponentOld
          idInput={"program"}
          register={register}
          errors={errors}
          value={updateData?.program}
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
            register={register}
            errors={errors}
            value={updateData?.initialPeriod}
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
            onChange={() => setValue("endPeriod", "")}
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
            register={register}
            errors={errors}
            value={updateData?.endPeriod}
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
          onClick={() =>
            setValue("applySocialService", !getValues().applySocialService)
          }
          switchElement={
            <SwitchComponent
              idInput={"applySocialService"}
              errors={errors}
              control={control}
              onChange={() => {
                setValue("socialServicePercentage", "");
                setValue("socialServiceHours", "");
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
          onClick={() =>
            setValue(
              "knowledgeTransferApply",
              !getValues().knowledgeTransferApply
            )
          }
          switchElement={
            <SwitchComponent
              idInput={"knowledgeTransferApply"}
              errors={errors}
              control={control}
              onChange={() => {
                setValue("knowledgeTransferPercentage", "");
                setValue("knowledgeTransferHours", "");
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
          onClick={() =>
            setValue("gracePeriodApply", !getValues().gracePeriodApply)
          }
          switchElement={
            <SwitchComponent
              idInput={"gracePeriodApply"}
              errors={errors}
              control={control}
              onChange={() => {
                setValue("gracePeriodMonths", "");
                setValue("gracePeriodApplication", "");
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
                register={register}
                errors={errors}
                value={updateData?.gracePeriodApplication}
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
          onClick={() =>
            setValue(
              "continuousSuspensionApplies",
              !getValues().continuousSuspensionApplies
            )
          }
          switchElement={
            <SwitchComponent
              idInput={"continuousSuspensionApplies"}
              errors={errors}
              control={control}
              onChange={() => {
                setValue("continuosSuspencionQuantity", "");
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
          onClick={() =>
            setValue(
              "applyDiscontinuousSuspension",
              !getValues().applyDiscontinuousSuspension
            )
          }
          switchElement={
            <SwitchComponent
              idInput={"applyDiscontinuousSuspension"}
              errors={errors}
              control={control}
              onChange={() => {
                setValue("discontinuousSuspensionQuantity", "");
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
          onClick={() =>
            setValue(
              "applySpecialSuspensions",
              !getValues().applySpecialSuspensions
            )
          }
          switchElement={
            <SwitchComponent
              idInput={"applySpecialSuspensions"}
              errors={errors}
              control={control}
              onChange={() => {
                setValue("applySpecialSuspensionsQuantity", "");
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
          onClick={() =>
            setValue("extensionApply", !getValues().extensionApply)
          }
          switchElement={
            <SwitchComponent
              idInput={"extensionApply"}
              errors={errors}
              control={control}
              onChange={() => {
                setValue("extensionApplyQuantity", "");
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
