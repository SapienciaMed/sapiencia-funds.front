import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import {
  FormComponent,
  SelectComponent,
  InputComponent,
  ButtonComponent,
} from "../../../common/components/Form";

import {
  Control,
  FieldValues,
  FormState,
  UseFormRegister,
  Controller,
} from "react-hook-form";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { IMasterActivityFilter } from "../../../common/interfaces/funds.interfaces";

interface IPropsFilterMasterActivity {
    control: Control<IMasterActivityFilter, any>;
    formState: FormState<FieldValues>;
    redirectCreate: () => void;
    clearFields: () => void;
    onSubmit: () => Promise<void>;
    chargesState: IDropdownProps[];
    
}

export const FilterMasterActivityForm = ({
  control,
  formState,
  redirectCreate,
  onSubmit,
  clearFields,
  chargesState,
}: IPropsFilterMasterActivity): React.JSX.Element => {
  const { errors, isValid } = formState;

  //const { codCharge, numberActApproval } = formValues;

  return (
    <div className="container-sections-forms">
      <div className="title-area">
        <label className="text-black extra-large bold">Maestro actividad</label>

        <div
          className="title-button text-main biggest pointer"
          onClick={redirectCreate}
        >
          Crear maestro actividad <AiOutlinePlusCircle />
        </div>
      </div>

      <div>
        <FormComponent
          id="searchIncrementSalary"
          className="form-signIn"
          action={""}
        >
          <div className="grid-form-3-container gap-25">
            <SelectComponent
              idInput={"codCharge"}
              control={control}
              errors={errors}
              data={chargesState}
              label={
                <>
                  Actividad <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />
          </div>
          
          <div className="button-save-container-display m-top-20">
            <ButtonComponent
              value={"Buscar"}
              className="button-save disabled-black big"
              //disabled={!codCharge && !numberActApproval}
            />
          </div>
        </FormComponent>
      </div>
    </div>
  );
};
