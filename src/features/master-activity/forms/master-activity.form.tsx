import React, { BaseSyntheticEvent } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IMasterActivity } from "../../../common/interfaces/funds.interfaces";
import { createmasterActivity } from "../../../common/schemas/master-schema";
import useMasterActivityApi from "../hooks/master-activity-api.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { Control, FieldValues, FormState, Controller } from "react-hook-form";
import { number } from "yup";

interface IPropsCreateUodateActivity {
  control: Control<IMasterActivity, any>;
  initData?: IMasterActivity;
  formState: FormState<FieldValues>;
  typeProgram: any[];
  redirectCancel: () => void;
  action: string;
  onSubmit: () => Promise<void>;
}

export const MasterActivityForm = ({
  control,
  formState,
  typeProgram,
  redirectCancel,
  action,
  onSubmit
}: IPropsCreateUodateActivity): React.JSX.Element => {
  const { errors, isValid } = formState;


  return (
    <>
      <FormComponent 
      id="createItemForm"
      className="form-signIn" 
      action={onSubmit}
      >
          <div className="container-sections-forms">
            <div className="title-area">
              <label className="text-black extra-large bold">
              Maestro Actividad
            </label>
          </div>

          <div>
            <div className="grid-form-4-container gap-25">
                <Controller
                  control={control}
                  name={"name"}
                  shouldUnregister={true}
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        errors={errors}
                        typeInput={"text"}
                        label={
                          <>
                            Actividad <span>*</span>
                          </>
                        }
                        //value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        className="input-basic medium"
                        classNameLabel="text-black big bold"
                        disabled={action === "edit" ? true : false} 
                      />
                    );
                  }}
                />

                <Controller
                  control={control}
                  name={"totalValue"}
                  defaultValue={0}
                  shouldUnregister={true}
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        errors={errors}
                        typeInput="number"
                        label={
                          <>
                            Valor <span>*</span>
                          </>
                        }
                        value={`${field.value}`}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className="input-basic medium"
                        classNameLabel="text-black big bold"
                      />
                    );
                  }}
                />

                <SelectComponent
                  idInput={"codProgramCode"}
                  control={control}
                  errors={errors}
                  data={typeProgram}
                  label={
                    <>
                    Programa <span>*</span>
                    </>
                  }
                  className="select-basic medium select-disabled-list"
                  classNameLabel="text-black big bold"
                  filter={true}
                  placeholder="Seleccione."
                  disabled={action === "edit" ? true : false} 
                />

                <Controller
                  control={control}
                  name={"description"}
                  shouldUnregister={true}
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        errors={errors}
                        typeInput={"text"}
                        label={"Descripcion"}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        className="input-basic medium"
                        classNameLabel="text-black big bold"
                        disabled={action === "edit" ? true : false} 
                      />
                    );
                  }}
                />   
                           
            </div>
          </div>
        </div>
      </FormComponent>
      <div className="button-save-container-display m-top-20">
        <ButtonComponent
          form="createItemForm"
          value={"Cancelar"}
          className="button-clean bold"
          type="button"
          action={redirectCancel}
        />
        <ButtonComponent
          form="createItemForm"
          value={`${action === "edit" ? "Editar" : "Guardar"}`}
          className="button-save large hover-three disabled-black"
        />
      </div>
    </>
  );
}
