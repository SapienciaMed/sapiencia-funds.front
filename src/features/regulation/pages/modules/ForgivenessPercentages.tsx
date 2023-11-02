import React from "react";
import Acordion from "../../components/acordion";
import SwitchComponent from "../../../../common/components/Form/switch.component";
import TableJson from "../../components/tableJson";

const ForgivenessPercentages = ({
  errors,
  updateData,
  control,
  getValues,
  setValue,
  toggleControl,
  setToggleControl,
  watch,
  performancePeriodErrors,
  accumulatedPerformanceErrors,
}) => {
  return (
    <div className="container-form p-24">
      <div>
        <Acordion
          title="¿Aplica condonación por rendimiento académico por periodo?"
          isOpen={toggleControl?.applyCondonationPerformancePeriod}
          onClick={async () => {
            setValue(
              "applyCondonationPerformancePeriod",
              !getValues().applyCondonationPerformancePeriod
            );
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyCondonationPerformancePeriod:
                  getValues().applyCondonationPerformancePeriod,
              });
            }, 400);
            setValue("performancePeriod", "");
          }}
          switchElement={
            <SwitchComponent
              idInput={"applyCondonationPerformancePeriod"}
              errors={errors}
              control={control}
              onChange={() => {
                setToggleControl({
                  ...toggleControl,
                  applyCondonationPerformancePeriod:
                    !getValues().applyCondonationPerformancePeriod,
                });
                setValue("performancePeriod", "");
              }}
              size="small"
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest bold"
            />
          }
        >
          <div>
            <TableJson
              idInput="performancePeriod"
              isOpen={toggleControl?.applyCondonationPerformancePeriod}
              setValue={setValue}
              title="Agregar promedio y porcentaje de condonación"
              getValues={getValues}
              error={performancePeriodErrors}
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica condonación por rendimiento académico final acumulado?"
          isOpen={toggleControl?.accomulatedIncomeCondonationApplies}
          onClick={async () => {
            setValue(
              "accomulatedIncomeCondonationApplies",
              !getValues().accomulatedIncomeCondonationApplies
            );
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                accomulatedIncomeCondonationApplies:
                  getValues().accomulatedIncomeCondonationApplies,
              });
            }, 400);
            setValue("accumulatedPerformance", "");
          }}
          switchElement={
            <SwitchComponent
              idInput={"accomulatedIncomeCondonationApplies"}
              errors={errors}
              control={control}
              onChange={() => {
                setToggleControl({
                  ...toggleControl,
                  accomulatedIncomeCondonationApplies:
                    !getValues().accomulatedIncomeCondonationApplies,
                });
                setValue("accumulatedPerformance", "");
              }}
              size="small"
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest bold"
            />
          }
        >
          <div>
            <TableJson
              isOpen={toggleControl?.accomulatedIncomeCondonationApplies}
              idInput="accumulatedPerformance"
              setValue={setValue}
              title="Agregar promedio y porcentaje de condonación"
              getValues={getValues}
              error={accumulatedPerformanceErrors}
            />
          </div>
        </Acordion>
      </div>
    </div>
  );
};

export default ForgivenessPercentages;
