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
        className="form-signIn"
        action={onSubmitCreateItem}
      >
        <div className="grid-form-4-container gap-25 container-sections-forms alto-auto">
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

          {/* <InputComponent
            idInput="directObject"
            className="input-basic medium form-group"
            typeInput="text"
            label="Objetivo directo"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          /> */}

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

          {/* <InputComponent
            idInput="productCatalog"
            className="input-basic medium form-group"
            typeInput="number"
            label="Producto catalogo dnp"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          /> */}

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

          {/* <InputComponent
            idInput="productCode"
            className="input-basic medium form-group"
            typeInput="text"
            label="Código producto dnp"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          /> */}

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

          {/* <InputComponent
            idInput="activityValue"
            className="input-basic medium form-group"
            typeInput="number"
            label="Valor actividad"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
            disabled={true}
          /> */}

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

          {/* <InputComponent
            idInput="amount"
            className="input-basic medium form-group"
            typeInput="number"
            label="Cantidad"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
            disabled={disabledCantidad}
            onChange={changeAmountSum}
          /> */}

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

          {/* <InputComponent
            idInput="totalCost"
            className="input-basic medium form-group"
            typeInput="number"
            label="Costo total"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
            disabled={true}
          /> */}

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

          {/* <InputComponent
            idInput="porcentaje123"
            className="input-basic medium form-group"
            typeInput="number"
            label="Porcentaje 123"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          /> */}

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

          {/* <InputComponent
            idInput="porcentaje456"
            className="input-basic medium form-group"
            typeInput="number"
            label="Porcentaje 456"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          /> */}
        </div>

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