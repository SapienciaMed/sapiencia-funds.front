import React from "react";

const Tooltip = ({ text }) => {
  const truncate = text.slice(0, 17 - 1) + "…";

  return (
    <div className="tooltip">
      <span className="tooltiptext">{text}</span>
      <span className="truncate">{truncate}</span>
    </div>
  );
};

export default Tooltip;
