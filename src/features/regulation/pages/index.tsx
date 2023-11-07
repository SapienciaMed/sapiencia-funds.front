import React from "react";
import SwitchComponent from "../../../common/components/Form/switch.component";
import {
  ButtonComponent,
  FormComponent,
} from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import useSearchRegulation from "../hooks/search";
import { periods } from "../service";
import TableComponent from "../../../common/components/table.component";

const Regulation = () => {
  const {
    tableComponentRef,
    tableActions,
    showTable,
    register,
    onSubmit,
    formState,
    deparmetList,
    formValues,
    newElement,
    reset,
    setshowTable,
    loading,
    setLoading,
    control,
    listPrograms,
    tableColumns,
  } = useSearchRegulation();

  if (loading) return <></>;

  return (
    <div>
      <div className="containerTitleRegulation">
        <p className="text-black text-29 ml-24px mt-20px">Reglamento</p>
        <div
          className="flex"
          style={{ alignItems: "center" }}
          onClick={() => newElement()}
        >
          <p className="btnCreate"> Crear</p>
          <p className="plusBtn">+</p>
        </div>
      </div>
      <div className="container-form">
        <FormComponent
          id="regulationSeach"
          className="form-signIn"
          action={onSubmit}
        >
          <div className="containerGroupSearch mb-24px">
            <div style={{ padding: "24px" }} className=" mb-24px">
              <SelectComponentOld
                idInput="program"
                register={register}
                className="select-basic input-size"
                placeholder="Seleccionar"
                label={<>Programa</>}
                data={listPrograms.length ? listPrograms : []}
                classNameLabel="text-black biggest text-required bold"
                // direction={EDirection.column}
                errors={formState.errors}
              />
            </div>
            <div
              style={{ padding: "24px" }}
              className="containerInitialPeriod "
            >
              <SelectComponentOld
                idInput="initialPeriod"
                register={register}
                className="select-basic input-size"
                placeholder="Seleccionar"
                label={<>Periodo inicial de convocatoria</>}
                data={periods.length ? periods : []}
                classNameLabel="text-black biggest text-required bold"
                // direction={EDirection.column}
                errors={formState.errors}
              />
            </div>

            <div style={{ padding: "24px" }} className="containerEndPeriod">
              <SelectComponentOld
                idInput="endPeriod"
                register={register}
                className="select-basic input-size"
                placeholder="Seleccionar"
                label={<>Periodo final de convocatoria</>}
                data={periods.length ? periods : []}
                classNameLabel="text-black biggest bold"
                // direction={EDirection.column}
                errors={formState.errors}
              />
            </div>
          </div>
        </FormComponent>
      </div>
      <div className="buttonsActions">
        <ButtonComponent
          value="Limpiar Campos"
          type="button"
          className="button-cancel-text hover-three disabled-black padding-button"
          action={() => {
            setshowTable(false);
            setLoading(true);
            reset();
          }}
        />
        <ButtonComponent
          value="Buscar"
          form="regulationSeach"
          type="submit"
          className="button-save disabled-black padding-button"
        />
      </div>
      {showTable && (
        <div className="container-form padding-form ">
          <TableComponent
            title="Resultados disponibles socializados"
            ref={tableComponentRef}
            url={`${process.env.urlApiFunds}/api/v1/reglament/get-paginated`}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={false}
          />
        </div>
      )}
    </div>
  );
};

export default Regulation;