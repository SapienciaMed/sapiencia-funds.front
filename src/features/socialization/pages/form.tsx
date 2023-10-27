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
                <InputComponent
                  idInput={"noProyect"}
                  className="input-basic input-size"
                  typeInput="number"
                  label="No. de Proyecto"
                  register={register}
                  classNameLabel="text-black biggest text-required bold"
                  errors={errors}
                  disabled={updateData?.noProyect ? true : false}
                  placeholder={""}
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
                <InputComponent
                  idInput={"validity"}
                  className="input-basic input-size"
                  defaultValue="2023"
                  typeInput="text"
                  label="Vigencia"
                  disabled={updateData?.validity ? true : false}
                  register={register}
                  classNameLabel="text-black biggest text-required bold"
                  errors={errors}
                  placeholder={""}
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
                <InputComponent
                  idInput={"financialPerformance"}
                  className="input-basic input-size"
                  typeInput="number"
                  label="Rendimientos Financieros"
                  register={register}
                  classNameLabel="text-black biggest text-required bold "
                  errors={errors}
                  placeholder={""}
                />
              </div>
              <div className="containerInput">
                <InputComponent
                  idInput={"portfolioCollections"}
                  className="input-basic input-size "
                  typeInput="number"
                  label="Recaudos de cartera"
                  register={register}
                  classNameLabel="text-black biggest text-required bold "
                  errors={errors}
                  placeholder={""}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="padding-form">
          <TextAreaComponent
            id="rew"
            idInput="description"
            label="Observaciones"
            className="text-area-basic"
            classNameLabel="text-black biggest bold"
            rows={2}
            placeholder="Escribe aquí"
            register={register}
            errors={errors}
            onChange={() => {}}
            characters={500}
          ></TextAreaComponent>
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
