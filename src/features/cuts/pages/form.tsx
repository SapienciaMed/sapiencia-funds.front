import { useState } from "react";
import useCutHook from "../hooks/createUpdate";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../common/components/Form";
import { Controller } from "react-hook-form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";

const Form = ({ auth }) => {
  const {
    control,
    errors,
    register,
    setValue,
    handleSubmit,
    onsubmitCreate,
    goBack,
    updateData,
    loading,
    getValues,
    watch,
    id,
    reset,
  } = useCutHook(auth);

  if (loading) return <></>;

  return (
    <div>
      <div className="container-form" style={{ padding: "10px" }}>
        <div
          className="title-area"
          style={{ marginLeft: "14px", marginBottom: 0 }}
        >
          <p className="text-black text-29 mg-0">
            {`${updateData?.id ? "Editar" : "Crear"} cortes por año`}
          </p>
        </div>
        <div style={{ marginTop: 0 }} className="container-form">
          <FormComponent
            id="cutCreate"
            className="form-signIn"
            action={(e) => {
              e.preventDefault();
              onsubmitCreate();
            }}
          >
            <div className="containerGroupSearch mb-24px">
              <div className="containerInitialPeriod mb-24px">
                <div style={{ paddingTop: "24px" }} className="container-input">
                  <Controller
                    control={control}
                    name={"name"}
                    render={({ field }) => {
                      return (
                        <InputComponent
                          idInput={field.name}
                          errors={errors}
                          typeInput="text"
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value ? field.value : ""}
                          className="input-basic input-size"
                          classNameLabel="text-black biggest font-500 text-required"
                          label="Nombre Corte"
                        />
                      );
                    }}
                  />
                </div>
              </div>
              <div className="containerInitialPeriod mb-24px">
                <div className="container-input">
                  <DatePickerComponent
                    control={control}
                    classNameLabel="text-black biggest font-500"
                    label={
                      <>
                        Fecha Inicial <span>*</span>
                      </>
                    }
                    idInput="from"
                    dateFormat="dd-mm-yy"
                    errors={errors}
                  ></DatePickerComponent>
                </div>
              </div>
              <div className="containerInitialPeriod mb-24px">
                <div className="container-input">
                  <DatePickerComponent
                    control={control}
                    classNameLabel="text-black biggest font-500"
                    label={
                      <>
                        Fecha Final <span>*</span>
                      </>
                    }
                    idInput="until"
                    dateFormat="dd-mm-yy"
                    errors={errors}
                  ></DatePickerComponent>
                </div>
              </div>
            </div>
          </FormComponent>
        </div>

        <div className="buttonsActions">
          <ButtonComponent
            value="Cancelar"
            type="button"
            className="button-cancel-text hover-three disabled-black padding-button"
            action={() => goBack()}
          />
          <ButtonComponent
            value="Guardar"
            form="cutCreate"
            type="submit"
            className="button-save disabled-black padding-button"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
