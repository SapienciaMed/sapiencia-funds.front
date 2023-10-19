import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  FormComponent,
  ButtonComponent,
  InputComponent,
} from "../../../common/components/Form";
import { Control, FieldValues, FormState } from "react-hook-form";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { IMasterActivityFilter } from "../../../common/interfaces/funds.interfaces";
interface IPropsFilterMasterActivity {
  control: Control<IMasterActivityFilter, any>;
  formState: FormState<FieldValues>;
  redirectCreate: () => void;
  onSubmit: () => Promise<void>;
  activityList: IDropdownProps[];
  formValues: IMasterActivityFilter;
}

export const FilterMasterActivityForm = ({
  control,
  formState,
  redirectCreate,
  onSubmit,
  activityList,
  formValues,
}: IPropsFilterMasterActivity): React.JSX.Element => {
  const { errors, isValid } = formState;
 
  return (
    <div className="container-sections-forms">
      <div className="title-area">
        <label className="text-black large medium grid-span-4-columns">Maestro actividad</label>

        <div
          className="title-button text-three large"
          onClick={redirectCreate}
        >Crear maestro actividad <AiOutlinePlusCircle />
        </div>
      </div>

      <div>
        <FormComponent className="form-signIn" action={onSubmit}>
          <div className="grid-form-3-container gap-25">
            <InputComponent
              register={control.register}
              idInput="name"
              className="input-basic medium"
              typeInput="text"
              label="Actividad"
              classNameLabel="text-black big text-required"
              errors={errors}
            />
          </div>

          <div className="button-save-container-display">
            <ButtonComponent
              value={"Buscar"}
              className="button-save disabled-black big"
              //disabled={!name}
            />
          </div>
        </FormComponent>
      </div>
    </div>
  );
};
