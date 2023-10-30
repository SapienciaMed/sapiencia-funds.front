import React, { useState } from "react";
import SwitchComponent from "../../../common/components/Form/switch.component";
import useRegulationHook from "../hooks/createUpdate";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { periods } from "../service";
import { Controller } from "react-hook-form";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form/index";
import Acordion from "../components/acordion";
import Tab from "../../../common/components/Form/tab.component";
import TableJson from "../components/tableJson";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import InitialSetup from "./modules/initialSetup";
import Tabs from "./modules/tabs";
import ForgivenessPercentages from "./modules/ForgivenessPercentages";
import Requirements from "./modules/Requirements";
import StepButtons from "./modules/stepButtons";
import Divider from "../../../common/components/Form/divider";

const Form = () => {
  const {
    control,
    errors,
    register,
    onsubmitCreate,
    goBack,
    updateData,
    loading,
    setValue,
    getValues,
    watch,
  } = useRegulationHook();
  const [view, setView] = useState(0);

  if (loading) return <></>;

  return (
    <div>
      <div className="title-area">
        <p className="text-black text-29 ml-24px mt-20px mg-0">
          Crear reglamento
        </p>
      </div>
      <Tabs view={view} />

      <FormComponent
        id="regulationCreate"
        className="form-signIn"
        action={onsubmitCreate}
      >
        {view === 0 && (
          <InitialSetup
            register={register}
            errors={errors}
            updateData={updateData}
            periods={periods}
            control={control}
            getValues={getValues}
            setValue={setValue}
            watch={watch}
          />
        )}
        {view === 1 && (
          <ForgivenessPercentages
            errors={errors}
            updateData={updateData}
            control={control}
            getValues={getValues}
            setValue={setValue}
          />
        )}
      </FormComponent>
      {view === 2 && (
        <Requirements
          errors={errors}
          updateData={updateData}
          control={control}
        />
      )}
      <StepButtons view={view} setView={setView} />
      <Divider />
      <div
        style={{ display: "flex", justifyContent: "end", marginRight: "24px" }}
      >
        <ButtonComponent
          value="Cancelar"
          type="button"
          className="button-cancel-text hover-three disabled-black padding-button"
          action={() => goBack()}
        />
        <ButtonComponent
          value="Siguiente"
          form="regulationCreate"
          type="submit"
          className="button-save disabled-black padding-button"
        />
      </div>
    </div>
  );
};

export default Form;
