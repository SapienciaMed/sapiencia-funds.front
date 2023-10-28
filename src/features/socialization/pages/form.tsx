import React, { useEffect, useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form/index";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import useSocializationCrud from "../hooks/createUpdate";
import { data } from "../service/api";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { Controller } from "react-hook-form";

const Form = () => {
  const {
    control,
    errors,
    register,
    deparmetList,
    onsubmitCreate,
    goBack,
    updateData,
    loading,
  } = useSocializationCrud();

  if (loading) return <></>;

  return (
    <div className="container-form">
      <div className="title-area">
        <p className="text-black text-29 ml-24px mt-20px mg-0">
          {`${
            updateData?.id ? "Actualizar" : "Crear"
          } socialización informe de ejecución`}
        </p>
      </div>
      <FormComponent
        id="socializationForm"
        className="form-signIn"
        action={onsubmitCreate}
      >
        <div>
          <div className="container-form padding-form">
            <div className="firtsGrid">
              <div className="containerInputProyect">
                <Controller
                  control={control}
                  name={"noProyect"}
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        errors={errors}
                        defaultValue={`${updateData?.noProyect}`}
                        typeInput="number"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        className="input-basic input-size"
                        classNameLabel="text-black biggest text-required bold"
                        label="No. de Proyecto"
                        disabled={updateData?.noProyect ? true : false}
                      />
                    );
                  }}
                />
              </div>
              <div className="containerCommune">
                <SelectComponentOld
                  idInput={"communeCode"}
                  register={register}
                  errors={errors}
                  value={updateData?.communeCode}
                  disabled={updateData?.communeCode ? true : false}
                  data={deparmetList ? deparmetList : []}
                  label={
                    <>
                      Comuna y/o corregimiento <span>*</span>
                    </>
                  }
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest bold"
                  placeholder="Seleccionar"
                />
              </div>
              <div className="containerDate">
                <DatePickerComponent
                  value={
                    updateData?.socializationDate
                      ? new Date(updateData?.socializationDate).toISOString()
                      : new Date().toISOString()
                  }
                  control={control}
                  classNameLabel="text-black text-required bold"
                  label={<>Fecha de socialización</>}
                  idInput="socializationDate"
                  dateFormat="dd-mm-yy"
                  errors={errors}
                ></DatePickerComponent>
              </div>
              <div className="containerInputProyect">
                <Controller
                  control={control}
                  name={"validity"}
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        errors={errors}
                        defaultValue={`${
                          updateData?.validity ? updateData.validity : "2023"
                        }`}
                        typeInput="number"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        className="input-basic input-size"
                        classNameLabel="text-black biggest text-required bold"
                        label="Vigencia"
                        disabled={updateData?.noProyect ? true : false}
                      />
                    );
                  }}
                />
              </div>
              <div className="containerGruopValue">
                <SelectComponentOld
                  idInput={"valueGroup"}
                  register={register}
                  value={updateData?.valueGroup}
                  errors={errors}
                  data={data}
                  label={
                    <>
                      Grupo de valor <span>*</span>
                    </>
                  }
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest bold"
                  // filter={true}
                  placeholder="Seleccionar"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="title-area">
          <p className="text-black ml-24px text-24 mg-0">
            Recursos disponibles socializados
          </p>
        </div>
        <div>
          <div className="container-form padding-form">
            <div className="secondGrid">
              <div className="containerInput">
                <Controller
                  control={control}
                  name={"financialPerformance"}
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        errors={errors}
                        defaultValue={`${updateData?.financialPerformance}`}
                        typeInput="number"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        className="input-basic input-size"
                        classNameLabel="text-black biggest text-required bold"
                        label="Rendimientos Financieros"
                      />
                    );
                  }}
                />
              </div>
              <div className="containerInput">
                <Controller
                  control={control}
                  name={"portfolioCollections"}
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        errors={errors}
                        typeInput="number"
                        onChange={field.onChange}
                        defaultValue={`${updateData?.portfolioCollections}`}
                        onBlur={field.onBlur}
                        value={field.value}
                        className="input-basic input-size"
                        classNameLabel="text-black biggest text-required bold"
                        label="Recaudos de cartera"
                      />
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="padding-form">
          <Controller
            control={control}
            name={"description"}
            render={({ field }) => {
              return (
                <TextAreaComponent
                  idInput={field.name}
                  id="rew"
                  label="Observaciones"
                  className="text-area-basic"
                  classNameLabel="text-black biggest bold"
                  defaultValue={`${
                    updateData?.description ? updateData.description : ""
                  }`}
                  rows={2}
                  onChange={field.onChange}
                  value={field.value}
                  placeholder="Escribe aquí"
                  errors={errors}
                  characters={500}
                ></TextAreaComponent>
              );
            }}
          />
        </div>
      </FormComponent>

      <div className="container-btns">
        <ButtonComponent
          form="socializationForm"
          value="Cancelar"
          type="button"
          className="button-cancel-text hover-three disabled-black padding-button"
          action={() => goBack()}
        />
        <ButtonComponent
          form="socializationForm"
          value="Guardar"
          type="submit"
          className="button-save disabled-black padding-button"
        />
      </div>
    </div>
  );
};

export default React.memo(Form);
