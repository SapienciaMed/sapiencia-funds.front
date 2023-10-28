import React from "react";
import "./styles.scss";

const Acordion = ({
  title = "test",
  htmlFor = "test",
  switchElement,
  children,
  onClick,
}) => {
  return (
    <div>
      <details className="details">
        <summary onClick={onClick} className="summary">
          <label htmlFor={htmlFor} className={"text-black biggest bold"}>
            {title}
          </label>
          {switchElement}
        </summary>
        <div className="contentAcordion">{children}</div>
      </details>
    </div>
  );
};

export default Acordion;
