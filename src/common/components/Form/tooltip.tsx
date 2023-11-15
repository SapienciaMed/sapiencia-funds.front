import React from "react";

const Tooltip = ({ text }) => {
  const truncate = text.slice(0, 16 - 1) + "…";

  return (
    <div style={{ width: "100%" }} className="tooltip">
      <p className="tooltiptext">{text}</p>
      <p className="truncate">{truncate}</p>
    </div>
  );
};

export default Tooltip;
