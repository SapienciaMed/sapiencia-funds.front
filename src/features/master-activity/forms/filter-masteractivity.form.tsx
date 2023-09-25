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
  Controller,
} from "react-hook-form";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { IMasterActivityFilter, IMasterActivity } from "../../../common/interfaces/funds.interfaces";
import useSearchMasterHook from "../hooks/search-master-activity.hook";

interface IPropsFilterMasterActivity {
    control: Control<IMasterActivityFilter, any>;
    formState: FormState<FieldValues>;
    redirectCreate: () => void;
    onSubmit: () => Promise<void>;
    activityList: IDropdownProps[];
    formValues: IMasterActivityFilter
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


  const { name } = formValues;

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
          <div className="grid-form-3-container gap-25">
            <SelectComponent
              idInput={"name"}
              control={control}
              errors={errors}
              data={activityList}
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
