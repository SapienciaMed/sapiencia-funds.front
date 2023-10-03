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

interface IPropsFilterUploadInformation {
  register: UseFormRegister<any>;
  control: Control<IUploadInformation, any>;
  formState: FormState<FieldValues>;
  redirectCreate: () => void;
  onSubmit: () => Promise<void>;
  formValues: IUploadInformation;
}

export const FilterUploadInformationForm = ({
  register,
  control,
  formState,
  redirectCreate,
  onSubmit,
  formValues,
}: IPropsFilterUploadInformation): React.JSX.Element => {
  const { errors, isValid } = formState;
 
  return (
    <div className="container-sections-forms">
      <div className="title-area">
        <label className="text-black extra-large bold"></label>

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
                  idInput={"codProgramCode"}
                  control={control}
                  errors={errors}
                  data={[]}
                  label={
                    <>
                    Comuna y/o corregimiento <span>*</span>
                    </>
                  }
                  className="select-basic medium select-disabled-list"
                  classNameLabel="text-black big bold"
                  filter={true}
                  placeholder="Seleccione."
                  //disabled={action === "edit" ? true : false} 
                />

                <SelectComponent
                  idInput={"codProgramCode"}
                  control={control}
                  errors={errors}
                  //data={typeProgram}
                  label={
                    <>
                    Vigencia <span>*</span>
                    </>
                  }
                  className="select-basic medium select-disabled-list"
                  classNameLabel="text-black big bold"
                  filter={true}
                  placeholder="Seleccione."
                  //disabled={action === "edit" ? true : false} 
                />

                <SelectComponent
                  idInput={"codProgramCode"}
                  control={control}
                  errors={errors}
                  //data={typeProgram}
                  label={
                    <>
                    información <span>*</span>
                    </>
                  }
                  className="select-basic medium select-disabled-list"
                  classNameLabel="text-black big bold"
                  filter={true}
                  placeholder="Seleccione."
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
