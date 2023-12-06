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
import Item from "../item/item-stratum.page";

function Estratum123Tab({ filters, reload }) {
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
    setDataGridStratum,
  };

  const {
    tableComponentRef,
    comunaList,
    onsearchSubmintControl,
    downloadXLSX,
  } = stratum123Hook(filters, objSet, reload);

  const tableColumns: ITableElement<any>[] = [
    {
      fieldName: "activity",
      header: "Comuna o corregimiento",
      renderCell: (row) => {
        // Intenta encontrar el objeto
        const foundObj = comunaList?.find(
          (obj) => obj.value == row.resourcePrioritization.communeId
        );

        // Verifica si el objeto fue encontrado antes de acceder a su propiedad 'name'
        if (foundObj) {
          return <>{foundObj.name}</>;
        }

        // Puedes retornar algo por defecto si el objeto no se encuentra
        return <>No encontrado</>;
      },
    },

    {
      fieldName: "resourceAvailable",
      header: "Recurso disponible",
      renderCell: (row) => {
        const numero = 1000;
        const numeroConPuntos = formaterNumberToCurrency(row.resourceAvailable);
        return <>{numeroConPuntos}</>;
      },
    },
    {
      fieldName: "granted",
      header: "Otorgado",
      renderCell: (row) => {
        const numero = 1000;
        const numeroConPuntos = formaterNumberToCurrency(row.granted);
        return <>{numeroConPuntos}</>;
      },
    },
    {
      fieldName: "totalCost",
      header: "Disponible",
      renderCell: (row) => {
        const numeroConPuntos = formaterNumberToCurrency(
          Number(row.resourceAvailable) - Number(row.granted)
        );
        return <>{numeroConPuntos}</>;
      },
    },
    {
      fieldName: "porcentaje123",
      header: "%Participación",
      renderCell: (row) => {
        return (
          <>
            {(
              (Number(row.granted) / Number(row.resourceAvailable)) *
              100
            ).toFixed(2) + "%"}
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
              data={row}
              action={"edit"}
              collback={onsearchSubmintControl}
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
      <div className="container-sections-forms mr-20px">
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
      <div className="container-sections-forms mt-24px mb-24px p-0">
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
            value={String(formaterNumberToCurrency(totalRecursoDisponible))}
          />
          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="Otorgado"
            classNameLabel="text-black biggest "
            placeholder={""}
            disabled
            value={String(formaterNumberToCurrency(totalOtorgado))}
          />

          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="Disponible"
            classNameLabel="text-black biggest"
            placeholder={""}
            disabled
            value={String(formaterNumberToCurrency(totalDisponible))}
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
            classNameLabel="text-black biggest"
            placeholder={""}
            disabled
            value={String(totalNoLegalizados)}
          />
        </section>
      </div>
      {dataGridStratum.length > 0 ? (
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
    </>
  );
}

export default Estratum123Tab;
