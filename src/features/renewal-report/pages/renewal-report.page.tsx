import React, { Fragment, useContext, useState } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import useRenewaReportSearch from "../hooks/renewal-report.hook";
import TableComponent from "../../../common/components/table.component";
import Svgs from "../../../public/images/icons/svgs";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { ICallRenewal } from "../../../common/interfaces/funds.interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import BasicTableComponent from "../../../common/components/basic-table.component";
import { Controller, UseFormGetValues } from 'react-hook-form';
import ItemsEditePage from "./items-edit.page";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";

const SearchRenewalReportPage = (): React.JSX.Element => {
  const { setMessage } = useContext(AppContext);

  const {
    control, errors, watch, register, setValue, navigate, tableComponentRef, showTable,
    setShowTable, onSubmit, reset, announcementList, dataGridRenewal, searchRenewal, downloadCollection,
    totalEnabled, totalrenewed, averagePercentage, enabledBachLeg, renewedBachLeg, setdataGridRenewal,
    percentageBachLeg, setInputEnabledBachLeg, inputEnabledBachLeg, onsubmitCreate, selectedperiodo,
    loadTableData, totalRenewed, porcentageProm, porcentageLegal, totalRenewedBeca
  } = useRenewaReportSearch();


  const tableColumnsRenewal: ITableElement<ICallRenewal>[] = [
    {
      fieldName: "fund",
      header: "Fondo",
    },
    {
      fieldName: "enabled",
      header: "Nro habilitados"
    },
    {
      fieldName: "renewed",
      header: "Nro renovados",
    },
    {
      fieldName: "percentage",
      header: "Porcentaje",
      renderCell: (row) => {
        return <>{row.percentage}%</>;
      }
    },

  ];

  const tableActionsRenewal: ITableAction<ICallRenewal>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        const dataEditTable: ICallRenewal = {
          fund: row.fund,
          enabled: row.enabled,
          renewed: row.renewed,
          percentage: row.percentage
        }
        setMessage({
          show: true,
          title: "Editar ítem",
          description: <ItemsEditePage renewal={dataEditTable} renewalitem={row} selectedperiodo={selectedperiodo} loadTableData={loadTableData} />,
          background: true,
          size: "items",
          items: true,
          onOk() {
            setMessage({});
          },
        });
      },
    },

  ];


  return (
    <Fragment>
      <div className="main-page">
        <div className="title-area">
          <label className="text-black extra-large medium">
            Visualizar informe renovación
          </label>
        </div>

        <div className="container-sections-forms">
          <FormComponent
            id="searchRenewal"
            className="form-signIn"
            action={onSubmit}
          >
            <div>
              <div className="grid-form-4-container mb-24px">

                <SelectComponent
                  idInput={"period"}
                  control={control}
                  errors={errors}
                  data={announcementList}
                  label={<>Convocatoria <span>*</span></>}
                  className={"select-basic medium select-disabled-list input-basic input-regular"}
                  classNameLabel="text-black big medium label-regular"
                  filter={true}
                  placeholder="Seleccione."
                />
              </div>
            </div>
            <div className="button-save-container-display m-top-20">
              <ButtonComponent
                form="searchBudget"
                value={"Limpiar campos"}
                className="button-clean medium"
                type="button"
                action={() => {
                  reset();
                  tableComponentRef.current.emptyData();
                  setShowTable(false)
                }
                }
              />
              <ButtonComponent
                form="searchRenewal"
                value={`Buscar`}
                action={() => {
                  // Limpiar dataGridRenewal cuando cambie la convocatoria
                  setdataGridRenewal([]);
                  searchRenewal();
                }}
                className="button-save large hover-three disabled-black"
              />
            </div>
          </FormComponent>
        </div>

        <div>

          {
            showTable &&

            <div>

              <div className="container-sections-forms">
                <TableComponent
                  ref={tableComponentRef}
                  url={`${process.env.urlApiFunds}/api/v1/renovacion/getrenewal-paginated/`}
                  columns={tableColumnsRenewal}
                  actions={tableActionsRenewal}
                  titleMessageModalNoResult="Buscar"
                  princialTitle="Informe legalización"
                  isShowModal={true}
                  descriptionModalNoResult="No se encontraron resultados que coincidan con tu búsqueda. Por favor, intenta con otros criterios."
                />
              </div>


              <div className="container-sections-forms">
                <div className="title-area">
                  <label className="text-black large medium grid-span-4-columns">Totales</label>
                </div>
                <div className="grid-form-3-container mb-24px">
                  <InputComponent
                    register={control.register}
                    idInput="totalEnabled"
                    className="input-basic medium"
                    typeInput="text"
                    label="Nro habilitados"
                    classNameLabel="text-black"
                    errors={errors}
                    disabled={true}
                    value={totalEnabled}
                  />
                  <InputComponent
                    register={control.register}
                    idInput="totalrenewed"
                    className="input-basic medium"
                    typeInput="text"
                    label="Nro renovados"
                    classNameLabel="text-black"
                    errors={errors}
                    disabled={true}
                    value={totalRenewed}
                  />
                  <InputComponent
                    register={control.register}
                    idInput="totalpercentage"
                    className="input-basic medium"
                    typeInput="text"
                    label="Porcentaje"
                    classNameLabel="text-black"
                    errors={errors}
                    disabled={true}
                    value={porcentageProm}
                  />
                </div>
              </div>

              <div className="container-sections-forms">
                <div className="title-area">
                  <label className="text-black large medium grid-span-4-columns">
                    Beca mejores bachilleres legalizados</label>
                </div>

                <FormComponent id="save" className="form-signIn" action={onsubmitCreate}>
                  <div className="grid-form-3-container mb-24px">

                    <Controller
                      control={control}
                      name={"enabledBachLeg"}
                      render={({ field }) => {
                        return (
                          <InputNumberComponent
                            control={control}
                            idInput={`enabledBachLeg`}
                            label="Nro habilitados"
                            className="inputNumber-basic medium"
                            classNameLabel="text-black big text-required"
                            errors={errors}
                            {...field}
                          />
                        );
                      }}
                    />

                    <InputComponent
                      register={control.register}
                      idInput="renewedBachLeg"
                      className="input-basic medium"
                      typeInput="text"
                      label="Nro renovados"
                      classNameLabel="text-black"
                      errors={errors}
                      disabled={true}
                      value={totalRenewedBeca}
                    />
                    <InputComponent
                      register={control.register}
                      idInput="PercentageBachLeg"
                      className="input-basic medium"
                      typeInput="text"
                      label="Porcentaje"
                      classNameLabel="text-black"
                      errors={errors}
                      disabled={true}
                      value={porcentageLegal}
                    />
                  </div>
                </FormComponent>


              </div>


              <div>
                <div className="button-save-container-display mr-24px">
                </div>


                <ButtonComponent
                  value={
                    <>
                      <div className="container-buttonText">
                        <span>Descargar</span>
                        <Svgs svg="excel" width={23.593} height={28.505} />
                      </div>
                    </>
                  }
                  className="button-download large "
                  action={downloadCollection}
                />

              </div>

              <div className="button-save-container-display m-top-20">
                <ButtonComponent
                  value={`Guardar`}
                  className="button-save large hover-three disabled-black"
                  action={() => {
                    onsubmitCreate();
                  }
                  }
                />
              </div>
            </div>

          }
        </div>
      </div>

    </Fragment>
  );

};


export default React.memo(SearchRenewalReportPage);