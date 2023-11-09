import React from "react";
import "./styles.scss";

const Acordion = ({
  title = "test",
  switchElement,
  children,
  onClick,
  isOpen = false,
  classname = "",
}) => {
  return (
    <div style={{ margin: "16px 0" }}>
      <details className="details" open={isOpen}>
        <summary onClick={onClick} className="summary">
          <div className={` text-black bold-500 text-font ${classname}`}>
            {title}
          </div>
          <div onClick={(e) => e.stopPropagation()}>{switchElement}</div>
        </summary>
        <div className="contentAcordion">{children}</div>
      </details>
    </div>
  );
};

export default Acordion;
