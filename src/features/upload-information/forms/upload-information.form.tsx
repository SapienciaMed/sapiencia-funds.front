import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  FormComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { Control, FieldValues, FormState, UseFormRegister } from "react-hook-form";
import { IUploadInformation } from "../../../common/interfaces/funds.interfaces";

interface IPropsCreateUploadInformation {
  register: UseFormRegister<any>;
  control: Control<IUploadInformation, any>;
  formState: FormState<FieldValues>;
  onSubmit: () => Promise<void>;
  formValues: IUploadInformation;
}

export const CreateUploadInformationForm = ({
  register,
  control,
  formState,
  onSubmit,
  formValues,
}: IPropsCreateUploadInformation): React.JSX.Element => {
  const { errors, isValid } = formState;
 
  return (
    <div className="container-sections-forms">
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
        </FormComponent>
      </div>
    </div>
  );
};
