import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  FormComponent,
  ButtonComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { Control, FieldValues, FormState, UseFormRegister } from "react-hook-form";
import { IUploadInformation } from "../../../common/interfaces/funds.interfaces";

interface IPropsFileUploadInformation {
  register: UseFormRegister<any>;
  control: Control<IUploadInformation, any>;
  formState: FormState<FieldValues>;
  onSubmit: () => Promise<void>;
  formValues: IUploadInformation;
}

export const UploadInformationForm = ({
    register,
    control,
    formState,
    onSubmit,
    formValues,
  }: IPropsFileUploadInformation): React.JSX.Element => {
    const { errors, isValid } = formState;

    return (
        <div className="container-sections-forms">
          <div className="title-area">
            <label className="text-black extra-large bold">doc</label>
          </div>
    
          <div>
            <FormComponent className="form-signIn" action={onSubmit}>
              <div className="grid-form-4-container gap-25">
            
              </div>

            </FormComponent>
          </div>
        </div>
      );
    };
    