import React, { Fragment, useContext, useEffect } from "react";
import { useVotingResults } from "../hooks/voting-create.hooks";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import BasicTableComponent from "../../../common/components/basic-table.component";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import { IVotingSearcheResult } from "../../../common/interfaces/voting.interfaces";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import ItemResultsPage from "../pages/item.create.page";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { Controller } from "react-hook-form";

const VotingResultsPage = () => {
  const {
    CancelFunction,
    onSubmitCreateVoting,
    register,
    errors,
    sending,
    deparmetList,
    addItem,
    tableComponentRef,
    dataGrid,
    amountTotal,
    totalValueActivity,
    totalValueOne,
    control,
    settotalValueOne,
    settotalValueActivity,
    setAmountTotal,
  } = useVotingResults();

  const navigate = useNavigate();
  const { validateActionAccess, setMessage } = useContext(AppContext);
  let aucumActivity = 0;
  let acumTotal = 0;
  let acumAmount = 0;

  const tableColumns: ITableElement<IVotingSearcheResult>[] = [
    {
      fieldName: "directObject",
      header: "Objetivo directo",
    },
    {
      fieldName: "productCatalog",
      header: "Producto catalogo dnp",
    },
    {
      fieldName: "productCode",
      header: "Código catalogo dnp",
    },
    {
      fieldName: "program",
      header: "Programa",
    },
    {
      fieldName: "activity",
      header: "Actividad",
    },
    {
      fieldName: "activityValue",
      header: "Valor Actividad",
    },
    {
      fieldName: "amount",
      header: "Cantidad",
    },
    {
      fieldName: "totalCost",
      header: "Costo Total",
    },
    {
      fieldName: "porcentaje123",
      header: "Porcentaje 123",
    },
    {
      fieldName: "porcentaje456",
      header: "Porcentaje 456",
    },
    // {
    //   fieldName: "profile",
    //   header: "",
    // },
  ];

  const tableActions: ITableAction<IVotingSearcheResult>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        console.log("row ", row);
        // navigate(`/core/usuarios/editar/${row.id}`);
        setMessage({
          show: true,
          title: "Editar item",
          // OkTitle: "Aceptar",
          // cancelTitle: "Cancelar",
          onOk() {
            setMessage({});
          },
          background: true,
          description: <ItemResultsPage dataVoting={row} action={"edit"} />,
          size: "large",
          style: "mdl-agregarItem-voting",
        });
      },
      hide: !validateActionAccess("USUARIOS_EDITAR"),
    },
    {
      icon: "Delete",
      onClick: (row) => {
        console.log("row ", row);
          setMessage({
            show: true,
            title: "Eliminar registro",
            description: "Estás segur@ de eliminar este registro?",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            async onOk() {
              if (dataGrid.find((obj) => obj.ident == row.ident)) {
                const position = dataGrid.findIndex(
                  (obj) => obj.ident === row.ident
                );
                dataGrid.splice(position, 1);
                
                setMessage({
                  OkTitle: "Aceptar",
                  description: "Eliminado exitosamente",
                  title: "Eliminar item",
                  show: true,
                  type: EResponseCodes.OK,
                  background: true,
                  onOk() {
                    setMessage({});
                  },
                  onClose() {
                    setMessage({});
                  },
                });
              }
            },
            background: true,
          });
      },
      hide: !validateActionAccess("USUARIOS_ELIMINAR"),
    },
  ];

  return (
    <Fragment>
      <div className=" container-form-grid">
        <div className="container-form padding-form">
          <p className="text-black huge mg-0">Resultados votación</p>
          <div>
            <FormComponent
              id="createVotingForm"
              className="form-signIn"
              action={onSubmitCreateVoting}
            >
              <div className="grid-form-4-container gap-25 container-sections-forms alto-auto">
                <SelectComponent
                  idInput="communeNeighborhood"
                  control={control}
                  className={
                    "select-basic medium select-disabled-list input-basic input-regular"
                  }
                  placeholder="Seleccionar"
                  label="Comuna y/o corregimiento "
                  data={deparmetList ? deparmetList : []}
                  // classNameLabel="text-black big "
                  classNameLabel="text-black big text-required bold medium label-regular"
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

                {/* <InputComponent
                  idInput="validity"
                  className="input-basic medium form-group"
                  typeInput="text"
                  label=""
                  register={register}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                  placeholder={""}
                /> */}

                {/* <InputComponent
                  idInput="ideaProject"
                  className="input-basic medium form-group"
                  typeInput="text"
                  label="Idea de proyecto"
                  register={register}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                  placeholder={""}
                /> */}
              </div>
            </FormComponent>

            <div className="button-save-container-display-users margin-right0">
              <ButtonComponent
                value="Agregar ítem"
                className="button-save large disabled-black"
                disabled={sending}
                action={() => {
                  addItem();
                }}
              />
            </div>

            <div
              style={
                dataGrid.length > 0 ? { display: "block" } : { display: "none" }
              }
            >
              {/* <div className="container-form mg-0"> */}
              <BasicTableComponent
                ref={tableComponentRef}
                data={dataGrid}
                columns={tableColumns}
                actions={tableActions}
                titleMessageModalNoResult="Registro no existente"
                isShowModal={true}
              />
              {/* </div> */}

              <br />
              <br />

              <div>
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
                          {
                            dataGrid?.map((e, i) => {
                            aucumActivity = e.activityValue;
                            let value = aucumActivity;
                            if (i === 0) {
                              value = Number(e.activityValue);
                            } else {
                              value = (Number(value) + Number(e.activityValue));
                            }
                            if (Number(dataGrid.length) == Number(i + 1)) {return value; }
                            
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
                          {
                            dataGrid?.map((e, i) => {
                            acumAmount = e.amount
                            let value =  acumAmount;
                            if ( i === 0) {
                              value = Number(e.amount);
                            } else {
                              value = (Number(value) + Number(e.amount));1
                            }
                            if (Number(dataGrid.length) == Number(i + 1)) {return value; }
                            })
                          }
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
                            debugger
                            acumTotal = e.totalCost;
                            let value = acumTotal;
                            if (i === 0) {
                              value = Number(e.totalCost);
                            } else {
                              value = (Number(value) + Number(e.totalCost));
                            }
                            if (Number(dataGrid.length) == Number(i + 1)) {return value; }
                          })}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <br />

              <TextAreaComponent
                id={"observations"}
                idInput={"observations"}
                label="Observaciones"
                classNameLabel="text-black biggest bold text-required"
                className={`text-area-basic `}
                placeholder="Escribe aquí"
                register={register}
                errors={errors}
                characters={500}
              ></TextAreaComponent>
            </div>
          </div>

          <div>
            <hr className="barra-spacing" />
          </div>

          <div className="button-save-container-display-users margin-right0">
            <ButtonComponent
              form="createVotingForm"
              value="Cancelar"
              type="button"
              className="button-cancel-text large hover-three disabled-black"
              action={() => CancelFunction()}
              disabled={sending}
            />
            <ButtonComponent
              form="createVotingForm"
              value="Guardar"
              type="submit"
              className="button-save large disabled-black"
              disabled={sending}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(VotingResultsPage);
