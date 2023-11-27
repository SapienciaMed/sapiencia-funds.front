import React from "react";

const Tab = ({ children, checked, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className={`tab tab-normal tab-${checked && "checked"}`}
    >
      <label>{children}</label>
    </div>
  );
};

export default Tab;
