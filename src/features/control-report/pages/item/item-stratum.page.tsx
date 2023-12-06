import React, { Fragment, useContext, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { ButtonComponent, FormComponent, InputComponent } from "../../../../common/components/Form";
import { itemStratum123Hook } from "../../hooks/conditionalHooks/ItemStratum123Hook";
import { InputNumberComponent } from "../../../../common/components/Form/input-number.component";


const Item = ({ data, action, collback }) => {
    const {
      CancelFunction,
      onSubmitCreateItem,
      register,
      errors,
      control,
    } = itemStratum123Hook(action, data, collback);

  return (
    <Fragment>
      <FormComponent
        id="createItemForm"
        className="main-page full-width"
        action={onSubmitCreateItem}
      >
        <section className="funcionality-filters-container gap-15">
          <Controller
            control={control}
            name={"comuna"}
            render={({ field }) => {
              return (
                <InputComponent
                  idInput={field.name}
                  errors={errors}
                  typeInput={"text"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  label={<>Comuna o corregimiento</>}
                  disabled={true}
                />
              );
            }}
          />

          <Controller
            control={control}
            name={"availableResource"}
            render={({ field }) => {
              return (
             /*    <InputComponent
                  idInput={field.name}
                  errors={errors}
                  typeInput={"number"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  label={
                    <>
                      Recurso disponible <span>*</span>
                    </>
                  }
                /> */

                <InputNumberComponent
                  control={control}
                  idInput={field.name}
                  label="Recurso disponible"
                  className="inputNumber-basic medium"
                  placeholder={'0'}
                  classNameLabel="text-black big text-required"
                  errors={errors}
                  mode="currency"
                  currency="COP"
                  locale="es-CO"
                  fieldArray={true}
                  minFractionDigits={0}
                  maxFractionDigits={0}
                  disabled
                />
              );
            }}
          />

          <Controller
            control={control}
            name={"granted"}
            render={({ field }) => {
              return (
               /*  <InputComponent
                  idInput={field.name}
                  errors={errors}
                  typeInput={"number"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  label={
                    <>
                      Otorgado <span>*</span>
                    </>
                  }
                /> */

                <InputNumberComponent
                control={control}
                idInput={field.name}
                label="Otorgado"
                className="inputNumber-basic medium"
                placeholder={'0'}
                classNameLabel="text-black big text-required"
                errors={errors}
                mode="currency"
                currency="COP"
                locale="es-CO"
                fieldArray={true}
                minFractionDigits={0}
                maxFractionDigits={0}
                disabled
              />
              );
            }}
          />
        </section>
        <section className="funcionality-filters-container gap-15">
          <Controller
            control={control}
            name={"available"}
            render={({ field }) => {
              return (
               /*  <InputComponent
                  idInput={field.name}
                  errors={errors}
                  typeInput={"text"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  label={<>Disponible</>}
                  disabled={true}
                /> */

                <InputNumberComponent
                control={control}
                idInput={field.name}
                label="Disponible"
                className="inputNumber-basic medium"
                placeholder={'0'}
                classNameLabel="text-black big text-required"
                errors={errors}
                mode="currency"
                currency="COP"
                locale="es-CO"
                fieldArray={true}
                minFractionDigits={0}
                maxFractionDigits={0}
                disabled
              />
              );
            }}
          />

          <Controller
            control={control}
            name={"stake"}
            render={({ field }) => {
              return (
                <InputComponent
                  idInput={field.name}
                  errors={errors}
                  typeInput={"number"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  label={<>%Participación</>}
                  disabled={true}
                />
              );
            }}
          />

          <Controller
            control={control}
            name={"legalized"}
            render={({ field }) => {
              return (
                <InputComponent
                  idInput={field.name}
                  errors={errors}
                  typeInput={"number"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  className="input-basic medium"
                  classNameLabel="text-black big bold text-required"
                  label={<>No. Legalizados</>}
                />
              );
            }}
          />
        </section>

        <div className="button-save-container-display-items margin-right0 mr-24px">
          <ButtonComponent
            value="Cancelar"
            type="button"
            className="button-clean"
            action={() => CancelFunction()}
          />
          <ButtonComponent
            form="createItemForm"
            value="Guardar"
            type="submit"
            className={`button-save big`}
          />
        </div>
     
      </FormComponent>
    </Fragment>
  );
};

export default React.memo(Item);
