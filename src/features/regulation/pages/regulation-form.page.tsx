import { useState } from "react";
import useFormRegulation from "../hooks/regulation-form.hook";
import {
  ButtonComponent,
  FormComponent,
} from "../../../common/components/Form/index";
import InitialSetup from "../modules/initialSetup";
import Tabs from "../modules/tabs";
import ForgivenessPercentages from "../modules/ForgivenessPercentages";
import Requirements from "../modules/requeriments/Requirements";
import StepButtons from "../modules/stepButtons";
import Divider from "../../../common/components/Form/divider";

const RegulationFormPage = ({ auth }) => {
  const {
    control,
    errors,
    onSubmitRegulationForm,
    goBack,
    updateData,
    loading,
    setValue,
    getValues,
    watch,
    toggleControl,
    setToggleControl,
    performancePeriodErrors,
    accumulatedPerformanceErrors,
    id,
    listPrograms,
    onlyView,
    arrayPeriod,
  } = useFormRegulation(auth);
  const [view, setView] = useState(0);

  if (id && !getValues().id && listPrograms.length === 0) return <></>;

  return (
    <div>
      <div className="title-area">
        <p className="text-black text-29 ml-24px mt-20px mg-0">
          {`${updateData?.id ? "Editar" : "Crear"} reglamento`}
        </p>
      </div>
      <Tabs view={view} />

      <FormComponent id="regulationCreate" className="form-signIn" action={onSubmitRegulationForm}>
        {view === 0 && (
          <InitialSetup
            errors={errors}
            updateData={updateData}
            periodList={arrayPeriod}
            control={control}
            getValues={getValues}
            setValue={setValue}
            watch={watch}
            toggleControl={toggleControl}
            setToggleControl={setToggleControl}
            listPrograms={listPrograms}
            onlyView={onlyView == '1'} // Esta haciendo algo?
          />
        )}
        {view === 1 && (
          <ForgivenessPercentages
            errors={errors}
            updateData={updateData}
            control={control}
            getValues={getValues}
            setValue={setValue}
            toggleControl={toggleControl}
            setToggleControl={setToggleControl}
            onlyView={onlyView}
          />
        )}
      </FormComponent>
      {view === 2 && (
        <Requirements 
          errors={errors}
          updateData={updateData}
          control={control}
          getValues={getValues}
          setValue={setValue}
        />
      )}
      <StepButtons view={view} setView={setView} />
      <Divider />
      <div className="buttonsActions">
        <ButtonComponent
          value="Cancelar"
          type="button"
          className="button-save disabled-black padding-button btn-back"
          action={() => goBack()}
        />
        <ButtonComponent
          value="Guardar"
          form="regulationCreate"
          type="submit"
          className="button-save disabled-black padding-button"
          disabled={onlyView ? true : false}
        />
      </div>
    </div>
  );
};

export default RegulationFormPage;
