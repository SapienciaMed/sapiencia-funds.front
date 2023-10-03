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

interface IPropsUsersNotifayUploadInformation {
    register: UseFormRegister<any>;
    control: Control<IUploadInformation, any>;
    formState: FormState<FieldValues>;
    onSubmit: () => Promise<void>;
    formValues: IUploadInformation;
    activeWorkerList: IDropdownProps[];
  }
  
  export const UserNotifyUploadInformationForm = ({
    register,
    control,
    formState,
    onSubmit,
    formValues,
    activeWorkerList,
  }: IPropsUsersNotifayUploadInformation): React.JSX.Element => {
    const { errors, isValid } = formState;

   
    return (
      
          <FormComponent
          id="createItemForm" 
          className="form-signIn" 
          action={onSubmit}
          >
            <div className="container-sections-forms">
              <div className="grid-form-3-container gap-25">
                <SelectComponent
                  idInput={"codEmployment"}
                  control={control}
                  errors={errors}
                  data={activeWorkerList}
                  label={<>Notificar a</>}
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  filter={true}
                  placeholder="Seleccione."
                />
            </div>
            </div>
          </FormComponent>
    );
  };
  