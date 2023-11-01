import React from "react";
import "./styles.scss";

const Acordion = ({
  title = "test",
  switchElement,
  children,
  onClick,
  isOpen = false,
}) => {
  return (
    <div style={{ margin: "16px 0" }}>
      <details className="details">
        <summary onClick={onClick} className="summary">
          <div className={"text-black biggest bold"}>{title}</div>
          {switchElement}
        </summary>
        <div className="contentAcordion">{children}</div>
      </details>
    </div>
  );
};

export default Acordion;
