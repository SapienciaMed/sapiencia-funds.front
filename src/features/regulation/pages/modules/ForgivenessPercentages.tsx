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
}) => {
  return (
    <div className="container-form p-24">
      <div>
        <Acordion
          title="¿Aplica condonación por rendimiento académico por periodo?"
          onClick={() =>
            setValue(
              "applyCondonationPerformancePeriod",
              !getValues().applyCondonationPerformancePeriod
            )
          }
          switchElement={
            <SwitchComponent
              idInput={"applyCondonationPerformancePeriod"}
              errors={errors}
              control={control}
              onChange={() => {
                setValue("performancePeriod", "");
              }}
              size="small"
              disabled={
                updateData?.applyCondonationPerformancePeriod ? true : false
              }
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest bold"
            />
          }
        >
          <div>
            <TableJson
              idInput="performancePeriod"
              setValue={setValue}
              title="Agregar promedio y porcentaje de condonación"
            />
          </div>
        </Acordion>
      </div>
      <div>
        <Acordion
          title="¿Aplica condonación por rendimiento académico final acumulado?"
          onClick={() =>
            setValue(
              "accomulatedIncomeCondonationApplies",
              !getValues().accomulatedIncomeCondonationApplies
            )
          }
          switchElement={
            <SwitchComponent
              idInput={"accomulatedIncomeCondonationApplies"}
              errors={errors}
              control={control}
              onChange={() => {
                setValue("accumulatedPerformance", "");
              }}
              size="small"
              disabled={
                updateData?.accomulatedIncomeCondonationApplies ? true : false
              }
              className="select-basic select-disabled-list input-size"
              classNameLabel="text-black biggest bold"
            />
          }
        >
          <div>
            <TableJson
              idInput="accumulatedPerformance"
              setValue={setValue}
              title="Agregar promedio y porcentaje de condonación"
            />
          </div>
        </Acordion>
      </div>
    </div>
  );
};

export default ForgivenessPercentages;
