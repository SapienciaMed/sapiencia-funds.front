import React from "react";
import { EDirection } from "../../constants/input.enum";
import { LabelComponent } from "./label.component";

import { InputNumber } from "primereact/inputnumber";
import { Control, Controller } from "react-hook-form";

interface IInputnumber<T> {
  idInput: string;
  control: Control<any>;
  className?: string;
  placeholder?: string;
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  direction?: EDirection;
  children?: React.JSX.Element | React.JSX.Element[];
  errors?: any;
  disabled?: boolean;
  fieldArray?: boolean;
  mode?: "decimal" | "currency";
  minFractionDigits?: number;
  maxFractionDigits?: number;
  prefix?: string;
  suffix?: string;
  currency?: string;
  locale?: string;
  min?: number;
  max?: number;
  optionsRegister?: {};
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

export function InputNumberComponent({
  idInput,
  control,
  className = "select-basic",
  placeholder = "00",
  label,
  classNameLabel = "text-main",
  direction = EDirection.column,
  children,
  errors = {},
  disabled,
  fieldArray,
  mode,
  minFractionDigits,
  maxFractionDigits,
  prefix,
  suffix,
  currency,
  locale,
  min,
  max,
  optionsRegister,
}: IInputnumber<any>): React.JSX.Element {
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
      <div>
        <Controller
          name={idInput}
          control={control}
          rules={optionsRegister}
          render={({ field }) => (
            <InputNumber
              id={field.name}
              onChange={(e) => field.onChange(e.value)}
              placeholder={placeholder}
              value={field.value}
              className={`${className} ${messageError() ? "p-invalid" : ""}`}
              disabled={disabled}
              mode={mode}
              minFractionDigits={minFractionDigits}
              maxFractionDigits={maxFractionDigits}
              prefix={prefix}
              suffix={suffix}
              currency={currency}
              locale={locale}
              min={min}
              max={max}
            />
          )}
        />
        {messageError() && <span className="icon-error"></span>}
      </div>
      {messageError() && (
        <p className="error-message bold not-margin-padding">
          {messageError()}
        </p>
      )}
      {children}
    </div>
  );
}
