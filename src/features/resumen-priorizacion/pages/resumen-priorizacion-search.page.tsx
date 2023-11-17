import React, { Fragment, useContext } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import BasicTableComponent from "../../../common/components/basic-table.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import { IVotingSearcheResult } from "../../../common/interfaces/voting.interfaces";
import { useResumenPriorizacionSearch } from "../hooks/resumen-priorizacion-search.hooks";
import { EDirection } from "../../../common/constants/input.enum";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import TableComponent from "../../../common/components/table.component";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Controller } from "react-hook-form";
import Svgs from "../../../public/images/icons/svgs";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";

const VotingResultsSearchPage = () => {
  const {
    CancelFunction,
    onSubmitSearchVoting,
    register,
    errors,
    sending,
    tableComponentRef,
    deparmetList,
    setValCommuneNeighborhood,
    reset,
    control,
    downloadXLSX,
    sendingReportXlsx,
  } = useResumenPriorizacionSearch();

  const navigate = useNavigate();

  const { validateActionAccess, setMessage } = useContext(AppContext);

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
    <Fragment>
      <div className=" container-form-grid">
        <div className="container-form padding-form">
          <p className="text-black huge mg-0">Resumen priorización</p>
          <div className="card-table-user">
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
                        typeInput={"text"}
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

                <SelectComponent
                  idInput="communeNeighborhood"
                  control={control}
                  className="select-basic medium"
                  placeholder="Seleccionar"
                  label="Comuna y/o corregimiento "
                  data={deparmetList ? deparmetList : []}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
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
          </div>
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
            // actions={tableActions}
            titleMessageModalNoResult="No se encontraron resultados"
            descriptionModalNoResult=""
            isShowModal={true}
          />
          <div style={{ display: sendingReportXlsx ? "block" : "none" }}>
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
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(VotingResultsSearchPage);
