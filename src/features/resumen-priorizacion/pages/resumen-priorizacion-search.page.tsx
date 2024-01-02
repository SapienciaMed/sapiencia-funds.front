import React, { Fragment, useContext } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  MultiSelects,
  SelectComponent,
} from "../../../common/components/Form";
import { ITableElement } from "../../../common/interfaces/table.interfaces";
import { IVotingSearcheResult } from "../../../common/interfaces/voting.interfaces";
import { useResumenPriorizacionSearch } from "../hooks/resumen-priorizacion-search.hooks";
import { EDirection } from "../../../common/constants/input.enum";
import TableComponent from "../../../common/components/table.component";
import { Controller } from "react-hook-form";
import Svgs from "../../../public/images/icons/svgs";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";
import { useState } from "react";

const VotingResultsSearchPage = () => {
  const {
    onSubmitSearchVoting,
    errors,
    sending,
    tableComponentRef,
    deparmetList,
    reset,
    control,
    downloadXLSX,
  } = useResumenPriorizacionSearch();

  const [sendingReportXlsx, setSendingReportXlsx] = useState(false);

  const tableColumns: ITableElement<IVotingSearcheResult>[] = [
    {
      fieldName: "program",
      header: "Programa",
    },

    {
      fieldName: "pct123",
      header: "Porcentaje 123",
    },
    {
      fieldName: "total123",
      header: "Valor porcentaje 123",
      renderCell: (row) => {
        return <>{formaterNumberToCurrency(row.total123)}</>;
      },
    },
    {
      fieldName: "pct456",
      header: "Porcentaje 456",
    },
    {
      fieldName: "total456",
      header: "Valor porcentaje 456",
      renderCell: (row) => {
        return <>{formaterNumberToCurrency(row.total456)}</>;
      },
    },
    {
      fieldName: "quota",
      header: "Cupos",
    },
    {
      fieldName: "total",
      header: "Total",
      renderCell: (row) => {
        return <>{formaterNumberToCurrency(row.total)}</>;
      },
    },
  ];

  return (
    <div className="main-page">
      <div className="card-user">
        <div className="title-area">
          <p className="text-black huge">Resumen priorización</p>
        </div>
        <FormComponent
          id="createVotingForm"
          className="form-signIn"
          action={onSubmitSearchVoting}
        >
          <section className="funcionality-filters-container gap-15">
            <Controller
              control={control}
              name={"numberProject"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    typeInput={"number"}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                    label={
                      <>
                        Proyecto <span>*</span>
                      </>
                    }
                  />
                );
              }}
            />

            <MultiSelects
              idInput="communeNeighborhood"
              control={control}
              errors={errors}
              data={deparmetList ? deparmetList : []}
              label="Comuna y/o corregimiento"
              className={
                "select-basic medium select-disabled-list input-basic input-regular"
              }
              classNameLabel="text-black big text-required bold"
              placeholder="Seleccionar"
              filter={true}
            />

            <Controller
              control={control}
              name={"validity"}
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput={field.name}
                    errors={errors}
                    typeInput={"text"}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                    label={
                      <>
                        Vigencia<span>*</span>
                      </>
                    }
                  />
                );
              }}
            />
          </section>
        </FormComponent>
        <div className="button-save-container-display-users margin-right0">
          <ButtonComponent
            form="useQueryForm"
            value="Limpiar campos"
            type="button"
            className="button-clean-fields "
            action={() => {
              reset();
              tableComponentRef.current.emptyData();
            }}
          />
          <ButtonComponent
            form="createVotingForm"
            value="Buscar"
            type="submit"
            className="button-save large disabled-black"
            disabled={sending}
          />
        </div>

        <TableComponent
          ref={tableComponentRef}
          url={`${process.env.urlApiFunds}/api/v1/summary-priorizacion/get-paginated`}
          columns={tableColumns}
          titleMessageModalNoResult="No se encontraron resultados"
          descriptionModalNoResult=""
          isShowModal={true}
          onResult={(rows) => {
            setSendingReportXlsx(rows.length > 0);
          }}
          classSizeTable="size-table-wd-150"
          isMobil={false}
        />

        {sendingReportXlsx ? (
          <div className="button-save-container-display-users margin-right0">
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
              action={downloadXLSX}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default React.memo(VotingResultsSearchPage);
