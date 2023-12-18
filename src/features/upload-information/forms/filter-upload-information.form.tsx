import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  FormComponent,
  ButtonComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { Control, FieldValues, FormState, UseFormRegister } from "react-hook-form";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { IUploadInformation } from "../../../common/interfaces/funds.interfaces";
import useListData from "../hooks/list.hook";

interface IPropsFilterUploadInformation {
  register: UseFormRegister<any>;
  control: Control<IUploadInformation, any>;
  formState: FormState<FieldValues>;
  redirectCreate: () => void;
  onSubmit: () => Promise<void>;
  formValues: IUploadInformation;
  commune: IDropdownProps[];
  validity: IDropdownProps[];
  information: IDropdownProps[];
}

export const FilterUploadInformationForm = ({
  register,
  control,
  formState,
  redirectCreate,
  onSubmit,
  formValues,
  commune,
  validity,
  information
}: IPropsFilterUploadInformation): React.JSX.Element => {
  const { errors, isValid } = formState;

  const {vigencias} = useListData();
 
  return (
    <div className="container-sections-forms">
      <div className="title-area">
        <label className="text-black extra-large medium"></label>

        <div
          className="title-button text-main biggest pointer"
          onClick={redirectCreate}
        >
         Cargar archivo <AiOutlinePlusCircle />
        </div>
      </div>

      <div>
        <FormComponent className="form-signIn" action={onSubmit}>
          <div className="grid-form-4-container gap-25">
           
                <SelectComponent
                  idInput={"commune"}
                  control={control}
                  errors={errors}
                  data={commune}
                  label={
                    <>
                    Comuna y/o corregimiento
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big text-required"
                  filter={true}
                  placeholder="Seleccionar"
                  //disabled={action === "edit" ? true : false} 
                />

                <SelectComponent
                  idInput={"validity"}
                  control={control}
                  errors={errors}
                  data={vigencias}
                  label={
                    <>
                    Vigencia
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big text-required"
                  filter={true}
                  placeholder="Seleccionar"
                  //disabled={action === "edit" ? true : false} 
                />

                <SelectComponent
                  idInput={"information"}
                  control={control}
                  errors={errors}
                  data={information}
                  label={
                    <>
                    Información
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big text-required"
                  filter={true}
                  placeholder="Seleccionar"
                  //disabled={action === "edit" ? true : false} 
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
