import React, { Fragment, useContext } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import BasicTableComponent from "../../../common/components/basic-table.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { IVotingSearcheResult } from "../../../common/interfaces/voting.interfaces";
import { useVotingResultsSearch } from "../hooks/voting-search.hooks";
import { EDirection } from "../../../common/constants/input.enum";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import TableComponent from "../../../common/components/table.component";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ItemResultsPage from "../pages/item.create.page";
import { Controller } from "react-hook-form";
import Svgs from "../../../../src/public/images/icons/svgs";



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
  } = useVotingResultsSearch();

  console.log("ref", tableComponentRef);
  const navigate = useNavigate();
  
  const { validateActionAccess, setMessage } = useContext(AppContext);


  const tableColumns: ITableElement<IVotingSearcheResult>[] = [
    {
      fieldName: "aimStraight",
      header: "Objetivo directo",
    },
    {
      fieldName: "productCatalogueDnp",
      header: "Producto catalogo dnp",
    },
    {
      fieldName: "codProductgueDnp",
      header: "Código catalogo dnp",
    },
    {
      fieldName: "activiti.typesProgram.name",
      header: "Programa",
    },
    {
      fieldName: "activiti.name",
      header: "Actividad",
    },
    {
      fieldName: "activiti.totalValue",
      header: "Valor Actividad",
    },
    {
      fieldName: "amount",
      header: "Cantidad",
    },
    {
      fieldName: "costTotal",
      header: "Costo Total",
    },
    {
      fieldName: "percentage123",
      header: "Porcentaje 123",
    },
    {
      fieldName: "percentage456",
      header: "Porcentaje 456",
    },
  ];

    const tableActions: ITableAction<IVotingSearcheResult>[] = [
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
              <ItemResultsPage dataVoting={row} action={"editVoting"} />
            ),
            size: "large",
            style: "mdl-agregarItem-voting",
            onClose() {
              //reset();
              setMessage({});
            },
          });
        },
        hide: !validateActionAccess("USUARIOS_EDITAR"),
      },
    ];

  return (
    <Fragment>
      <div className=" container-form-grid">
        <div className="container-form padding-form">
          <p className="text-black huge mg-0">Resultados votación</p>
          <div className="card-table-user">
            <div className="title-area">
              <label className="text-black large medium grid-span-4-columns"></label>

              <div
                className="title-button text-three large"
                onClick={() => {
                  navigate("/fondos/resultados-votacion/crear");
                }}
              >
                Crear resultado de votación <AiOutlinePlusCircle />
              </div>
            </div>

            <FormComponent
              id="createVotingForm"
              className="form-signIn"
              action={onSubmitSearchVoting}
            >
              <div className="grid-form-4-container gap-25 container-sections-forms alto-auto">
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
                        label={<>Número proyecto</>}
                      />
                    );
                  }}
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
                        label={<>Vigencia</>}
                      />
                    );
                  }}
                />

                <Controller
                  control={control}
                  name={"ideaProject"}
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
                        label={<>Idea de proyecto</>}
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
            url={`${process.env.urlApiFunds}/api/v1/voting/get-paginated`}
            columns={tableColumns}
            actions={tableActions}
            titleMessageModalNoResult="La votación no existe"
            descriptionModalNoResult="La votación no existe en el sistema. 
              Haga clic en el botón crear votación"
            isShowModal={true}
          />
          {/* <div>
            <div className="content-tbl-totales">
              <span className="content-tblt">
                <p>Totales</p>
              </span>
              <div className="content-tbltotls">
                <div className="content-tbltotlscolumn">
                  <div className="colorcontetnmin alingcent-textopciones">
                    <span>Valor de la Actividad</span>
                  </div>
                  <span className="txt-center">
                    <p>
                      {dataGrid?.map((e, i) => {
                        let value = aucumActivity;
                        if (i === 0) {
                          aucumActivity = Number(e.activityValue);
                          value = Number(e.activityValue);
                        } else {
                          value = Number(value) + Number(e.activityValue);
                          aucumActivity = value;
                        }
                        if (Number(dataGrid.length) == Number(i + 1)) {
                          return value;
                        }
                      })}
                    </p>
                  </span>
                </div>
                <div className="content-tbltotlscolumn">
                  <div className="colorcontetnmin alingcent-textopciones">
                    <span>Cantidad</span>
                  </div>
                  <span className="txt-center">
                    <p>
                      {dataGrid?.map((e, i) => {
                        let value = acumAmount;
                        if (i === 0) {
                          acumAmount = Number(e.amount);
                          value = Number(e.amount);
                        } else {
                          value = Number(value) + Number(e.amount);
                          acumAmount = value;
                        }
                        if (Number(dataGrid.length) == Number(i + 1)) {
                          return value;
                        }
                      })}
                    </p>
                  </span>
                </div>
                <div className="content-tbltotlscolumn">
                  <div className="colorcontetnmin alingcent-textopciones">
                    <span>Costo total</span>
                  </div>
                  <span className="txt-center">
                    <p>
                      {dataGrid?.map((e, i) => {
                        let value = acumTotal;
                        if (i === 0) {
                          acumTotal = Number(e.totalCost);
                          value = Number(e.totalCost);
                        } else {
                          value = Number(value) + Number(e.totalCost);
                          acumTotal = value;
                        }
                        if (Number(dataGrid.length) == Number(i + 1)) {
                          return value;
                        }
                      })}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div> */}
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
    </Fragment>
  );
};

export default React.memo(VotingResultsSearchPage);
