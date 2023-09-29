import React, { Fragment, useContext, useEffect, useState } from "react";
import { FormComponent, InputComponent } from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { useItemResults } from "../hooks/item.create.hooks";
import { EDirection } from "../../../common/constants/input.enum";


const ItemResultsPage = () => {

    const {
        CancelFunction,
        onSubmitCreateItem,
        register,
        errors,
        sending,
        deparmetList,
    } = useItemResults();

    return (
      <Fragment>
        <FormComponent
          id="createItemForm"
          className="form-signIn"
          action={onSubmitCreateItem}
        >
          <div className="grid-form-4-container gap-25 container-sections-forms alto-auto">
            {/* <SelectComponentOld
            idInput="communeNeighborhood"
            register={register}
            className="select-basic medium"
            placeholder="Seleccionar"
            label="Comuna y/o corregimiento "
            data={deparmetList ? deparmetList : []}
            value={null}
            classNameLabel="text-black big text-required bold"
            direction={EDirection.column}
            errors={errors}
          /> */}

            <InputComponent
              idInput="numberProject"
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
              idInput="numberProject"
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
              idInput="validity"
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
              idInput="communeNeighborhood"
              register={register}
              className="select-basic medium"
              placeholder="Seleccionar"
              label="Programa "
              data={[]}
              value={null}
              classNameLabel="text-black big text-required bold"
              direction={EDirection.column}
              errors={errors}
            />

            <SelectComponentOld
              idInput="communeNeighborhood"
              register={register}
              className="select-basic medium"
              placeholder="Seleccionar"
              label="Actividad"
              data={[]}
              value={null}
              classNameLabel="text-black big text-required bold"
              direction={EDirection.column}
              errors={errors}
            />

            <InputComponent
              idInput="ideaProject"
              className="input-basic medium form-group"
              typeInput="number"
              label="Valor actividad"
              register={register}
              classNameLabel="text-black big text-required bold"
              direction={EDirection.column}
              errors={errors}
              placeholder={""}
              disabled={true}
            />

            <InputComponent
              idInput="ideaProject"
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
              idInput="ideaProject"
              className="input-basic medium form-group"
              typeInput="number"
              label="Costo total"
              register={register}
              classNameLabel="text-black big text-required bold"
              direction={EDirection.column}
              errors={errors}
              placeholder={""}
              disabled={true}
            />

            <InputComponent
              idInput="ideaProject"
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
              idInput="ideaProject"
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
        </FormComponent>
      </Fragment>
    );
};

export default React.memo(ItemResultsPage);