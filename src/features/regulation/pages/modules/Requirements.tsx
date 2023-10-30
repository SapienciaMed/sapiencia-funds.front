import React from "react";
import SwitchComponent from "../../../../common/components/Form/switch.component";
import {
  ButtonComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { TextAreaComponent } from "../../../../common/components/Form/input-text-area.component";
import { Controller } from "react-hook-form";

const Requirements = ({ errors, updateData, control }) => {
  return (
    <div className="container-form p-24">
      <p className="text-black text-29 mg-0">Requisitos</p>
      <div style={{ display: "flex" }}>
        <SwitchComponent
          idInput={"active"}
          errors={errors}
          control={control}
          size="normal"
          label="Estado"
          disabled={
            updateData?.applyCondonationPerformancePeriod ? true : false
          }
          className="select-basic select-disabled-list input-size"
          classNameLabel="text-black biggest text-required bold"
        />
        <Controller
          control={control}
          name={"percent"}
          render={({ field }) => {
            return (
              <InputComponent
                idInput={field.name}
                errors={errors}
                defaultValue={`${updateData?.socialServicePercentage}`}
                typeInput="number"
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                className="input-basic input-size"
                classNameLabel="text-black biggest text-required bold"
                label="Porcentaje de descuento por periodo"
                disabled={updateData?.socialServicePercentage ? true : false}
              />
            );
          }}
        />
      </div>
      <div>
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
                characters={200}
              ></TextAreaComponent>
            );
          }}
        />
        <div style={{ display: "flex", justifyContent: "end" }}>
          <ButtonComponent
            value="Guardar"
            type="button"
            className="button-save disabled-black padding-button"
            action={() => console.log("save")}
          />
        </div>
      </div>
    </div>
  );
};

export default Requirements;
