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
import { formatMoney } from "../../../common/utils/helpers";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";
import ResourcePrioritizationForm from "../components/resource-prioritization.form";
import {
  IResourcePrioritizationSearch,
  IResourcePrioritization,
} from "../../../common/interfaces/resource-prioritization.interface";
import useResourcePrioritizationApi from "../hooks/resource-prioritization.hook";

const ResourcePrioritizationPage = (): JSX.Element => {
  // Servicios
  const { setMessage, validateActionAccess } = useContext(AppContext);
  const { getPrograms } = useRegulationApi();
  const { getListByGroupers } = useGenericListService();
  const { getResourcePrioritizationPaginate } = useResourcePrioritizationApi();
  const tableComponentRef = useRef(null);
  const resolver = useYupValidationResolver(ResourcePrioritizationSearch);
  const form = useForm<IResourcePrioritizationSearch>({ resolver });

  // States
  const [programList, setProgramList] = useState([]);
  const [communeList, setCommuneList] = useState<IGenericList[]>([]);
  const [totals, setTotals] = useState<IResourcePrioritization>();

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
        tableComponentRef.current.loadData({
          ...data,
        });
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
    }
  );

  // Metodo que ejecuta la descarga del excel
  const downloadXLSX = () => {};

  // Definicion de la tabla
  const tableColumns: ITableElement<IResourcePrioritization>[] = [
    {
      fieldName: "communeId",
      header: "Comuna / Corregimiento",
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
      header: "Estratos 123",
      renderCell: (row) => <>{formatMoney(row.total123)}</>,
    },
    {
      fieldName: "total456",
      header: "Estratos 456",
      renderCell: (row) => <>{formatMoney(row.total456)}</>,
    },
    {
      fieldName: "value",
      header: "Valor",
      renderCell: (row) => <>{formatMoney(row.value)}</>,
    },
    { fieldName: "places", header: "Cupos" },
    { fieldName: "averageCost", header: " Costo promedio" },
    { fieldName: "generalRate", header: "Tasa general" },
    {
      fieldName: "operatingCostAndExpense",
      header: "Costo y gasto de operación",
    },
    {
      fieldName: "grossValue",
      header: "Valor bruto",
      renderCell: (row) => <>{formatMoney(row.grossValue)}</>,
    },
    { fieldName: "financialPerformances", header: "Recurso del balance" },
    { fieldName: "balanceResources", header: "Rendimientos financieros" },
    {
      fieldName: "operatorCommissionAct",
      header: "Comisión operador financiero acta",
    },
    {
      fieldName: "operatorCommissionBalance",
      header: "Comisión operador financiero balance",
    },
    { fieldName: "operatorCommission", header: "Comisión operador financiero" },
    {
      fieldName: "resourceForCredit",
      header: "Recurso para crédito",
      renderCell: (row) => <>{formatMoney(row.resourceForCredit)}</>,
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
            <>
              <ResourcePrioritizationForm
                data={row}
                critetira={form.getValues()}
                communeList={communeList}
              />
            </>
          ),
          size: "large",
          style: "mdl-agregarItem-voting",
          onClose() {
            setMessage({});
          },
        });
      },
      hide: !validateActionAccess("USUARIOS_EDITAR"),
    },
  ];

  return (
    <div className=" container-form-grid">
      <div className="container-form padding-form">
        <p className="text-black huge mg-0">Control Financiero</p>
        <div className="card-table-user">
          <div className="title-area">
            <label className="text-black large medium mg-0">
              Priorización de recurso PP
            </label>
          </div>

          <FormComponent
            id="useQueryForm"
            className="form-signIn"
            action={onSubmitSearch}
          >
            <div className="grid-form-4-container gap-25 container-sections-forms alto-auto">
              <Controller
                control={form.control}
                name={"projectNumber"}
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
                      label={<>Número proyecto</>}
                    />
                  );
                }}
              />

              <div className="grid-span-2-columns">
                <SelectComponent
                  idInput="programId"
                  control={form.control}
                  className="select-basic medium "
                  placeholder="Seleccionar"
                  label="Programa"
                  data={programList}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={form.formState.errors}
                />
              </div>
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
                      className="input-basic medium"
                      classNameLabel="text-black big bold text-required"
                      label={<>Vigencia</>}
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
                      label={<>Tasa general costos y gastos</>}
                    />
                  );
                }}
              />

              <Controller
                control={form.control}
                name={"operatorCommissionAct"}
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
                      label={<>Comisión operador financiero acta</>}
                    />
                  );
                }}
              />

              <Controller
                control={form.control}
                name={"operatorCommissionBalance"}
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
                      label={<>Comisión operador financiero balance</>}
                    />
                  );
                }}
              />

              <Controller
                control={form.control}
                name={"operatorCommission"}
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
                      label={<>Comisión operador financiero</>}
                    />
                  );
                }}
              />
            </div>
          </FormComponent>
        </div>
        <div className="button-save-container-display-users margin-right0">
          <ButtonComponent
            form="useQueryForm"
            value="Limpiar campos"
            type="button"
            className="button-clean-fields "
            action={() => {
              form.reset();
              tableComponentRef.current.emptyData();
            }}
          />
          <ButtonComponent
            form="useQueryForm"
            value="Buscar"
            type="submit"
            className="button-save large disabled-black"
          />
        </div>
        <TableComponent
          ref={tableComponentRef}
          url={`${process.env.urlApiFunds}/api/v1/resource-prioritization/get-paginated/`}
          columns={tableColumns}
          actions={tableActions}
          titleMessageModalNoResult="Datos no localizados"
          descriptionModalNoResult="No se encontraron coincidenas con los datos ingresados."
          isShowModal={true}
        />
      </div>
      {totals && (
        <>
          <p className="text-black huge mg-0">Totales</p>

          <div
            className="grid-form-6-container"
            style={{
              gridGap: "0px 0px",
              margin: "20px",
            }}
          >
            <div className="app2-totals-column-content">
              <div className="column-head">Valor</div>
              <div className="column-body">{formatMoney(totals.value)}</div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Cupos</div>
              <div className="column-body">{totals.places}</div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Costo promedio</div>
              <div className="column-body">
                {formatMoney(totals.averageCost)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Tasa general</div>
              <div className="column-body">
                {formatMoney(totals.generalRate)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Costo y gasto de operación</div>
              <div className="column-body">
                {formatMoney(totals.operatingCostAndExpense)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Total bruto</div>
              <div className="column-body">
                {formatMoney(totals.grossValue)}
              </div>
            </div>

            <div className="app2-totals-column-content">
              <div className="column-head">Recurso del balance</div>
              <div className="column-body">
                {formatMoney(totals.balanceResources)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Rendimiento financieros</div>
              <div className="column-body">
                {formatMoney(totals.financialPerformances)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Comisión operador financiero</div>
              <div className="column-body">
                {formatMoney(totals.operatorCommission)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">
                Comisión operador financiero balance
              </div>
              <div className="column-body">
                {formatMoney(totals.operatorCommissionBalance)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">
                Comisión operador financiero acta
              </div>
              <div className="column-body">
                {formatMoney(totals.operatorCommissionAct)}
              </div>
            </div>
            <div className="app2-totals-column-content">
              <div className="column-head">Recurso para crédito</div>
              <div className="column-body">
                {formatMoney(totals.resourceForCredit)}
              </div>
            </div>
          </div>

          <div className="button-save-container-display-users margin-right0">
            <ButtonComponent
              value={
                <div className="container-buttonText">
                  <span>Descargar</span>
                  <Svgs svg="excel" width={23.593} height={28.505} />
                </div>
              }
              className="button-download large "
              action={downloadXLSX}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(ResourcePrioritizationPage);
