import React from "react";
import "./styles.scss";
import { IoIosArrowDown } from "react-icons/io";

interface IAcordion {
  title?: string;
  switchElement?: any;
  children?: any;
  onClick?: () => void;
  isOpen?: boolean;
  classname?: string;
  onlyView?: boolean;
  iconRow?: boolean;
}

const Acordion = ({
  title = "test",
  switchElement,
  children,
  onClick,
  isOpen = false,
  classname = "",
  onlyView = false,
  iconRow = false
}: IAcordion) => {
  return (
    <div style={{ margin: "16px 0" }}>
      <details className="details" open={isOpen}>
        <summary
          onClick={() => onClick?.()}
          className={onlyView ? "onlyView" : "summary"}
        >
          <div className={` text-black bold-500 text-font ${classname}`}>
            {iconRow && <IoIosArrowDown/>} {title}
          </div>
          <div onClick={(e) => e.stopPropagation()}>{switchElement}</div>
        </summary>
        <div className="contentAcordion">{children}</div>
      </details>
    </div>
  );
};

export default Acordion;
