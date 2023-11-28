import React, { useContext } from "react";
import { ButtonComponent, InputComponent } from "../../../../common/components/Form";
import {stratum123Hook} from "../../hooks/conditionalHooks/stratum123.hook"
import BasicTableComponent from "../../../../common/components/basic-table.component";
import { ITableAction, ITableElement } from "../../../../common/interfaces";
import { AppContext } from "../../../../common/contexts/app.context";

function Estratum123Tab({ filters }) {
  console.log(filters);

  const {
    urlGet,
    setGridConsolidate,
    tableComponentRef,
    dataGridConsolidate,
    totalNoPreseleccionados,
    totalOtorgado,
    totalNoCupos,
    totalRecursoDisponible,
    totalDisponible,
    totalPorParticipacion,
    totalNoLegalizados,
    totalRendimientoFinancieros,
  } = stratum123Hook(filters);

    const { validateActionAccess, setMessage } = useContext(AppContext);

    const tableColumns: ITableElement<any>[] = [
      {
        fieldName: "activity",
        header: "Comuna o corregimiento",
      },
      {
        fieldName: "activityValue",
        header: "Recurso disponible",
      },
      {
        fieldName: "amount",
        header: "Otorgado",
      },
      {
        fieldName: "totalCost",
        header: "Disponible",
      },
      {
        fieldName: "porcentaje123",
        header: "%Participación",
      },
      {
        fieldName: "porcentaje456",
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
            // description: (
            //   <ItemResultsPage
            //     dataVoting={row}
            //     action={"edit"}
            //     collback={false}
            //   />
            // ),
            description: '1',
            size: "large",
            style: "mdl-agregarItem-voting",
          });
        },
        hide: !validateActionAccess("USUARIOS_EDITAR"),
      }
    ];

  return (
    <>
      <div className="container-sections-forms ml-20px mr-20px">
        <BasicTableComponent
          ref={tableComponentRef}
          data={dataGridConsolidate}
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
            //register={register}
            classNameLabel="text-black biggest "
            //direction={EDirection.column}
            //errors={errors}
            placeholder={""}
            disabled
            // value={String(totalRecursoDisponible)}
          />
          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="Otorgado"
            //register={register}
            classNameLabel="text-black biggest "
            //direction={EDirection.column}
            //errors={errors}
            placeholder={""}
            disabled
            // value={String(totalOtorgado)}
          />

          <InputComponent
            idInput={"tQuantity1"}
            className="input-basic medium"
            typeInput="text"
            label="Disponible"
            //register={register}
            classNameLabel="text-black biggest"
            //direction={EDirection.column}
            //errors={errors}
            placeholder={""}
            disabled
            // value={String(totalDisponible)}
          />
        </section>
                      <section className="funcionality-filters-container gap-15">
        <InputComponent
          idInput={"tQuantity1"}
          className="input-basic medium"
          typeInput="text"
          label="%Participacion"
          //register={register}
          classNameLabel="text-black biggest "
          //direction={EDirection.column}
          //errors={errors}
          placeholder={""}
          disabled
          // value={String(totalPorParticipacion)}
        />
        <InputComponent
          idInput={"tQuantity1"}
          className="input-basic medium"
          typeInput="text"
          label="No.Legalizados"
          //register={register}
          classNameLabel="text-black biggest "
          //direction={EDirection.column}
          //errors={errors}
          placeholder={""}
          disabled
          // value={String(totalNoLegalizados)}
        />
        </section>
      </div>
      <div
        style={{
          height: "1px",
          margin: "0 20px",
          backgroundColor: "#e0e0e0",
        }}
      ></div>
      <div className="button-save-container-display mr-24px">
        <ButtonComponent value="Cerrar" className="button-save big" />
      </div>
    </>
  );
}

export default Estratum123Tab;
