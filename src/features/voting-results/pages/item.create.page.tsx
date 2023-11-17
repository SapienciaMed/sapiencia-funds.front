import React, { Fragment, useContext, useEffect, useState } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { useItemResults } from "../hooks/item.create.hooks";
import { EDirection } from "../../../common/constants/input.enum";
import { Controller } from "react-hook-form";



const ItemResultsPage = ({ dataVoting, action, collback }) => {
  const {
    disabledCantidad,
    CancelFunction,
    onSubmitCreateItem,
    register,
    errors,
    sending,
    typeProgram,
    activity,
    control,
    changeAmountSum,
  } = useItemResults(action, dataVoting, collback);

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
            name={"directObject"}
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
                  label={
                    <>
                      Objetivo directo <span>*</span>
                    </>
                  }
                />
              );
            }}
          />

          <Controller
            control={control}
            name={"productCatalog"}
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
                  label={
                    <>
                      Producto catalogo dnp <span>*</span>
                    </>
                  }
                />
              );
            }}
          />

          <Controller
            control={control}
            name={"productCode"}
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
                  label={
                    <>
                      Código producto dnp <span>*</span>
                    </>
                  }
                />
              );
            }}
          />

          <SelectComponent
            idInput="program"
            control={control}
            className="select-basic medium"
            placeholder="Seleccionar"
            label="Programa "
            data={typeProgram ? typeProgram : []}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            // setValue={setProgramSelected}
          />
        </section>
        <section className="funcionality-filters-container gap-15">
          <SelectComponent
            idInput="activity"
            control={control}
            className="select-basic medium"
            placeholder="Seleccionar"
            label="Actividad"
            data={activity ? activity : []}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
          />

          <Controller
            control={control}
            name={"activityValue"}
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
                  disabled={true}
                  label={
                    <>
                      Valor actividad <span>*</span>
                    </>
                  }
                />
              );
            }}
          />

          <Controller
            control={control}
            name={"amount"}
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
                      Cantidad <span>*</span>
                    </>
                  }
                />
              );
            }}
          />

          <Controller
            control={control}
            name={"totalCost"}
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
                  disabled={true}
                  label={
                    <>
                      Costo total <span>*</span>
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
            name={"porcentaje123"}
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
                      Porcentaje 123 <span>*</span>
                    </>
                  }
                />
              );
            }}
          />

          <Controller
            control={control}
            name={"porcentaje456"}
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
                      Porcentaje 456 <span>*</span>
                    </>
                  }
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
            disabled={sending}
          />
          <ButtonComponent
            form="createItemForm"
            value="Guardar"
            type="submit"
            className="button-save large disabled-black"
            disabled={sending}
          />
        </div>
      </FormComponent>
    </Fragment>
  );
};

export default React.memo(ItemResultsPage);