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
import { IMasterActivityFilter, IMasterActivity } from "../../../common/interfaces/funds.interfaces";
import useSearchMasterHook from "../hooks/search-master-activity.hook";

interface IPropsFilterMasterActivity {
    control: Control<IMasterActivityFilter, any>;
    formState: FormState<FieldValues>;
    redirectCreate: () => void;
    clearFields: () => void;
    onSubmit: () => Promise<void>;
}


export const FilterMasterActivityForm = ({
  control,
  formState,
  redirectCreate,
  onSubmit,
  clearFields,
}: IPropsFilterMasterActivity): React.JSX.Element => {
  const { errors, isValid } = formState;

  const {activitylist } = useSearchMasterHook();

  //const { activity } = formValues;

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
      <FormComponent className="form-signIn" action={onSubmit}>
        <div className="container-sections-forms">
          <div className="grid-form-3-container gap-25">
            <SelectComponent
              idInput={"activity"}
              control={control}
              errors={errors}
              data={activitylist}
              label={<>Actividad.</>}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              filter={true}
              placeholder="Seleccione."
            />

          </div>

          <div className="button-save-container-display m-top-20">
            <ButtonComponent
              value={"Limpiar campos"}
              className="button-clean bold"
              type="button"
              action={clearFields}
            />
            <ButtonComponent
              value={"Buscar"}
              className="button-save disabled-black big"
              //disabled={!codEmployment && !codFormsPeriod && !typeDeduction}
            />
          </div>
        </div>
      </FormComponent>
      </div>
    </div>
  );
};
