import { InputComponent } from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import SwitchComponent from "../../../common/components/Form/switch.component";
import { Controller } from "react-hook-form";
import Acordion from "../components/acordion";
import { LIST_DATA_GRACE_PERIOD } from "../hooks/regulation-api-service.hook";
import { EDirection } from "../../../common/constants/input.enum";

const InitialSetup = ({
  errors,
  updateData,
  periodList,
  control,
  getValues,
  setValue,
  watch,
  toggleControl,
  setToggleControl,
  loading,
  listPrograms,
  onlyView,
}) => {
  if (loading) return <></>;
  const isDisabled = onlyView || (updateData?.program ? true : false);
  return (
    <div className="container-form p-24">
      <div className="grid-form-2-container mb-16px">
        <SelectComponentOld
          idInput={"program"}
          setValue={(e) => setValue("program", e)}
          value={
            updateData?.program
              ? Number(updateData?.program)
              : getValues().program
          }
          errors={errors}
          disabled={isDisabled}
          data={listPrograms.length ? listPrograms : []}
          label="Programa"
          className="select-basic select-disabled-list input-size"
          classNameLabel="text-black biggest font-500 text-required"
          placeholder="Seleccionar"
        />
      </div>
      <div className="container-designation-three-objects grid-template-container-fourth col-gap-small mt-16px mb-16px">
        <SelectComponentOld
          idInput={"initialPeriod"}
          errors={errors}
          setValue={(e) => setValue("initialPeriod", e)}
          value={
            updateData?.initialPeriod
              ? updateData?.initialPeriod
              : getValues().initialPeriod
          }
          data={periodList.map((i) => {
            return {
              name: i.name,
              value: i.name,
            };
          })}
          disabled={onlyView}
          label="Periodo inicial de convocatoria"
          className="select-basic select-disabled-list input-size"
          classNameLabel="text-black biggest font-500 text-required"
          placeholder="Seleccionar"
        />
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
            disabled={onlyView}
            label="Convocatoria abierta"
            className="select-basic select-disabled-list input-size"
            classNameLabel="text-black biggest font-500 text-required"
            direction={EDirection.other}
            classFlexEnd="direction-switch"
          />
        </div>
        <div className="containerEndPeriod">
          <SelectComponentOld
            idInput={"endPeriod"}
            errors={errors}
            disabled={onlyView || watch().isOpenPeriod}
            setValue={(e) => setValue("endPeriod", e)}
            value={
              updateData?.endPeriod
                ? updateData?.endPeriod
                : getValues().endPeriod
            }
            data={
              watch().isOpenPeriod
                ? []
                : periodList.map((i) => {
                    return {
                      name: i.name,
                      value: i.name,
                    };
                  })
            } //pendiente = ¿porque pendiente? lo coloco el desarrollador anterior
            label="Periodo final de convocatoria"
            className="select-basic select-disabled-list input-size"
            classNameLabel={`text-black biggest font-500 ${
              !getValues().isOpenPeriod && "text-required"
            }`}
            placeholder="Seleccionar"
          />
        </div>
      </div>

      <div>
        <Acordion
          title="¿Aplica porcentaje de pago teórico semestral?"
          isOpen={toggleControl?.applyTheoreticalSemester}
          onClick={() => {
            if (onlyView) return;
            setValue(
              "applyTheoreticalSemester",
              !getValues().applyTheoreticalSemester
            );
            setTimeout(() => {
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
              disabled={onlyView}
              control={control}
              onClick={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyTheoreticalSemester:
                    !getValues().applyTheoreticalSemester,
                });
              }}
              onChange={() => {
                setValue("theoreticalPercentage", null);
              }}
              size="small"
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest font-500"
              direction={EDirection.other}
            />
          }
        >
          <div className="grid-form-3-container gap-15">
            <Controller
              control={control}
              name={"theoreticalPercentage"}
              defaultValue={updateData?.theoreticalPercentage}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    disabled={onlyView ? true : false}
                    defaultValue={`${updateData?.theoreticalPercentage}`}
                    typeInput="text"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field?.value || ""}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Porcentaje de pago teórico semestral"
                  />
                );
              }}
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica servicio social?"
          isOpen={toggleControl?.applySocialService}
          onClick={() => {
            if (onlyView) return;
            setValue("applySocialService", !getValues().applySocialService);
            setTimeout(() => {
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
              disabled={onlyView}
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
              direction={EDirection.other}
            />
          }
        >
          <div className="grid-form-3-container mb-16px">
            <Controller
              control={control}
              name={"socialServicePercentage"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    disabled={onlyView}
                    defaultValue={`${updateData?.socialServicePercentage}`}
                    typeInput="number"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field?.value || ""}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Porcentaje de descuento por periodo"
                  />
                );
              }}
            />
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
                    value={field?.value || ""}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Horas por periodo"
                    disabled={onlyView}
                  />
                );
              }}
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica trasferencia de conocimiento?"
          isOpen={toggleControl?.knowledgeTransferApply}
          onClick={() => {
            if (onlyView) return;
            setValue(
              "knowledgeTransferApply",
              !getValues().knowledgeTransferApply
            );
            setTimeout(() => {
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
              disabled={onlyView}
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
              direction={EDirection.other}
            />
          }
        >
          <div className="grid-form-3-container mb-16px">
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
                    disabled={onlyView}
                    onBlur={field.onBlur}
                    value={field?.value || ""}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Porcentaje de cumplimiento"
                  />
                );
              }}
            />
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
                    value={field?.value || ""}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Horas totales por el crédito"
                    disabled={onlyView}
                  />
                );
              }}
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica periodo de gracia?"
          isOpen={toggleControl?.gracePeriodApply}
          onClick={() => {
            if (onlyView) return;
            setValue("gracePeriodApply", !getValues().gracePeriodApply);
            setTimeout(() => {
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
              disabled={onlyView}
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
              direction={EDirection.other}
            />
          }
        >
          <div className="grid-form-3-container mb-16px">
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
                    value={field?.value || ""}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Meses"
                    disabled={onlyView}
                  />
                );
              }}
            />
            <SelectComponentOld
              idInput={"gracePeriodApplication"}
              setValue={(e) => setValue("gracePeriodApplication", e)}
              value={getValues().gracePeriodApplication}
              errors={errors}
              data={LIST_DATA_GRACE_PERIOD ? LIST_DATA_GRACE_PERIOD : []} //pendiente
              label="Fecha de aplicación"
              className="select-basic select-disabled-list medium"
              classNameLabel="text-black big font-500 tex-required"
              placeholder="Seleccionar"
              disabled={onlyView}
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica suspensiones continuas?"
          isOpen={toggleControl?.continuousSuspensionApplies}
          onClick={() => {
            if (onlyView) return;
            setValue(
              "continuousSuspensionApplies",
              !getValues().continuousSuspensionApplies
            );
            setTimeout(() => {
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
              disabled={onlyView}
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
              direction={EDirection.other}
            />
          }
        >
          <div className="grid-form-3-container mb-16px">
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
                    value={field?.value || ""}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Cantidad"
                    disabled={onlyView}
                  />
                );
              }}
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica suspensiones discontinuas?"
          isOpen={toggleControl?.applyDiscontinuousSuspension}
          onClick={() => {
            if (onlyView) return;
            setValue(
              "applyDiscontinuousSuspension",
              !getValues().applyDiscontinuousSuspension
            );
            setTimeout(() => {
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
              disabled={onlyView}
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
              direction={EDirection.other}
            />
          }
        >
          <div className="grid-form-3-container mb-16px">
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
                    value={field?.value || ""}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Cantidad"
                    disabled={onlyView}
                  />
                );
              }}
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica suspensiones especiales?"
          isOpen={toggleControl?.applySpecialSuspensions}
          onClick={() => {
            if (onlyView) return;
            setValue(
              "applySpecialSuspensions",
              !getValues().applySpecialSuspensions
            );
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applySpecialSuspensions: getValues().applySpecialSuspensions,
              });
            }, 400);
            setValue("applySpecialSuspensionsQuantity", undefined);
          }}
          switchElement={
            <SwitchComponent
              disabled={onlyView}
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
              direction={EDirection.other}
            />
          }
        >
          <div className="grid-form-3-container mb-16px">
            <Controller
              control={control}
              name={"applySpecialSuspensionsQuantity"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    disabled={onlyView}
                    errors={errors}
                    defaultValue={`${updateData?.applySpecialSuspensionsQuantity}`}
                    typeInput="number"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field?.value || ""}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Cantidad"
                  />
                );
              }}
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica prórroga?"
          isOpen={toggleControl?.extensionApply}
          onClick={() => {
            if (onlyView) return;
            setValue("extensionApply", !getValues().extensionApply);
            setTimeout(() => {
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
              disabled={onlyView}
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
              direction={EDirection.other}
            />
          }
        >
          <div className="grid-form-3-container mb-16px">
            <Controller
              control={control}
              name={"extensionApplyQuantity"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    disabled={onlyView}
                    defaultValue={`${updateData?.extensionApplyQuantity}`}
                    typeInput="number"
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field?.value || ""}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Cantidad"
                  />
                );
              }}
            />
          </div>
        </Acordion>
      </div>
    </div>
  );
};

export default InitialSetup;
