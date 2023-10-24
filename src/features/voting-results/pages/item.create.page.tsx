import React, { Fragment, useContext, useEffect, useState } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { useItemResults } from "../hooks/item.create.hooks";
import { EDirection } from "../../../common/constants/input.enum";



const ItemResultsPage = ({ dataVoting, action }) => {
  const {
    CancelFunction,
    onSubmitCreateItem,
    register,
    errors,
    sending,
    typeProgram,
    setProgramSelected,
    setActivitySelected,
    activity,
    setDataGrid,
    dataGrid,
    idItemEdit,
    setIdItemEdit,
    control,
  } = useItemResults(action, dataVoting);

  return (
    <Fragment>
      <FormComponent
        id="createItemForm"
        className="form-signIn"
        action={onSubmitCreateItem}
      >
        <div className="grid-form-4-container gap-25 container-sections-forms alto-auto">
          <InputComponent
            idInput="directObject"
            className="input-basic medium form-group"
            typeInput="text"
            label="Objetivo directo"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          />

          <InputComponent
            idInput="productCatalog"
            className="input-basic medium form-group"
            typeInput="number"
            label="Producto catalogo dnp"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          />

          <InputComponent
            idInput="productCode"
            className="input-basic medium form-group"
            typeInput="text"
            label="Código producto dnp"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
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

          <InputComponent
            idInput="activityValue"
            className="input-basic medium form-group"
            typeInput="number"
            label="Valor actividad"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          />

          <InputComponent
            idInput="amount"
            className="input-basic medium form-group"
            typeInput="number"
            label="Cantidad"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          />

          <InputComponent
            idInput="totalCost"
            className="input-basic medium form-group"
            typeInput="number"
            label="Costo total"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          />

          <InputComponent
            idInput="porcentaje123"
            className="input-basic medium form-group"
            typeInput="number"
            label="Porcentaje 123"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          />

          <InputComponent
            idInput="porcentaje456"
            className="input-basic medium form-group"
            typeInput="number"
            label="Porcentaje 456"
            register={register}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
            placeholder={""}
          />
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