import React, { useEffect, useRef, useState } from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import { MdOutlineError } from "react-icons/md";
import { Control, Controller, useController, useFormState } from "react-hook-form";

interface ISwitch<T> {
  idInput: string;
  control?: Control<any>;
  className?: string;
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: any;
  disabled?: boolean;
  fieldArray?: boolean;
  optionsRegister?: {};
  direction?: EDirection;
  size: string;
  defaultValue?: boolean;
  onChange?: () => void;
  onClick?: () => void;
  classNameSwitch?: string;
  classFlexEnd?: string,
  isEdit?: boolean
}

const messageError = ({ idInput, errors, fieldArray }) => {
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

const SwitchComponent = ({
  idInput,
  errors,
  fieldArray,
  direction = EDirection.column,
  label,
  classNameLabel,
  children,
  control,
  optionsRegister,
  className,
  disabled,
  size,
  onChange,
  onClick,
  defaultValue,
  classNameSwitch,
  classFlexEnd,
  isEdit
}: ISwitch<any>): React.JSX.Element => {
  const [value, setValue] = useState(false);
  const hasEffectRun = useRef(false);

  const { field} = useController({
    name: idInput,
    control,
  });

  useEffect(() => {
    if(field.value === 1 && isEdit && !hasEffectRun.current){
      setValue(true)
      hasEffectRun.current = true;
    } 
  },[isEdit, field.value])

  useEffect(() => {
    return (() => {
      setValue(false)
      hasEffectRun.current = false;
    })
  },[])

  return (
    <div
      className={
        messageError({ idInput, errors, fieldArray })
          ? `${direction} container-icon_error`
          : direction
      }
    >
      <LabelElement
        label={label}
        idInput={idInput}
        classNameLabel={classNameLabel}
      />
      <div className={`flex-container-input ${classFlexEnd ?? ''} `}>
        <Controller
          name={idInput}
          control={control}
          rules={optionsRegister}
          defaultValue={defaultValue}
          render={({ field }) => (
            <label
              id={field.name}
              className={`toggle-control ${classNameSwitch} `}
            >
              <input
                type="checkbox"
                disabled={disabled}
                onClick={() => {
                  onClick && onClick();
                }}
                onChange={() => {
                  onChange && onChange();
                  field.onChange(!value);
                  setValue(!value);
                }}
                checked={field.value}
                className={`${className} ${
                  messageError({ idInput, errors, fieldArray })
                    ? "p-invalid"
                    : ""
                }`}
              />
              <span className={`control size-${size}`}></span>
            </label>
          )}
        />
        {messageError({ idInput, errors, fieldArray }) && (
          <MdOutlineError
            className="icon-error"
            fontSize={"22px"}
            color="#ff0000"
          />
        )}
      </div>
      {messageError({ idInput, errors, fieldArray }) && (
        <p className="error-message not-margin-padding">
          {messageError({ idInput, errors, fieldArray })}
        </p>
      )}
      {children}
    </div>
  );
};

export default SwitchComponent;
