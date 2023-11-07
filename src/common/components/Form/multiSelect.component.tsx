import React, { useState } from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";

import { Control, Controller } from "react-hook-form";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';

interface IMultiSelectProps {
    name: string;
    value: string;
}

interface ISelectProps<T> {
  idInput: string;
  control: Control<any>;
  className?: string;
  placeholder?: string;
  data?: Array<IMultiSelectProps>;
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: any;
  disabled?: boolean;
  fieldArray?: boolean;
  filter?: boolean;
  emptyMessage?: string;
  customClass?: string;  
}

function LabelElement({ label, idInput, classNameLabel }): React.JSX.Element {
    if (!label) return <></>;
    return (
        <LabelComponent
            htmlFor={idInput}
            className={classNameLabel}
            value={label}
        />
    );
}

export function MultiSelects({
    idInput,
    control,
    label,
    className = "select-basic",
    classNameLabel = "text-main",
    placeholder,
    fieldArray,
    data = [{} as IMultiSelectProps],
    errors = {},
    disabled,
    filter,
    direction = EDirection.column,
    customClass,
  }: ISelectProps<any>): React.JSX.Element {
    const [selectedCities, setSelectedCities] = useState<IMultiSelectProps | null>(null);
    if (data) {
      const seleccione: IMultiSelectProps = { name: placeholder, value: "" };
      const dataSelect = data?.find(
        (item) => item.name === seleccione.name && item.value === seleccione.value
      );
      if (!dataSelect) data.unshift(seleccione);
    }
  
    const messageError = () => {
      const keysError = idInput.split(".");
      let errs = errors;
      if (fieldArray) {
        const errorKey = `${keysError[0]}[${keysError[1]}].${keysError[2]}`;
        return errors[errorKey]?.message;
      } else {
        for (let key of keysError) {
          errs = errs?.[key];
          if (!errs) {
            break;
          }
        }
        return errs?.message ?? null;
      }
    };
  
  
    return (
      <div
      className={
        messageError() ? `${direction} container-icon_error` : direction
      }
      >
          <LabelElement
            label={label}
            idInput={idInput}
            classNameLabel={classNameLabel}
          />
     
        <div className={`select-element ${customClass}`}>
          <Controller
            name={idInput}
            control={control}
            render={({ field }) => (
              <MultiSelect
                id={field.name}
                value={field.value}
                onChange={(e: MultiSelectChangeEvent) => field.onChange(e.value)} 
                options={data}
                optionLabel="name"
                placeholder={placeholder}
                filter={filter}
                disabled={disabled}
                maxSelectedLabels={3}
                className={`${className} ${messageError() ? "p-invalid" : ""}`}
              />
            )}
          />
          {messageError() && <span className="icon-error"></span>}
        </div>
        {messageError() && (
        <p className="error-message medium not-margin-padding">
          {messageError()}
        </p>
      )}
      </div>
    );
  }
  