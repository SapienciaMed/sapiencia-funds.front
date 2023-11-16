import React, { useState, useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FormComponent,
  InputComponent,
  ButtonComponent,
} from "../../../common/components/Form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ResourcePrioritizationSchema } from "../../../common/schemas/voting-schema";
import { AppContext } from "../../../common/contexts/app.context";
import { formatMoney } from "../../../common/utils/helpers";
import {
  IResourcePrioritization,
  IResourcePrioritizationSearch,
} from "../../../common/interfaces/resource-prioritization.interface";
import { IGenericList } from "../../../common/interfaces/global.interface";
import useResourcePrioritizationApi from "../hooks/resource-prioritization.hook";

interface IProps {
  data: IResourcePrioritization;
  critetira: IResourcePrioritizationSearch;
  communeList: IGenericList[];
}

const ResourcePrioritizationForm = (props: IProps): JSX.Element => {
  // Servicios
  const resolver = useYupValidationResolver(ResourcePrioritizationSchema);
  const { setResourcePrioritization } = useResourcePrioritizationApi();
  const { setMessage } = useContext(AppContext);
  const form = useForm<IResourcePrioritization>({
    resolver,
    defaultValues: {
      ...props.data,
      financialPerformances:
        props.data.financialPerformances == 0
          ? null
          : props.data.financialPerformances,
      generalRate:
        props.data.generalRate == 0
          ? props.critetira.generalRate
          : props.data.generalRate,
      averageCost: props.data.averageCost == 0 ? null : props.data.averageCost,
      balanceResources:
        props.data.balanceResources == 0 ? null : props.data.balanceResources,
    },
  });

  // States
  const [loading, setLoading] = useState<boolean>(false);

  // Variables
  const formData = form.getValues();
  const watchFields = form.watch([
    "balanceResources",
    "financialPerformances",
    "averageCost",
    "generalRate",
  ]);

  // Effect que detecta los cambio en el formulario y realiza los ajustes
  useEffect(() => recalcule(), [watchFields]);

  // Metodo que ejecuta el guardado
  const onSubmit = form.handleSubmit(async (data: IResourcePrioritization) => {
    setLoading(true);

    const res = await setResourcePrioritization(data);

    setMessage({
      title: "Priorización de recursos",
      description: res.operation.message || `¡Cambios guardados exitosamente!`,
      show: true,
      OkTitle: "Aceptar",
      onOk: () => {
        setMessage({});
      },
      onClose: () => {
        setMessage({});
      },
      background: true,
    });
  });

  // Metodo que recalcula todo el recurso
  function recalcule(): void {
    const {
      operatorCommission,
      operatorCommissionAct,
      operatorCommissionBalance,
    } = props.critetira;
    const balanceResources = Number(watchFields[0] || 0);
    const financialPerformances = Number(watchFields[1] || 0);
    const averageCost = Number(watchFields[2] || 0);
    const generalRate = Number(watchFields[3] || 0);

    const data = form.getValues();

    const operatingCostAndExpense = Number(data.value) * (generalRate / 100);
    const grossValue = Number(data.value) - operatingCostAndExpense;

    const valueOperatorCommission =
      financialPerformances * (Number(operatorCommission) / 100);
    const valueOperatorCommissionBalance =
      balanceResources * (Number(operatorCommissionBalance) / 100);
    const valueOperatorCommissionAct =
      grossValue * (Number(operatorCommissionAct) / 100);

    const resourceForCredit =
      grossValue +
      financialPerformances +
      balanceResources -
      valueOperatorCommission -
      valueOperatorCommissionBalance -
      valueOperatorCommissionAct;

    form.setValue("operatingCostAndExpense", operatingCostAndExpense);
    form.setValue("grossValue", grossValue);
    form.setValue("operatorCommission", valueOperatorCommission);
    form.setValue("operatorCommissionBalance", valueOperatorCommissionBalance);
    form.setValue("operatorCommissionAct", valueOperatorCommissionAct);
    form.setValue("resourceForCredit", resourceForCredit);
  }

  return (
    <>
      <div
        className="grid-form-4-container"
        style={{
          gridGap: "0px 0px",
          margin: "20px",
        }}
      >
        <div className="app2-totals-column-content">
          <div className="column-head">Comuna ó Corregimiento</div>
          <div className="column-body">
            {
              props.communeList.find((i) => i.itemCode == formData?.communeId)
                ?.itemDescription
            }
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Estratos 123</div>
          <div className="column-body">{formatMoney(formData?.total123)}</div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Estratos 456</div>
          <div className="column-body">{formatMoney(formData?.total456)}</div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Valor</div>
          <div className="column-body">{formatMoney(formData?.value)}</div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Cupos</div>
          <div className="column-body">{formData?.places}</div>
        </div>

        <div className="app2-totals-column-content">
          <div className="column-head">Costo y gasto de operación</div>
          <div className="column-body">
            {formatMoney(formData?.operatingCostAndExpense)}
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Valor bruto</div>
          <div className="column-body">{formatMoney(formData?.grossValue)}</div>
        </div>

        <div className="app2-totals-column-content">
          <div className="column-head">Comisión operador financiero</div>
          <div className="column-body">
            {formatMoney(formData?.operatorCommission)}
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">
            Comisión operador financiero balance
          </div>
          <div className="column-body">
            {formatMoney(formData?.operatorCommissionBalance)}
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Comisión operador financiero acta</div>
          <div className="column-body">
            {formatMoney(formData?.operatorCommissionAct)}
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Recurso para credito</div>
          <div className="column-body">
            {formatMoney(formData?.resourceForCredit)}
          </div>
        </div>
      </div>

      <FormComponent
        id="createItemForm"
        className="form-signIn"
        action={onSubmit}
      >
        <div className="grid-form-4-container gap-25">
          <Controller
            control={form.control}
            name={"balanceResources"}
            render={({ field }) => {
              return (
                <InputComponent
                  idInput={field.name}
                  errors={form.formState.errors}
                  typeInput={"number"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  className="input-basic medium"
                  classNameLabel="text-black big bold text-required"
                  label={<>Recursos del balance</>}
                />
              );
            }}
          />

          <Controller
            control={form.control}
            name={"financialPerformances"}
            render={({ field }) => {
              return (
                <InputComponent
                  idInput={field.name}
                  errors={form.formState.errors}
                  typeInput={"number"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  className="input-basic medium"
                  classNameLabel="text-black big bold text-required"
                  label={<>Rendimientos financieros</>}
                />
              );
            }}
          />

          <Controller
            control={form.control}
            name={"averageCost"}
            render={({ field }) => {
              return (
                <InputComponent
                  idInput={field.name}
                  errors={form.formState.errors}
                  typeInput={"number"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  className="input-basic medium"
                  classNameLabel="text-black big bold text-required"
                  label={<>Costo Promedio</>}
                />
              );
            }}
          />

          <Controller
            control={form.control}
            name={"generalRate"}
            render={({ field }) => {
              return (
                <InputComponent
                  idInput={field.name}
                  errors={form.formState.errors}
                  typeInput={"number"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  className="input-basic medium"
                  classNameLabel="text-black big bold text-required"
                  label={<>Tasa general</>}
    
                />
              );
            }}
          />
        </div>

        <div className="button-save-container-display-users margin-right0">
          <ButtonComponent
            value="Cancelar"
            type="button"
            className="button-cancel-text large hover-three disabled-black"
            action={() => setMessage({})}
            disabled={loading}
          />
          <ButtonComponent
            form="createItemForm"
            value="Guardar"
            type="submit"
            className="button-save large disabled-black"
            disabled={loading}
          />
        </div>
      </FormComponent>
    </>
  );
};

export default React.memo(ResourcePrioritizationForm);
