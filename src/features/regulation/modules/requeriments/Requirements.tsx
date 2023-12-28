import React, { useEffect } from "react";
import SwitchComponent from "../../../../common/components/Form/switch.component";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { TextAreaComponent } from "../../../../common/components/Form/input-text-area.component";
import { Controller } from "react-hook-form";
import useRequerimentsHook from "../../hooks/requeriments.hook";
import TableComponent from "../../../../common/components/table.component";

const Requirements = ({ onlyView, id = null }) => {
  const {
    control,
    errors,
    onsubmitCreate,
    loading,
    tableActions,
    tableColumns,
    tableComponentRef,
  } = useRequerimentsHook(onlyView, id);

  if (loading) return <></>;

  return (
    <>
      {!onlyView && (
        <FormComponent id="requerimentCreate" action={onsubmitCreate}>
          <div className="container-form p-24">
            <p className="text-black text-29 mg-0">Requisitos</p>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "24px" }}>
                <SwitchComponent
                  idInput={"active"}
                  errors={errors}
                  disabled={onlyView ? true : false}
                  control={control}
                  size="normal"
                  label="Estado"
                  className="select-basic select-disabled-list input-size mr-12"
                  classNameLabel="text-black biggest font-500"
                />
              </div>

              <Controller
                control={control}
                name={"percent"}
                render={({ field }) => {
                  return (
                    <InputComponent
                      idInput={field.name}
                      errors={errors}
                      disabled={onlyView ? true : false}
                      typeInput="number"
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      value={field.value}
                      className="input-basic input-size "
                      classNameLabel="text-black biggest font-500 "
                      label="Porcentaje de descuento por periodo"
                    />
                  );
                }}
              />
            </div>
            <div style={{ marginTop: "24px" }}>
              <Controller
                control={control}
                name={"description"}
                render={({ field }) => {
                  return (
                    <TextAreaComponent
                      idInput={field.name}
                      id="rew"
                      label="Descripción"
                      className="text-area-basic"
                      classNameLabel="text-black biggest text-required font-500"
                      rows={2}
                      disabled={onlyView ? true : false}
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Escribe aquí"
                      errors={errors}
                      characters={200}
                    ></TextAreaComponent>
                  );
                }}
              />
              <div style={{ display: "flex", justifyContent: "end" }}>
                <ButtonComponent
                  value="Agregar"
                  type="submit"
                  className="button-save disabled-black padding-button"
                  form="requerimentCreate"
                  disabled={onlyView ? true : false}
                />
              </div>
            </div>
          </div>
        </FormComponent>
      )}

      {!loading && (
        <div className="container-form padding-form ">
          <TableComponent
            princialTitle="Requisitos creados"
            ref={tableComponentRef}
            url={`${process.env.urlApiFunds}/api/v1/requeriments/get-paginated`}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={false}
            descriptionModalNoResult="No existen resultados"
          />
        </div>
      )}
    </>
  );
};

export default Requirements;