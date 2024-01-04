import { InputComponent, SelectComponent } from "../../../common/components/Form";
import SwitchComponent from "../../../common/components/Form/switch.component";
import { Controller, ControllerRenderProps, FieldValues } from "react-hook-form";
import Acordion from "../components/acordion";
import { LIST_DATA_GRACE_PERIOD } from "../hooks/regulation-api-service.hook";
import { EDirection } from "../../../common/constants/input.enum";
import TableInitialConfiguration from "../components/table-initial-configuration";

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
  listPrograms,
  onlyView,
}) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<FieldValues, any>, minSize = 1,  maxSize = 100) => {
    let valor = event.target.value;
    valor = valor.replace(/^0+(?=\d)/, '');
    valor = valor.replace(/[^0-9.]/g, '');

    // Permitir solo un dígito después del punto decimal
    const partes = valor.split('.');
    if (partes.length > 1) {
      partes[1] = partes[1].slice(0, 2);
      valor = partes.join('.');
    }

    const valorNumerico = parseFloat(valor);

    if (isNaN(valorNumerico) || valorNumerico < minSize || valorNumerico > maxSize || valor == '100.') {
      valor = '';
    } 
    field.onChange(valor);
  };

  return (
    <div className="container-form p-24 display-flex-direction-column">
      <div className="grid-form-2-container mb-16px">
        <SelectComponent
          idInput={"idProgram"}
          control={control}
          label="Programa"
          className="select-basic select-disabled-list medium"
          classNameLabel="text-black big text-required"
          placeholder={"Seleccionar"}
          data={listPrograms}
          filter={true}
          errors={errors}
        />
      </div>
      <div className="container-designation-three-objects grid-template-container-fourth col-gap-small mt-16px mb-16px">
        <SelectComponent
          idInput={"initialPeriod"}
          control={control}
          label="Periodo inicial de convocatoria"
          className="select-basic select-disabled-list medium"
          classNameLabel="text-black big text-required"
          placeholder={"Seleccionar"}
          data={periodList}
          filter={true}
          errors={errors}
          disabled={onlyView}
        />
        <div className="containerIsOpenPeriod">
          <SwitchComponent
            idInput={"isOpenPeriod"}
            errors={errors}
            control={control}
            onChange={() => {
              (watch('endPeriod') != undefined || watch('endPeriod') != null) ? setValue('endPeriod', undefined): updateData != undefined && setValue('endPeriod', updateData?.endPeriod)
            }}
            size="normal"
            disabled={onlyView}
            label="Convocatoria abierta"
            className="select-basic select-disabled-list input-size"
            classNameLabel="text-black biggest font-500 text-required"
            direction={EDirection.other}
            classFlexEnd="direction-switch"
            isEdit={updateData != undefined}
          />
        </div>
        <div className="containerEndPeriod">
          <SelectComponent
            idInput={"endPeriod"}
            control={control}
            label="Periodo final de convocatoria"
            className="select-basic select-disabled-list medium"
            classNameLabel="text-black big text-required"
            placeholder={"Seleccionar"}
            data={periodList}
            filter={true}
            errors={errors}
            disabled={watch('isOpenPeriod')}
          />
        </div>
      </div>
      <section>
        <Acordion
          title="¿Aplica porcentaje de pago teórico semestral?"
          isOpen={toggleControl?.applyTheoreticalSemiannualPercent}
          onClick={() => {
            if (onlyView) return;
            setValue("applyTheoreticalSemiannualPercent", !getValues().applyTheoreticalSemiannualPercent);
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyTheoreticalSemiannualPercent: getValues().applyTheoreticalSemiannualPercent,
              });
            }, 400);
            setValue("theoreticalSemiannualPercent", undefined);
          }}
          switchElement={
            <SwitchComponent
              isEdit={updateData != undefined}
              idInput={"applyTheoreticalSemiannualPercent"}
              errors={errors}
              control={control}
              onClick={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyTheoreticalSemiannualPercent: !getValues().applyTheoreticalSemiannualPercent,
                });
                
              }}
              onChange={() => {
                setValue("theoreticalSemiannualPercent", undefined);
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
              name={"theoreticalSemiannualPercent"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    typeInput="number"
                    onChange={(value) => handleInputChange(value, field)}
                    onBlur={field.onBlur}
                    value={field?.value || ''}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Porcentaje de pago teórico semestral"
                  />
                );
              }}
            />
          </div>
        </Acordion>
      </section>
      <section>
        <Acordion
          title="¿Aplica porcentaje de rendimiento académico?"
          isOpen={toggleControl?.applyAcademicPerformancePercent}
          onClick={() => {
            if (onlyView) return;
            setValue("applyAcademicPerformancePercent", !getValues().applyAcademicPerformancePercent);
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyAcademicPerformancePercent: getValues().applyAcademicPerformancePercent,
              });
            }, 400);
            setValue("academicPerformancePercent", undefined);
          }}
          switchElement={
            <SwitchComponent
              isEdit={updateData != undefined}
              idInput={"applyAcademicPerformancePercent"}
              errors={errors}
              disabled={onlyView}
              control={control}
              onClick={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyAcademicPerformancePercent: !getValues().applyAcademicPerformancePercent,
                });
              }}
              onChange={() => {
                setValue("academicPerformancePercent", undefined);
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
              name={"academicPerformancePercent"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    typeInput="number"
                    onChange={(value) => handleInputChange(value, field)}
                    onBlur={field.onBlur}
                    value={field?.value  || ''}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Porcentaje de rendimiento académico"
                  />
                );
              }}
            />
          </div>
        </Acordion>
      </section>
      <section>
        <Acordion
          title="¿Aplica porcentaje de requisitos?"
          isOpen={toggleControl?.applyRequirementsPercent}
          onClick={() => {
            if (onlyView) return;
            setValue("applyRequirementsPercent", !getValues().applyRequirementsPercent );
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyRequirementsPercent: getValues().applyRequirementsPercent,
              });
            }, 400);
            setValue("requirementsPercent", undefined);
          }}
          switchElement={
            <SwitchComponent
              isEdit={updateData != undefined}
              idInput={"applyRequirementsPercent"}
              errors={errors}
              disabled={onlyView}
              control={control}
              onClick={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyRequirementsPercent:
                    !getValues().applyRequirementsPercent,
                });
              }}
              onChange={() => {
                setValue("requirementsPercent", undefined);
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
              name={"requirementsPercent"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    disabled={onlyView}
                    typeInput="text"
                    onChange={(value) => handleInputChange(value, field)}
                    onBlur={field.onBlur}
                    value={field?.value  || ''}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Porcentaje de requisitos"
                  />
                );
              }}
            />
          </div>
        </Acordion>
      </section>
      <section>
        <Acordion
          title="¿Aplica servicio social?"
          isOpen={toggleControl?.applySocialService}
          onClick={() => {
            if (onlyView) return;
            setValue("applySocialService", !getValues().applySocialService);
            setValue("socialServicePercent", undefined);
            setValue("socialServiceHours", undefined);
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applySocialService: getValues().applySocialService,
              });
            }, 400);
            // Valor por defecto al select Tipo de condonación
            getValues().applySocialService ? setValue('socialServiceCondonationType','Total') : setValue('socialServiceCondonationType','')
          }}
          switchElement={
            <SwitchComponent
              isEdit={updateData != undefined}
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
                setValue("socialServicePercent", undefined);
                setValue("socialServiceHours", undefined);
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
              name={"socialServicePercent"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    disabled={onlyView}
                    typeInput="number"
                    onChange={(value) => handleInputChange(value, field)}
                    onBlur={field.onBlur}
                    value={field?.value || ''}
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
                    typeInput="number"
                    onChange={(value) => handleInputChange(value, field, 1, 999)}
                    onBlur={field.onBlur}
                    value={field?.value || ''}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Horas por periodo"
                    disabled={onlyView}
                  />
                );
              }}
            />
              <SelectComponent
                idInput={`socialServiceCondonationType`}
                control={control}
                label="Tipo de condonación"
                className="select-basic select-disabled-list medium"
                classNameLabel="text-black big text-required"
                placeholder={"Seleccionar"}
                data={[
                  { id: 1, name: "Total", value: "Total" },
                  { id: 2, name: "Parcial", value: "Parcial" },
                  { id: 3, name: "Por SS Prestado por giro", value: "Por SS Prestado por giro" },
                ]}
                filter={true}
                fieldArray={true}
                errors={errors}
                onChange={(value) => {
                  if (value != 'Parcial') setValue('socialServiceCondonationPercent', [])
                }}
              />
          </div>
          {
            watch('socialServiceCondonationType') === 'Parcial' && (
              <div>
                <TableInitialConfiguration
                  dataRead={updateData}
                  isOpen={toggleControl?.applySocialService}
                  idInput="socialServiceCondonationPercent"
                  setValue={setValue}
                  title="Agregar porcentaje de condonación parcial"
                  getValues={getValues}
                  onlyView={onlyView}
                />
              </div>
            )
          }
        </Acordion>
      </section>
      <section>
        <Acordion
          title="¿Aplica trasferencia de conocimiento?"
          isOpen={toggleControl?.applyKnowledgeTransfer}
          onClick={() => {
            if (onlyView) return;
            setValue( "applyKnowledgeTransfer", !getValues().applyKnowledgeTransfer );
            setValue("knowledgeTransferPercent", undefined);
            setValue("knowledgeTransferHours", undefined);
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyKnowledgeTransfer: getValues().applyKnowledgeTransfer,
              });
            }, 400);
            // Valor por defecto al select Tipo de condonación
            getValues().applyKnowledgeTransfer ? setValue('knowledgeTransferCondonationType','Total') : setValue('knowledgeTransferCondonationType','') 
          }}
          switchElement={
            <SwitchComponent
              isEdit={updateData != undefined}
              idInput={"applyKnowledgeTransfer"}
              errors={errors}
              disabled={onlyView}
              control={control}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyKnowledgeTransfer: !getValues().applyKnowledgeTransfer,
                });
                setValue("knowledgeTransferPercent", undefined);
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
              name={"knowledgeTransferPercent"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    typeInput="number"
                    onChange={(value) => handleInputChange(value, field)}
                    disabled={onlyView}
                    onBlur={field.onBlur}
                    value={field?.value || ''}
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
                    typeInput="number"
                    onChange={(value) => handleInputChange(value, field, 1, 999)}
                    onBlur={field.onBlur}
                    value={field?.value  || ''}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Horas totales por el crédito"
                    disabled={onlyView}
                  />
                );
              }}
            />
              <SelectComponent
                idInput={`knowledgeTransferCondonationType`}
                control={control}
                label="Tipo de condonación"
                className="select-basic select-disabled-list medium"
                classNameLabel="text-black big text-required"
                placeholder={"Seleccionar"}
                data={[
                  { id: 1, name: "Total", value: "Total" },
                  { id: 2, name: "Parcial", value: "Parcial" },
                ]}
                filter={true}
                fieldArray={true}
                errors={errors}
                disabled={onlyView}
                onChange={(value) => {
                  if (value != 'Parcial') setValue('knowledgeTransferCondonationPercent', [])
                }}
              />
          </div>
          {
            watch('knowledgeTransferCondonationType') === 'Parcial' && (
              <div>
                <TableInitialConfiguration
                  dataRead={updateData}
                  isOpen={toggleControl?.applySocialService}
                  idInput="knowledgeTransferCondonationPercent"
                  setValue={setValue}
                  title="Agregar porcentaje de condonación parcial"
                  getValues={getValues}
                  onlyView={onlyView}
                />
              </div>
            )
          }
        </Acordion>
      </section>
      <section>
        <Acordion
          title="¿Aplica periodo de gracia?"
          isOpen={toggleControl?.applyGracePeriod}
          onClick={() => {
            if (onlyView) return;
            setValue("applyGracePeriod", !getValues().applyGracePeriod);
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyGracePeriod: getValues().applyGracePeriod,
              });
            }, 400);
            setValue("gracePeriodMonths", undefined);
            setValue("graceDateApplication", undefined);
          }}
          switchElement={
            <SwitchComponent
              isEdit={updateData != undefined}
              idInput={"applyGracePeriod"}
              errors={errors}
              disabled={onlyView}
              control={control}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyGracePeriod: !getValues().applyGracePeriod,
                });
                setValue("gracePeriodMonths", undefined);
                setValue("graceDateApplication", undefined);
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
                    typeInput="number"
                    onChange={(value) => handleInputChange(value, field, 1, 99)}
                    onBlur={field.onBlur}
                    value={field?.value || ''}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Meses"
                    disabled={onlyView}
                  />
                );
              }}
            />
            <SelectComponent
              idInput={"graceDateApplication"}
              control={control}
              label="Fecha de aplicación"
              className="select-basic select-disabled-list medium"
              classNameLabel="text-black big text-required"
              placeholder={"Seleccionar"}
              data={LIST_DATA_GRACE_PERIOD}
              filter={true}
              fieldArray={true}
              errors={errors}
            />
          </div>
        </Acordion>
      </section>
      <section>
        <Acordion
          title="¿Aplica suspensiones continuas?"
          isOpen={toggleControl?.applyContinuousSuspension}
          onClick={() => {
            if (onlyView) return;
            setValue( "applyContinuousSuspension", !getValues().applyContinuousSuspension );
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyContinuousSuspension:
                  getValues().applyContinuousSuspension,
              });
            }, 400);
            setValue("continuosSuspencionQuantity", undefined);
          }}
          switchElement={
            <SwitchComponent
            isEdit={updateData != undefined}
              idInput={"applyContinuousSuspension"}
              errors={errors}
              disabled={onlyView}
              control={control}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyContinuousSuspension:
                    !getValues().applyContinuousSuspension,
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
                    typeInput="number"
                    onChange={(value) => handleInputChange(value, field, 1, 9)}
                    onBlur={field.onBlur}
                    value={field?.value || ''}
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
      </section>
      <section>
        <Acordion
          title="¿Aplica suspensiones discontinuas?"
          isOpen={toggleControl?.applyDiscontinuousSuspension}
          onClick={() => {
            if (onlyView) return;
            setValue( "applyDiscontinuousSuspension", !getValues().applyDiscontinuousSuspension );
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
              isEdit={updateData != undefined}
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
                    typeInput="number"
                    onChange={(value) => handleInputChange(value, field, 1, 9)}
                    onBlur={field.onBlur}
                    value={field?.value || ''}
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
      </section>
      <section>
        <Acordion
          title="¿Aplica suspensiones especiales?"
          isOpen={toggleControl?.applySpecialSuspensions}
          onClick={() => {
            if (onlyView) return;
            setValue( "applySpecialSuspensions", !getValues().applySpecialSuspensions );
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applySpecialSuspensions: getValues().applySpecialSuspensions,
              });
            }, 400);
            setValue("specialSuspensionsQuantity", undefined);
          }}
          switchElement={
            <SwitchComponent
              isEdit={updateData != undefined}
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
                setValue("specialSuspensionsQuantity", undefined);
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
              name={"specialSuspensionsQuantity"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    disabled={onlyView}
                    errors={errors}
                    typeInput="number"
                    onChange={(value) => handleInputChange(value, field, 1, 9)}
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
      </section>
      <section>
        <Acordion
          title="¿Aplica prórroga?"
          isOpen={toggleControl?.applyExtension}
          onClick={() => {
            if (onlyView) return;
            setValue("applyExtension", !getValues().applyExtension);
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyExtension: getValues().applyExtension,
              });
            }, 400);
            setValue("extensionQuantity", undefined);
          }}
          switchElement={
            <SwitchComponent
              isEdit={updateData != undefined}
              idInput={"applyExtension"}
              errors={errors}
              disabled={onlyView}
              control={control}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyExtension: !getValues().applyExtension,
                });
                setValue("extensionQuantity", undefined);
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
              name={"extensionQuantity"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    disabled={onlyView}
                    typeInput="number"
                    onChange={(value) => handleInputChange(value, field, 1, 9)}
                    onBlur={field.onBlur}
                    value={field?.value || ''}
                    className="input-basic medium"
                    classNameLabel="text-black big text-required font-500"
                    label="Cantidad"
                  />
                );
              }}
            />
          </div>
        </Acordion>
      </section>
    </div>
  );
};

export default InitialSetup;
