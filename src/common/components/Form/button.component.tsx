import React, { SyntheticEvent } from "react";
import { ImSpinner } from "react-icons/im";

interface ILabelProps {
  value: string | React.JSX.Element;
  type?: "button" | "submit" | "reset";
  className?: string;
  action?: Function;
  id?: string;
  form?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function ButtonComponent({
  value,
  type = "submit",
  className = "button-main",
  action = () => {},
  id,
  form,
  disabled,
  loading,
}: ILabelProps): React.JSX.Element {
  const handleButtonClick = (event: SyntheticEvent) => {
    if (type !== "submit") event.preventDefault();
    action();
  };

  return (
    <button
      type={type}
      id={id}
      form={form}
      className={className}
      onClick={handleButtonClick}
      disabled={disabled || (loading || false)}
    >
      <div className="container-buttonText">
        {loading && (
          <span>
            <ImSpinner />{" "}
          </span>
        )}

        {value}
      </div>
    </button>
  );
}
