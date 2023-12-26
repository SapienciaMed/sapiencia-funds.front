import React from "react";
import Acordion from "../components/acordion";
import SwitchComponent from "../../../common/components/Form/switch.component";
import TableJson from "../components/tableJson";
import { IPerformanceStructure } from "../../../common/interfaces/regulation";

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
  onlyView,
}) => {
  return (
    <div className="container-form p-24">
      <div>
        <Acordion
          title="¿Aplica condonación por rendimiento académico por periodo?"
          isOpen={toggleControl?.applyCondonationPerformancePeriod}
          onClick={async () => {
            if (onlyView) return;
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
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyCondonationPerformancePeriod:
                    !getValues().applyCondonationPerformancePeriod,
                });
                setValue("performancePeriod", "");
              }}
              size="small"
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest font-500"
            />
          }
        >
          <div>
            <TableJson
              dataRead={[] as any}
              idInput="performancePeriod"
              isOpen={toggleControl?.applyCondonationPerformancePeriod}
              setValue={setValue}
              title="Agregar promedio y porcentaje de condonación"
              getValues={getValues}
              error={performancePeriodErrors}
              onlyView={onlyView}
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica condonación por rendimiento académico final acumulado?"
          isOpen={toggleControl?.applyAccomulatedIncomeCondonation}
          onClick={async () => {
            if (onlyView) return;
            setValue(
              "applyAccomulatedIncomeCondonation",
              !getValues().applyAccomulatedIncomeCondonation
            );
            await setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyAccomulatedIncomeCondonation:
                  getValues().applyAccomulatedIncomeCondonation,
              });
            }, 400);
            setValue("accumulatedPerformance", "");
          }}
          switchElement={
            <SwitchComponent
              idInput={"applyAccomulatedIncomeCondonation"}
              errors={errors}
              disabled={onlyView ? true : false}
              control={control}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyAccomulatedIncomeCondonation:
                    !getValues().applyAccomulatedIncomeCondonation,
                });
                setValue("accumulatedPerformance", "");
              }}
              size="small"
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest font-500"
            />
          }
        >
          <div>
            <TableJson
              dataRead={[] as any}
              isOpen={toggleControl?.applyAccomulatedIncomeCondonation}
              idInput="accumulatedPerformance"
              setValue={setValue}
              title="Agregar promedio y porcentaje de condonación"
              getValues={getValues}
              error={accumulatedPerformanceErrors}
              onlyView={onlyView}
            />
          </div>
        </Acordion>
      </div>
    </div>
  );
};

export default ForgivenessPercentages;
