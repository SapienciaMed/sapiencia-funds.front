import React from "react";
import { ButtonComponent } from "../../../../common/components/Form";

const StepButtons = ({ view, setView }) => {
  return (
    <div className="containerButtons">
      {view > 0 && (
        <ButtonComponent
          value="Anterior"
          type="button"
          className="button-cancel-text hover-three disabled-black padding-button"
          action={() => setView(view - 1)}
        />
      )}

      {view < 2 && (
        <ButtonComponent
          value="Siguiente"
          action={() => setView(view + 1)}
          className="button-save disabled-black padding-button"
        />
      )}
    </div>
  );
};

export default StepButtons;
