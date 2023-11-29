import React, { useContext, useState } from "react";
import {
  ButtonComponent,
  InputComponent,
} from "../../../../common/components/Form";
import { stratum123Hook } from "../../hooks/conditionalHooks/stratum123.hook";
import BasicTableComponent from "../../../../common/components/basic-table.component";
import { ITableAction, ITableElement } from "../../../../common/interfaces";
import { AppContext } from "../../../../common/contexts/app.context";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";
import Svgs from "../../../../public/images/icons/svgs";
import Item from "../item/item-stratum.page"

function Estratum123Tab({ filters }) {

  const { validateActionAccess, setMessage } = useContext(AppContext);
  const [dataGridStratum, setDataGridStratum] = useState([]);
  const [totalOtorgado, setTotalOtorgado] = useState(null);
  const [totalRecursoDisponible, setTotalRecursoDisponible] = useState(null);
  const [totalDisponible, setTotalDisponible] = useState(null);
  const [totalPorParticipacion, setTotalPorParticipacion] = useState(null);
  const [totalNoLegalizados, setTotalNoLegalizados] = useState(null);

  const objSet = {
    setTotalNoLegalizados,
    setTotalPorParticipacion,
    setTotalDisponible,
    setTotalRecursoDisponible,
    setTotalOtorgado,
    dataGridStratum,
    setDataGridStratum
  };

  const { tableComponentRef, comunaList } = stratum123Hook(
    filters,
    objSet
  );


  const tableColumns: ITableElement<any>[] = [
    {
      fieldName: "activity",
      header: "Comuna o corregimiento",
      renderCell: (row) => {
        return (
          <>
            {
              comunaList?.find(
                (obj) => obj.value == row.resourcePrioritization.communeId
              ).name
            }
          </>
        );
      },
    },
    {
      fieldName: "resourceAvailable",
      header: "Recurso disponible",
      renderCell: (row) => {
        const numero = 1000;
        const numeroConPuntos = formaterNumberToCurrency(
          row.resourceAvailable
        ).replace("$", "");
        return <>{numeroConPuntos}</>;
      },
    },
    {
      fieldName: "granted",
      header: "Otorgado",
      renderCell: (row) => {
        const numero = 1000;
        const numeroConPuntos = formaterNumberToCurrency(
          row.granted
        ).replace("$", "");
        return <>{numeroConPuntos}</>;
      },
    },
    {
      fieldName: "totalCost",
      header: "Disponible",
      renderCell: (row) => {
        return <>{Number(row.resourceAvailable) - Number(row.granted)}</>;
      },
    },
    {
      fieldName: "porcentaje123",
      header: "%Participación",
      renderCell: (row) => {
        return (
          <>
            {((Number(row.granted) / Number(row.resourceAvailable))* 100).toFixed(2)  + "%"}
          </>
        );
      },
    },
    {
      fieldName: "legalized",
      header: "No. Legalizados",
    },
  ];

  const tableActions: ITableAction<any>[] = [
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
            <Item
              dataVoting={row}
              action={"edit"}
              collback={false}
            />
          ),
          size: "large",
          style: "mdl-agregarItem-voting",
        });
      },
      hide: !validateActionAccess("USUARIOS_EDITAR"),
    },
  ];

  return (
    <>
      <div className="container-sections-forms ml-20px mr-20px">
        <BasicTableComponent
          ref={tableComponentRef}
          data={dataGridStratum}
          columns={tableColumns}
          actions={tableActions}
          titleMessageModalNoResult="Registro no existente"
          isShowModal={true}
          secondaryTitle={"Resultados de búsqueda"}
          classSizeTable="size-table-wd-150"
          isMobil={true}
        />
      </div>
      <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
        <p className="text-black huge ">Totales</p>

        <section className="funcionality-filters-container gap-15">
          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="Recurso disponible"
            classNameLabel="text-black biggest "
            placeholder={""}
            disabled
            value={String(formaterNumberToCurrency( totalRecursoDisponible).replace("$", ""))}
          />
          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="Otorgado"
            classNameLabel="text-black biggest "
            placeholder={""}
            disabled
            value={String(formaterNumberToCurrency(totalOtorgado).replace("$", ""))}
          />

          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="Disponible"
            classNameLabel="text-black biggest"
            placeholder={""}
            disabled
            value={String(totalDisponible)}
          />
        </section>
        <section className="funcionality-filters-container gap-15">
          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="%Participacion"
            classNameLabel="text-black biggest "
            placeholder={""}
            disabled
            value={String(totalPorParticipacion) + "%"}
          />
          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="No.Legalizados"
            classNameLabel="text-black biggest "
            placeholder={""}
            disabled
            value={String(totalNoLegalizados)}
          />
        </section>
      </div>
      {
        dataGridStratum.length > 0 ? (
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
                // action={downloadXLSX}
              />
            </div>
        )
          : ''
      }
    </>
  );
}

export default Estratum123Tab;
