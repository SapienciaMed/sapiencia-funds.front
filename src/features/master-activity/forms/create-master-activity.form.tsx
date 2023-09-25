import React from "react";

import {
  FormComponent,
  SelectComponent,
  InputComponent,
  ButtonComponent,
  LabelComponent,
} from "../../../common/components/Form";

import {
  Control,
  FieldValues,
  FormState,
  UseFormRegister,
  Controller,
} from "react-hook-form";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { EDirection } from "../../../common/constants/input.enum";

import { IMasterActivity } from "../../../common/interfaces/funds.interfaces";

interface IPropsCreateMasterActivity {
  register: UseFormRegister<any>;
  control: Control<IMasterActivity, any>;
  formState: FormState<FieldValues>;
  redirectCancel: () => void;
  onSubmit: () => Promise<void>;
  chargesState: IDropdownProps[];
  percentageValue: boolean;
  idChargeValue: number;
  action?: string;
}

export const CreateMasterActivityForm = ({
  register,
  control,
  formState,
  redirectCancel,
  onSubmit,
  chargesState,
  percentageValue,
  idChargeValue,
  action,
}: IPropsCreateMasterActivity): React.JSX.Element => {
  const { errors, isValid } = formState;

  return (
    <FormComponent
      id="createUpdateIncrementSalary"
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
          <div className="grid-form-2-container gap-25">
          <SelectComponent
              idInput={"activity"}
              control={control}
              errors={errors}
              //data={activityList}
              label={
                <>
                  Actividad <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              filter={true}
              placeholder="Seleccione."
            />

            <SelectComponent
              idInput={"activity"}
              control={control}
              errors={errors}
              //data={activityList}
              label={
                <>
                  Valor <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              filter={true}
              placeholder="Seleccione."
            />

            <SelectComponent
              idInput={"activity"}
              control={control}
              errors={errors}
              //data={activityList}
              label={
                <>
                  Programa <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              filter={true}
              placeholder="Seleccione."
            />

            <SelectComponent
              idInput={"activity"}
              control={control}
              errors={errors}
              //data={activityList}
              label={
                <>
                  Descripción <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              filter={true}
              placeholder="Seleccione."
            />
          </div>
        </div>
      </div>
   
      <div className="button-save-container-display m-top-20">
        <ButtonComponent
          value={"Cancelar"}
          className="button-clean bold"
          type="button"
          action={redirectCancel}
        />
        <ButtonComponent
          value={action === "edit" ? "Editar" : "Guardar"}
          className="button-save disabled-black big"
          type="submit"
          disabled={!isValid}
        />
      </div>
    </FormComponent>
  );
};
