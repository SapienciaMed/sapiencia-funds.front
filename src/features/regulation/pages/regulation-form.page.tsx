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
    periodList,
  } = useFormRegulation(auth);
  const [view, setView] = useState(0);

  if (loading) return <></>;

  if (id && !getValues().id && listPrograms.length === 0) return <></>;

  return (
    <div>
      <div className="title-area">
        <p className="text-black text-29 ml-24px mt-20px mg-0">
          {`${updateData?.id ? "Editar" : "Crear"} reglamento`}
        </p>
      </div>
      <Tabs view={view} />

      <FormComponent id="regulationCreate" className="form-signIn">
        {view === 0 && (
          <InitialSetup
            errors={errors}
            updateData={updateData}
            periodList={periodList}
            control={control}
            getValues={getValues}
            setValue={setValue}
            watch={watch}
            toggleControl={toggleControl}
            setToggleControl={setToggleControl}
            loading={loading}
            listPrograms={listPrograms}
            onlyView={onlyView}
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
            watch={watch}
            performancePeriodErrors={performancePeriodErrors}
            accumulatedPerformanceErrors={accumulatedPerformanceErrors}
            onlyView={onlyView}
          />
        )}
      </FormComponent>
      {view === 2 && <Requirements onlyView={onlyView} />}
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
          form="form-signIn"
          action={() => onSubmitRegulationForm()}
          type="submit"
          className="button-save disabled-black padding-button"
          disabled={onlyView ? true : false}
        />
      </div>
    </div>
  );
};

export default RegulationFormPage;
