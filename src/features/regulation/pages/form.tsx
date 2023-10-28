import React, { useState } from "react";
import SwitchComponent from "../../../common/components/Form/switch.component";
import useRegulationHook from "../hooks/createUpdate";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { periods } from "../service";
import { Controller } from "react-hook-form";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form/index";
import Acordion from "../components/acordion";

const Form = () => {
  const {
    control,
    errors,
    register,
    onsubmitCreate,
    goBack,
    updateData,
    loading,
    setValue,
    getValues,
  } = useRegulationHook();

  if (loading) return <></>;

  return (
    <div>
      <div className="title-area">
        <p className="text-black text-29 ml-24px mt-20px mg-0">
          Crear reglamento
        </p>
      </div>
      <div>tabs botones</div>
      <div className="container-form p-24">
        <FormComponent
          id="regulationCreate"
          className="form-signIn"
          action={() => console.log("first")}
        >
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
                disabled={updateData?.endPeriod ? true : false}
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
          </div>
          <div className="percentageSemiannualPayment mb-24px">
            <Controller
              control={control}
              name={"percentageSemiannualPayment"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    defaultValue={`${updateData?.percentageSemiannualPayment}`}
                    typeInput="number"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    className="input-basic input-size"
                    classNameLabel="text-black biggest text-required bold"
                    label="Porcentaje de pago teórico semestral"
                    disabled={
                      updateData?.percentageSemiannualPayment ? true : false
                    }
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
                    name={"discountPercentagePerPeriod"}
                    render={({ field }) => {
                      return (
                        <InputComponent
                          idInput={field.name}
                          errors={errors}
                          defaultValue={`${updateData?.discountPercentagePerPeriod}`}
                          typeInput="number"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                          className="input-basic input-size"
                          classNameLabel="text-black biggest text-required bold"
                          label="Porcentaje de descuento por periodo"
                          disabled={
                            updateData?.discountPercentagePerPeriod
                              ? true
                              : false
                          }
                        />
                      );
                    }}
                  />
                </div>
                <div>
                  <Controller
                    control={control}
                    name={"hoursPerPeriod"}
                    render={({ field }) => {
                      return (
                        <InputComponent
                          idInput={field.name}
                          errors={errors}
                          defaultValue={`${updateData?.hoursPerPeriod}`}
                          typeInput="number"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                          className="input-basic input-size"
                          classNameLabel="text-black biggest text-required bold"
                          label="Horas por periodo"
                          disabled={updateData?.hoursPerPeriod ? true : false}
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
                  "doesKnowledgeTransferApply",
                  !getValues().doesKnowledgeTransferApply
                )
              }
              switchElement={
                <SwitchComponent
                  idInput={"doesKnowledgeTransferApply"}
                  errors={errors}
                  control={control}
                  size="small"
                  disabled={
                    updateData?.doesKnowledgeTransferApply ? true : false
                  }
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest bold"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <Controller
                    control={control}
                    name={"compliancePercentage"}
                    render={({ field }) => {
                      return (
                        <InputComponent
                          idInput={field.name}
                          errors={errors}
                          defaultValue={`${updateData?.compliancePercentage}`}
                          typeInput="number"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                          className="input-basic input-size"
                          classNameLabel="text-black biggest text-required bold"
                          label="Porcentaje de cumplimiento"
                          disabled={
                            updateData?.discountPercentagePerPeriod
                              ? true
                              : false
                          }
                        />
                      );
                    }}
                  />
                </div>
                <div>
                  <Controller
                    control={control}
                    name={"totalHoursPerCredit"}
                    render={({ field }) => {
                      return (
                        <InputComponent
                          idInput={field.name}
                          errors={errors}
                          defaultValue={`${updateData?.totalHoursPerCredit}`}
                          typeInput="number"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                          className="input-basic input-size"
                          classNameLabel="text-black biggest text-required bold"
                          label="Horas totales por el crédito"
                          disabled={
                            updateData?.totalHoursPerCredit ? true : false
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
                setValue(
                  "doesGracePeriodApply",
                  !getValues().doesGracePeriodApply
                )
              }
              switchElement={
                <SwitchComponent
                  idInput={"doesGracePeriodApply"}
                  errors={errors}
                  control={control}
                  size="small"
                  disabled={updateData?.doesGracePeriodApply ? true : false}
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest bold"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <Controller
                    control={control}
                    name={"months"}
                    render={({ field }) => {
                      return (
                        <InputComponent
                          idInput={field.name}
                          errors={errors}
                          defaultValue={`${updateData?.months}`}
                          typeInput="number"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                          className="input-basic input-size"
                          classNameLabel="text-black biggest text-required bold"
                          label="Meses"
                          disabled={
                            updateData?.discountPercentagePerPeriod
                              ? true
                              : false
                          }
                        />
                      );
                    }}
                  />
                </div>
                <div>
                  <SelectComponentOld
                    idInput={"applyDate"}
                    register={register}
                    errors={errors}
                    value={updateData?.applyDate}
                    disabled={updateData?.applyDate ? true : false}
                    data={periods ? periods : []} //pendiente
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
                  "doApplyContinuousSuspensions",
                  !getValues().doApplyContinuousSuspensions
                )
              }
              switchElement={
                <SwitchComponent
                  idInput={"doApplyContinuousSuspensions"}
                  errors={errors}
                  control={control}
                  size="small"
                  disabled={
                    updateData?.doApplyContinuousSuspensions ? true : false
                  }
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest bold"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <Controller
                    control={control}
                    name={"ApplyServiceAmount"}
                    render={({ field }) => {
                      return (
                        <InputComponent
                          idInput={field.name}
                          errors={errors}
                          defaultValue={`${updateData?.ApplyServiceAmount}`}
                          typeInput="number"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                          className="input-basic input-size"
                          classNameLabel="text-black biggest text-required bold"
                          label="Cantidad"
                          disabled={
                            updateData?.ApplyServiceAmount ? true : false
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
                  "doApplyDiscontinuousSuspensions",
                  !getValues().doApplyDiscontinuousSuspensions
                )
              }
              switchElement={
                <SwitchComponent
                  idInput={"doApplyDiscontinuousSuspensions"}
                  errors={errors}
                  control={control}
                  size="small"
                  disabled={
                    updateData?.doApplyDiscontinuousSuspensions ? true : false
                  }
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest bold"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <Controller
                    control={control}
                    name={"ApplyDiscontinuousSuspensionsAmount"}
                    render={({ field }) => {
                      return (
                        <InputComponent
                          idInput={field.name}
                          errors={errors}
                          defaultValue={`${updateData?.ApplyDiscontinuousSuspensionsAmount}`}
                          typeInput="number"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                          className="input-basic input-size"
                          classNameLabel="text-black biggest text-required bold"
                          label="Cantidad"
                          disabled={
                            updateData?.ApplyDiscontinuousSuspensionsAmount
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
                  "doApplySpecialSuspensions",
                  !getValues().doApplySpecialSuspensions
                )
              }
              switchElement={
                <SwitchComponent
                  idInput={"doApplySpecialSuspensions"}
                  errors={errors}
                  control={control}
                  size="small"
                  disabled={
                    updateData?.doApplySpecialSuspensions ? true : false
                  }
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest bold"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <Controller
                    control={control}
                    name={"ApplySpecialSuspensionsAmount"}
                    render={({ field }) => {
                      return (
                        <InputComponent
                          idInput={field.name}
                          errors={errors}
                          defaultValue={`${updateData?.ApplySpecialSuspensionsAmount}`}
                          typeInput="number"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                          className="input-basic input-size"
                          classNameLabel="text-black biggest text-required bold"
                          label="Cantidad"
                          disabled={
                            updateData?.ApplySpecialSuspensionsAmount
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
                setValue("doesExtensionApply", !getValues().doesExtensionApply)
              }
              switchElement={
                <SwitchComponent
                  idInput={"doesExtensionApply"}
                  errors={errors}
                  control={control}
                  size="small"
                  disabled={updateData?.doesExtensionApply ? true : false}
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest bold"
                />
              }
            >
              <div className="containerApplyService">
                <div>
                  <Controller
                    control={control}
                    name={"doesExtensionApplyAmount"}
                    render={({ field }) => {
                      return (
                        <InputComponent
                          idInput={field.name}
                          errors={errors}
                          defaultValue={`${updateData?.doesExtensionApplyAmount}`}
                          typeInput="number"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                          className="input-basic input-size"
                          classNameLabel="text-black biggest text-required bold"
                          label="Cantidad"
                          disabled={
                            updateData?.doesExtensionApplyAmount ? true : false
                          }
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </Acordion>
          </div>
        </FormComponent>
      </div>
      Siguiente
    </div>
  );
};

export default Form;
