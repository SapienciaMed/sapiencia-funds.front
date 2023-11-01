import React from "react";
import SwitchComponent from "../../../common/components/Form/switch.component";
import { FormComponent } from "../../../common/components/Form";

const Regulation = () => {
  return (
    <div>
      <div className="title-area">
        <p className="text-black text-29 ml-24px mt-20px mg-0">
          Crear reglamento
        </p>
      </div>
      <div>tabs botones</div>
      <div className="container-form">
        <FormComponent
          id="socializationSearch"
          className="form-signIn"
          action={() => console.log("first")}
        >
          <div>inpur</div>
          <div>
            <div>input</div>
            <div>switch</div>
            <div>input</div>
          </div>
        </FormComponent>
      </div>
    </div>
  );
};

export default Regulation;
