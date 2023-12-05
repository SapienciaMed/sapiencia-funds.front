import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import { EDirection } from "../../../common/constants/input.enum";
import { AppContext } from "../../../common/contexts/app.context";
import TableComponent from "../../../common/components/table.component";
import { Controller, useForm } from "react-hook-form";
import Svgs from "../../../public/images/icons/svgs";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ResourcePrioritizationSearch } from "../../../common/schemas/voting-schema";
import { useRegulationApi } from "../../regulation/service";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";
import ResourcePrioritizationForm from "../components/resource-prioritization.form";
import {
  IResourcePrioritizationSearch,
  IResourcePrioritization,
} from "../../../common/interfaces/resource-prioritization.interface";
import useResourcePrioritizationApi from "../hooks/resource-prioritization.hook";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";
import { useWidth } from "../../../common/hooks/use-width";

const ResourcePrioritizationPage = (): JSX.Element => {
  // Servicios
  const { setMessage } = useContext(AppContext);
  const { getPrograms } = useRegulationApi();
  const { getListByGroupers } = useGenericListService();
  const { getResourcePrioritizationPaginate, getResourcePrioritizationExcel } =
    useResourcePrioritizationApi();
  const { width } = useWidth();
  const tableComponentRef = useRef(null);
  const resolver = useYupValidationResolver(ResourcePrioritizationSearch);
  const form = useForm<IResourcePrioritizationSearch>({
    resolver,
    mode: "all",
  });

  // States
  const [programList, setProgramList] = useState([]);
  const [communeList, setCommuneList] = useState<IGenericList[]>([]);
  const [totals, setTotals] = useState<IResourcePrioritization>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);

  // Effect que carga los listados
  useEffect(() => {
    getPrograms().then((res) => {
      if (res?.data) {
        const buildData = res.data.map((item) => {
          return {
            name: item.value,
            value: item.id.toString(),
          };
        });
        setProgramList(buildData);
      }
    });

    getListByGroupers(["COMUNA_CORREGIMIENTO"]).then((res) => {
      if (res?.operation?.code === EResponseCodes.OK) {
        setCommuneList(res.data);
      }
    });
  }, []);

  // Metodo que ejecuta la busqueda
  const onSubmitSearch = form.handleSubmit(
    (data: IResourcePrioritizationSearch) => {
      if (tableComponentRef.current) {
        setTotals(undefined);
        setSearching(true);
        tableComponentRef.current.loadData({
          ...data,
        });
      }
    }
  );

  // Metodo que ejecuta la descarga del excel
  async function downloadXLSX(): Promise<void> {
    setLoading(true);
    const values = form.getValues();
    const res = await getResourcePrioritizationExcel(values);

    if (res.operation.code == EResponseCodes.OK) {
      // Convertir la matriz de búfer a Uint8Array
      const buffer = new Uint8Array(res.data.data);
      const blob = new Blob([buffer]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Priorización de recursos.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setLoading(false);
    }
  }

  // Metodo que obtiene los totales
  function loadTotals(): void {
    const data = form.getValues();
    getResourcePrioritizationPaginate({
      programId: data.programId,
      projectNumber: data.projectNumber,
      validity: data.validity,
    }).then((res) => {
      if (res.operation.code === EResponseCodes.OK) {
        setTotals(res.data);
      } else {
        setTotals(undefined);
      }
    });
  }

  // Metodo que limpian el formulario
  function cleanForm(): void {
    setTotals(undefined);
    tableComponentRef.current.emptyData();
    form.reset();
  }

  // Definicion de la tabla
  const tableColumns: ITableElement<IResourcePrioritization>[] = [
    {
      fieldName: "communeId",
      header: "Comuna y/o corregimiento",
      renderCell: (row) => (
        <>
          {
            communeList.find((i) => i.itemCode == row.communeId)
              ?.itemDescription
          }
        </>
      ),
    },
    {
      fieldName: "total123",
      header: "Porcentaje 123",
      renderCell: (row) => <>{formaterNumberToCurrency(row.total123)}</>,
    },
    {
      fieldName: "total456",
      header: "Porcentaje 456",
      renderCell: (row) => <>{formaterNumberToCurrency(row.total456)}</>,
    },
    {
      fieldName: "value",
      header: "Valor",
      renderCell: (row) => <>{formaterNumberToCurrency(row.value)}</>,
    },
    { fieldName: "places", header: "Cupos" },
    {
      fieldName: "averageCost",
      header: " Costo promedio",
      renderCell: (row) => <>{formaterNumberToCurrency(row.averageCost)}</>,
    },
    {
      fieldName: "generalRate",
      header: "Tasa general",
      renderCell: (row) => (
        <div className="text-right">{`${row.generalRate}  %`}</div>
      ),
    },
    {
      fieldName: "operatingCostAndExpense",
      header: "Costo y gasto de operación",
      renderCell: (row) => (
        <>{formaterNumberToCurrency(row.operatingCostAndExpense)}</>
      ),
    },
    {
      fieldName: "grossValue",
      header: "Valor bruto",
      renderCell: (row) => <>{formaterNumberToCurrency(row.grossValue)}</>,
    },
    {
      fieldName: "financialPerformances",
      header: "Recurso del balance",
      renderCell: (row) => (
        <>{formaterNumberToCurrency(row.balanceResources)}</>
      ),
    },
    {
      fieldName: "balanceResources",
      header: "Rendimientos financieros",
      renderCell: (row) => (
        <>{formaterNumberToCurrency(row.financialPerformances)}</>
      ),
    },
    {
      fieldName: "operatorCommission",
      header: "Comisión operador financiero",
      renderCell: (row) => (
        <>{formaterNumberToCurrency(row.operatorCommission)}</>
      ),
    },
    {
      fieldName: "operatorCommissionBalance",
      header: "Comisión operador financiero balance",
      renderCell: (row) => (
        <>{formaterNumberToCurrency(row.operatorCommissionBalance)}</>
      ),
    },
    {
      fieldName: "operatorCommissionAct",
      header: "Comisión operador financiero acta",
      renderCell: (row) => (
        <>{formaterNumberToCurrency(row.operatorCommissionAct)}</>
      ),
    },
    {
      fieldName: "resourceForCredit",
      header: "Recurso para crédito",
      renderCell: (row) => (
        <>{formaterNumberToCurrency(row.resourceForCredit)}</>
      ),
    },
  ];
  const tableActions: ITableAction<IResourcePrioritization>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        setMessage({
          show: true,
          title: "Editar item",
          onOk() {
            setMessage({});
          },
          background: true,
          description: (
            <ResourcePrioritizationForm
              data={row}
              critetira={form.getValues()}
              communeList={communeList}
              onClose={cleanForm}
            />
          ),
          size: "large",
          style: "mdl-agregarItem-voting",
          onClose() {
            setMessage({});
          },
        });
      },
      // hide: !validateActionAccess("USUARIOS_EDITAR"),
    },
  ];

  return (
    <div className="main-page">
      <section>
          <p className="text-black huge ">Control Financiero</p>
          <div className="card-table-user">
            <div className="title-area">
              <label className="text-black large medium">
                Priorización de recurso PP
              </label>
            </div>
          </div>
      </section>

      <FormComponent
        id="useQueryForm"
        action={onSubmitSearch}
        className="card-table gap-0 mt-14px"
      >
        <div className="grid-form-4-container gap-15">
          <Controller
            control={form.control}
            name={"projectNumber"}
            render={({ field }) => {
              return (
                <InputComponent
                  idInput="projectNumber"
                  errors={form.formState.errors}
                  typeInput={"number"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  register={form.register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold text-required"
                  label={<>Número proyecto</>}
                  {...field}
                />
              );
            }}
          />
            <SelectComponent
              idInput="programId"
              control={form.control}
              className="select-basic medium select-disabled-list"
              placeholder="Seleccionar"
              label="Programa"
              data={programList}
              classNameLabel="text-black big bold text-with-colons text-required"
              direction={EDirection.column}
              errors={form.formState.errors}
            />
          <Controller
            control={form.control}
            name={"validity"}
            render={({ field }) => {
              return (
                <InputComponent
                  idInput={field.name}
                  errors={form.formState.errors}
                  typeInput={"number"}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  register={form.register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold text-required"
                  label="Vigencia"
                />
              );
            }}
          />
          <InputNumberComponent
            idInput="generalRate"
            control={form.control}
            label={<>Tasa general costos y gastos</>}
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

        <div className="grid-form-3-container gap-15 mt-14px">
          
          <InputNumberComponent
            idInput="operatorCommission"
            control={form.control}
            label={<>Comisión operador financiero</>}
            errors={form.formState.errors}
            classNameLabel="text-black big bold text-required "
            className="inputNumber-basic medium "
            mode="decimal"
            prefix="% "
            maxFractionDigits={2}
            max={100}
            min={0}
          />
          <InputNumberComponent
            idInput="operatorCommissionBalance"
            control={form.control}
            label={<>Comisión operador financiero balance</>}
            errors={form.formState.errors}
            classNameLabel="text-black big bold text-required"
            className="inputNumber-basic medium "
            mode="decimal"
            prefix="% "
            maxFractionDigits={2}
            max={100}
            min={0}
          />
          <InputNumberComponent
            idInput="operatorCommissionAct"
            control={form.control}
            label={<>Comisión operador financiero acta</>}
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

        <div className="funcionality-buttons-container">
          <ButtonComponent
            form="useQueryForm"
            value="Limpiar campos"
            type="button"
            className="button-clean-fields "
            action={cleanForm}
          />
          <ButtonComponent
            loading={searching}
            form="useQueryForm"
            value="Buscar"
            type="submit"
            className="button-save large disabled-black"
          />
        </div>
      </FormComponent>

      <div className="mt-14px">
        <TableComponent
          ref={tableComponentRef}
          url={`${process.env.urlApiFunds}/api/v1/resource-prioritization/get-paginated/`}
          columns={tableColumns}
          actions={tableActions}
          titleMessageModalNoResult="Datos no localizados"
          descriptionModalNoResult="No se encontraron coincidencias con los datos ingresados."
          isShowModal={true}
          onResult={(rows) => {
            setSearching(false);
            if (rows.length > 0) loadTotals();
          }}
        />
      </div>

      {totals && (
        <div>
          <p className="text-black huge ">Totales</p>

          <div
            className="grid-form-6-container"
            style={{
              gridGap: "0px 0px",
              margin: "20px",
            }}
          >
            <div className="app2-totals-column-content">
              <div className="column-head">Valor</div>
              <div className="column-body">
                {formaterNumberToCurrency(totals.value)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Cupos</div>
              <div className="column-body">{totals.places}</div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Costo promedio</div>
              <div className="column-body">
                {formaterNumberToCurrency(totals.averageCost)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Tasa general</div>
              <div className="column-body">
                {`${totals.generalRate} %`} 
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Costo y gasto de operación</div>
              <div className="column-body">
                {formaterNumberToCurrency(totals.operatingCostAndExpense)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Total bruto</div>
              <div className="column-body">
                {formaterNumberToCurrency(totals.grossValue)}
              </div>
            </div>

            <div className="app2-totals-column-content">
              <div className="column-head">Recurso del balance</div>
              <div className="column-body">
                {formaterNumberToCurrency(totals.balanceResources)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Rendimientos financieros</div>
              <div className="column-body">
                {formaterNumberToCurrency(totals.financialPerformances)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Comisión operador financiero</div>
              <div className="column-body">
                {formaterNumberToCurrency(totals.operatorCommission)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">
                Comisión operador financiero balance
              </div>
              <div className="column-body">
                {formaterNumberToCurrency(totals.operatorCommissionBalance)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">
                Comisión operador financiero acta
              </div>
              <div className="column-body">
                {formaterNumberToCurrency(totals.operatorCommissionAct)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Recurso para crédito</div>
              <div className="column-body">
                {formaterNumberToCurrency(totals.resourceForCredit)}
              </div>
            </div>
          </div>

          <div className="button-save-container-display-users margin-right0">
            <ButtonComponent
              loading={loading}
              value={
                <>
                  <span>Descargar</span>
                  <Svgs svg="excel" width={23.593} height={28.505} />
                </>
              }
              className="button-download large "
              action={downloadXLSX}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default React.memo(ResourcePrioritizationPage);
