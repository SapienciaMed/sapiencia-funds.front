import React from "react";
import Acordion from "../components/acordion";
import SwitchComponent from "../../../common/components/Form/switch.component";
import TableJson from "../components/tableJson";

const ForgivenessPercentages = ({
  errors,
  updateData,
  control,
  getValues,
  setValue,
  toggleControl,
  setToggleControl,
  onlyView,
}) => {
  return (
    <div className="container-form p-24">
      <div>
        <Acordion
          title="¿Aplica condonación por rendimiento académico por periodo?"
          isOpen={toggleControl?.applyCondonationPerformancePeriod}
          onClick={() => {
            if (onlyView) return;
            setValue(
              "applyCondonationPerformancePeriod",
              !getValues().applyCondonationPerformancePeriod
            );
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyCondonationPerformancePeriod:
                  getValues().applyCondonationPerformancePeriod,
              });
            }, 400);
            setValue("performancePeriodStructure", "");
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
                setValue("performancePeriodStructure", "");
              }}
              size="small"
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest font-500"
            />
          }
        >
          <div>
            <TableJson
              dataRead={updateData}
              idInput="performancePeriodStructure"
              isOpen={toggleControl?.applyCondonationPerformancePeriod}
              setValue={setValue}
              title="Agregar promedio y porcentaje de condonación"
              getValues={getValues}
              onlyView={onlyView}
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica condonación por rendimiento académico final acumulado?"
          isOpen={toggleControl?.applyAccomulatedIncomeCondonation}
          onClick={() => {
            if (onlyView) return;
            setValue(
              "applyAccomulatedIncomeCondonation",
              !getValues().applyAccomulatedIncomeCondonation
            );
            setTimeout(() => {
              setToggleControl({
                ...toggleControl,
                applyAccomulatedIncomeCondonation:
                  getValues().applyAccomulatedIncomeCondonation,
              });
            }, 400);
            setValue("accumulatedPerformanceDataTable", "");
          }}
          switchElement={
            <SwitchComponent
              idInput={"applyAccomulatedIncomeCondonation"}
              errors={errors}
              disabled={onlyView}
              control={control}
              onChange={() => {
                if (onlyView) return;
                setToggleControl({
                  ...toggleControl,
                  applyAccomulatedIncomeCondonation:
                    !getValues().applyAccomulatedIncomeCondonation,
                });
                setValue("accumulatedPerformanceDataTable", "");
              }}
              size="small"
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest font-500"
            />
          }
        >
          <div>
            <TableJson
              dataRead={updateData}
              isOpen={toggleControl?.applyAccomulatedIncomeCondonation}
              idInput="accumulatedPerformanceDataTable"
              setValue={setValue}
              title="Agregar promedio y porcentaje de condonación"
              getValues={getValues}
              onlyView={onlyView}
            />
          </div>
        </Acordion>
      </div>
    </div>
  );
};

export default ForgivenessPercentages;
