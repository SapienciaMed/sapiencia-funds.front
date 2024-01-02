import React, { useEffect, useState } from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";

interface ISwitchProps<T> {
  idInput: string;
  onChange?: (e: InputSwitchChangeEvent) => void;
  register?: UseFormRegister<T>;
  value?: boolean;
  label?: string;
  classNameLabel?: string;
  direction?: EDirection;
  errors?: FieldErrors<any>;
  className?: string
  size?: string;
}

interface ISwitchElement<T> {
  idInput: string;
  onChange: (e: InputSwitchChangeEvent) => void;
  register?: UseFormRegister<T>;
  value?: boolean;
  className?: string
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

function SwitchElement({
    onChange,
    register,
    idInput,
    value,
    className,
}: ISwitchElement<any>): React.JSX.Element {
  const switchRegister = register ? register : () => {};
  const switchOnChange = onChange ? onChange : (e) => {};
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(value)
  }, [value]);
  return (
    <InputSwitch
        {...switchRegister}
        checked={checked}
        id={idInput}
        onChange={(e) => {
            setChecked(e.value);
            switchOnChange(e);
        }}
        className={className}
    />
  );
}

export function SwitchNewComponent({
  idInput,
  onChange = (e) => {},
  register,
  value = false,
  label,
  classNameLabel = "text-main",
  className,
  direction = EDirection.column,
  errors = {},
  size
}: ISwitchProps<any>): React.JSX.Element {
  return (
    <div
      className={
        errors[idInput]?.message
          ? `${direction} container-icon_error`
          : direction
      }
    >
      <LabelElement
        label={label}
        idInput={idInput}
        classNameLabel={classNameLabel}
      />
      <div>
        <SwitchElement register={register} idInput={idInput} value={value} onChange={onChange} className={className}/>
        {errors[idInput]?.message && <span className="icon-error"></span>}
      </div>
      {errors[idInput]?.message && (
        <p className="error-message bold not-margin-padding">
          {errors[idInput]?.message}
        </p>
      )}
    </div>
  );
}
