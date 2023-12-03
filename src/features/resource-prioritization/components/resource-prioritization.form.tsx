import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormComponent,
  ButtonComponent,
} from "../../../common/components/Form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ResourcePrioritizationSchema } from "../../../common/schemas/voting-schema";
import { AppContext } from "../../../common/contexts/app.context";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";
import {
  IResourcePrioritization,
  IResourcePrioritizationSearch,
} from "../../../common/interfaces/resource-prioritization.interface";
import { IGenericList } from "../../../common/interfaces/global.interface";
import useResourcePrioritizationApi from "../hooks/resource-prioritization.hook";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";

interface IProps {
  data: IResourcePrioritization;
  critetira: IResourcePrioritizationSearch;
  communeList: IGenericList[];
  onClose: () => void;
}

interface IForm extends IResourcePrioritization {
  reload: boolean;
}

const ResourcePrioritizationForm = (props: IProps): JSX.Element => {
  // Servicios
  const resolver = useYupValidationResolver(ResourcePrioritizationSchema);
  const { setResourcePrioritization } = useResourcePrioritizationApi();
  const { setMessage } = useContext(AppContext);
  const form = useForm<IForm>({
    resolver,
    defaultValues: {
      ...props.data,
      validity: props.data.validity || null,
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
      reload: false,
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
  useEffect(() => {
    if (form.getValues()["reload"]) {
      form.setValue("reload", false);
    } else {
      recalcule();
    }
  }, [watchFields]);

  // Metodo que ejecuta el guardado
  const onSubmit = form.handleSubmit(async (data: IResourcePrioritization) => {
    setMessage({
      show: true,
      title: "Guardar",
      description: "¿Esta segur@ de guardar la información?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      async onOk() {
        setLoading(true);

        const res = await setResourcePrioritization(data);

        setMessage({
          title: "Priorización de recursos",
          description:
            res.operation.message || `¡Cambios guardados exitosamente!`,
          show: true,
          OkTitle: "Aceptar",
          onOk: () => {
            props.onClose();
            setMessage({});
          },
          onClose: () => {
            props.onClose();
            setMessage({});
          },
          background: true,
        });
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

    form.setValue("reload", true);
    form.setValue("generalRate", data.generalRate);
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
          <div className="column-head">Porcentaje 123</div>
          <div className="column-body">
            {formaterNumberToCurrency(formData?.total123)}
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Porcentaje 456</div>
          <div className="column-body">
            {formaterNumberToCurrency(formData?.total456)}
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Valor</div>
          <div className="column-body">
            {formaterNumberToCurrency(formData?.value)}
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Cupos</div>
          <div className="column-body">{formData?.places}</div>
        </div>

        <div className="app2-totals-column-content">
          <div className="column-head">Costo y gasto de operación</div>
          <div className="column-body">
            {formaterNumberToCurrency(formData?.operatingCostAndExpense)}
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Valor bruto</div>
          <div className="column-body">
            {formaterNumberToCurrency(formData?.grossValue)}
          </div>
        </div>

        <div className="app2-totals-column-content">
          <div className="column-head">Comisión operador financiero</div>
          <div className="column-body">
            {formaterNumberToCurrency(formData?.operatorCommission)}
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">
            Comisión operador financiero balance
          </div>
          <div className="column-body">
            {formaterNumberToCurrency(formData?.operatorCommissionBalance)}
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Comisión operador financiero acta</div>
          <div className="column-body">
            {formaterNumberToCurrency(formData?.operatorCommissionAct)}
          </div>
        </div>
        <div className="app2-totals-column-content">
          <div className="column-head">Recurso para crédito</div>
          <div className="column-body">
            {formaterNumberToCurrency(formData?.resourceForCredit)}
          </div>
        </div>
      </div>

      <FormComponent
        id="createItemForm"
        className="form-signIn"
        action={onSubmit}
      >
        <div className="grid-form-4-container gap-25">
          <InputNumberComponent
            idInput="balanceResources"
            control={form.control}
            label={<>Recurso del balance</>}
            errors={form.formState.errors}
            classNameLabel="text-black big bold text-required"
            className="inputNumber-basic medium "
            mode="currency"
            currency="COP"
            locale="es-CO"
            minFractionDigits={2}
            maxFractionDigits={2}
          />

          <InputNumberComponent
            idInput="financialPerformances"
            control={form.control}
            label={<>Rendimientos financieros</>}
            errors={form.formState.errors}
            classNameLabel="text-black big bold text-required"
            className="inputNumber-basic medium "
            mode="currency"
            currency="COP"
            locale="es-CO"
            minFractionDigits={2}
            maxFractionDigits={2}
          />

          <InputNumberComponent
            idInput="averageCost"
            control={form.control}
            label={<>Costo Promedio</>}
            errors={form.formState.errors}
            classNameLabel="text-black big bold text-required"
            className="inputNumber-basic medium "
            mode="currency"
            currency="COP"
            locale="es-CO"
            minFractionDigits={2}
            maxFractionDigits={2}
          />

          <InputNumberComponent
            idInput="generalRate"
            control={form.control}
            label={<>Tasa general</>}
            errors={form.formState.errors}
            classNameLabel="text-black big bold text-required"
            className="inputNumber-basic medium "
            mode="decimal"
            prefix="% "
            maxFractionDigits={2}
            max={100}
            min={0}
          />
        </div>

        <div className="button-save-container-display-users margin-right0">
          <ButtonComponent
            value="Cancelar"
            type="button"
            className="button-cancel-text large hover-three disabled-black"
            action={() =>
              setMessage({
                show: true,
                title: "Cancelar",
                description:
                  "¿Segur@ que deseas cancelar?",
                OkTitle: "Aceptar",
                cancelTitle: "Cancelar",
                onOk() {
                  setMessage({});
                },
                background: true,
              })
            }
            disabled={loading}
          />
          <ButtonComponent
            form="createItemForm"
            value="Guardar"
            type="submit"
            className="button-save large disabled-black"
            loading={loading}
          />
        </div>
      </FormComponent>
    </>
  );
};

export default React.memo(ResourcePrioritizationForm);
