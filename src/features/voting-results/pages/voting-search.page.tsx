import React, { useContext, useState } from "react";
import { ButtonComponent } from "../../../common/components/Form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import { IVotingSearcheResult } from "../../../common/interfaces/voting.interfaces";
import { useVotingResultsSearch } from "../hooks/voting-search.hooks";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import TableComponent from "../../../common/components/table.component";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ItemResultsPage from "../pages/item.create.page";
import Svgs from "../../../../src/public/images/icons/svgs";
import { formaterNumberToCurrency } from "../../../common/utils/helpers";

const VotingResultsSearchPage = () => {
  const { tableComponentRef, downloadXLSX, dataTblTotal, onSubmitSearch } =
    useVotingResultsSearch();

  const navigate = useNavigate();
  let aucumActivity = 0;
  let acumTotal = 0;

  const { validateActionAccess, setMessage } = useContext(AppContext);

  // States
  const [showExcel, setShowExcel] = useState<boolean>(false);

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
      fieldName: "activity.typesProgram.name",
      header: "Programa",
    },
    {
      fieldName: "activity.name",
      header: "Actividad",
    },
    {
      fieldName: "activity.totalValue",
      header: "Valor Actividad",
      renderCell: (row) => {
        return <>{formaterNumberToCurrency(row.activity.totalValue)}</>;
      },
    },
    {
      fieldName: "amount",
      header: "Cantidad",
    },
    {
      fieldName: "costTotal",
      header: "Costo Total",
      renderCell: (row) => {
        return <>{formaterNumberToCurrency(row.costTotal)}</>;
      },
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
            <ItemResultsPage
              dataVoting={row}
              action={"editVoting"}
              collback={onSubmitSearch}
            />
          ),
          size: "items",
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
          <TableComponent
            ref={tableComponentRef}
            url={`${process.env.urlApiFunds}/api/v1/voting/get-paginated`}
            columns={tableColumns}
            actions={tableActions}
            titleMessageModalNoResult="La votación no existe"
            descriptionModalNoResult="La votación no existe en el sistema. 
              Haga clic en el botón crear votación"
            isShowModal={true}
            horizontalScroll
            onResult={(rows) => setShowExcel(rows.length > 0)}
          />
          <br />
          <br />
          <div style={{ display: dataTblTotal.length > 0 ? "block" : "none" }}>
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
                        {dataTblTotal?.map((e, i) => {
                          let value = aucumActivity;
                          if (i === 0) {
                            aucumActivity = Number(e.activity.totalValue);
                            value = Number(e.activity.totalValue);
                          } else {
                            value =
                              Number(value) + Number(e.activity.totalValue);
                            aucumActivity = value;
                          }
                          if (Number(dataTblTotal.length) == Number(i + 1)) {
                            return formaterNumberToCurrency(value);
                          }
                        })}
                      </p>
                    </span>
                  </div>
                  <span className="txt-center">
                    <p>
                      {dataTblTotal?.map((e, i) => {
                        let value = aucumActivity;
                        if (i === 0) {
                          aucumActivity = Number(e.activity.totalValue);
                          value = Number(e.activity.totalValue);
                        } else {
                          value = Number(value) + Number(e.activity.totalValue);
                          aucumActivity = value;
                        }
                        if (Number(dataTblTotal.length) == Number(i + 1)) {
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
                  <div className="content-tbltotlscolumn">
                    <div className="colorcontetnmin alingcent-textopciones">
                      <span>Costo total</span>
                    </div>
                    <span className="txt-center">
                      <p>
                        {dataTblTotal?.map((e, i) => {
                          let value = acumTotal;
                          if (i === 0) {
                            acumTotal = Number(e.costTotal);
                            value = Number(e.costTotal);
                          } else {
                            value = Number(value) + Number(e.costTotal);
                            acumTotal = value;
                          }
                          if (Number(dataTblTotal.length) == Number(i + 1)) {
                            return formaterNumberToCurrency(value);
                          }
                        })}
                      </p>
                    </span>
                  </div>
                  <span className="txt-center">
                    <p>
                      {dataTblTotal?.map((e, i) => {
                        let value = acumTotal;
                        if (i === 0) {
                          acumTotal = Number(e.costTotal);
                          value = Number(e.costTotal);
                        } else {
                          value = Number(value) + Number(e.costTotal);
                          acumTotal = value;
                        }
                        if (Number(dataTblTotal.length) == Number(i + 1)) {
                          return value;
                        }
                      })}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showExcel && (
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
        )}
      </div>
    </div>
  );
};

export default React.memo(VotingResultsSearchPage);
