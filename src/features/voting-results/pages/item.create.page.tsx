import React, { Fragment, useContext, useEffect, useState } from "react";
import { ButtonComponent, FormComponent, InputComponent } from "../../../common/components/Form";
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
    activity,
    setDataGrid,
    dataGrid,
  } = useItemResults(action, dataVoting);

  return (
    <Fragment>
      {action == "new" ? (
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

            <SelectComponentOld
              idInput="program"
              register={register}
              className="select-basic medium"
              placeholder="Seleccionar"
              label="Programa "
              data={typeProgram ? typeProgram : []}
              value={null}
              classNameLabel="text-black big text-required bold"
              direction={EDirection.column}
              errors={errors}
              setValue={setProgramSelected}
            />

            <SelectComponentOld
              idInput="activity"
              register={register}
              className="select-basic medium"
              placeholder="Seleccionar"
              label="Actividad"
              data={activity ? activity : []}
              value={null}
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
      ) : (
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
              value={dataVoting.directObject}
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
              value={dataVoting.productCatalog}
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
              value={dataVoting.productCode}
            />

            <SelectComponentOld
              idInput="program"
              register={register}
              className="select-basic medium"
              placeholder="Seleccionar"
              label="Programa "
              data={typeProgram ? typeProgram : []}
              classNameLabel="text-black big text-required bold"
              direction={EDirection.column}
              errors={errors}
              setValue={setProgramSelected}
              value={dataVoting.program}
            />

            <SelectComponentOld
              idInput="activity"
              register={register}
              className="select-basic medium"
              placeholder="Seleccionar"
              label="Actividad"
              data={activity ? activity : []}
              value={dataVoting.activity}
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
              value={dataVoting.activityValue}
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
              value={dataVoting.amount}
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
              value={dataVoting.totalCost}
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
              value={dataVoting.porcentaje123}
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
              value={dataVoting.porcentaje456}
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
      )}
    </Fragment>
  );
};

export default React.memo(ItemResultsPage);