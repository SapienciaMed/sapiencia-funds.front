import React, { Fragment, useContext, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { ButtonComponent, FormComponent, InputComponent } from "../../../../common/components/Form";
import { itemStratum123Hook } from "../../hooks/conditionalHooks/ItemStratum123Hook";


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
                <InputComponent
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
                />
              );
            }}
          />

          <Controller
            control={control}
            name={"granted"}
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
                  label={
                    <>
                      Otorgado <span>*</span>
                    </>
                  }
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
                <InputComponent
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

        <div className="button-save-container-display-users margin-right0">
          <ButtonComponent
            value="Cancelar"
            type="button"
            className="button-cancel-text large hover-three disabled-black"
            action={() => CancelFunction()}
          />
          <ButtonComponent
            form="createItemForm"
            value="Guardar"
            type="submit"
            className="button-save large disabled-black"
          />
        </div>
      </FormComponent>
    </Fragment>
  );
};

export default React.memo(Item);
