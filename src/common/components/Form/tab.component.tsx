import React from "react";

const Tab = ({ children, checked }) => {
  return (
    <div className={`tab tab-normal tab-${checked && "checked"}`}>
      <label>{children}</label>
    </div>
  );
};

export default Tab;
