import { ButtonComponent, FormComponent, SelectComponent } from "../../../common/components/Form";
import useSearchRegulation from "../hooks/search";
import TableComponent from "../../../common/components/table.component";
import DetailReglament from "./detailt";
import { BiPlusCircle } from "react-icons/bi";
import { EDirection } from "../../../common/constants/input.enum";
const Regulation = ({ auth, authDetail, authEdit }) => {
  const {
    tableComponentRef,
    tableActions,
    showTable,
    onSubmit,
    formState,
    newElement,
    reset,
    setshowTable,
    control,
    listPrograms,
    tableColumns,
    showDetailModal,
    setShowDetailModal,
    detailData,
    setValue,
    getValues,
  } = useSearchRegulation(auth, authDetail, authEdit);

  return (
    <div className="main-page">
      <div className="card-table gap-0">
        <section className="title-area-4">
          <p className="text-black extra-large no-margin">Reglamento</p>
          <div className="display-align-flex-center">
            <div 
              className='title-button font-big'
              style={{ fontSize: '16px'}}
              onClick={() => newElement()}
            >
              Crear <BiPlusCircle />
            </div>
          </div>
        </section>
        <section className="card-table mt-20px">
          <FormComponent  id="regulationSeach" className="form-signIn" action={onSubmit}>
            <div className="grid-form-3-container gap-15">
              <SelectComponent
                idInput="programId"
                control={control}
                placeholder="Seleccionar"
                label='Programa'
                data={listPrograms ?? []}
                direction={EDirection.column}
                className="select-basic big select-disabled-list"
                classNameLabel='text-black big text-with-colons'
              />
              <SelectComponent
                idInput="initialPeriod"
                control={control}
                placeholder="Seleccionar"
                label='Periodo inicial de convocatoria'
                data={[]}
                direction={EDirection.column}
                className="select-basic big select-disabled-list"
                classNameLabel='text-black big text-with-colons'
              />
              <SelectComponent
                idInput="endPeriod"
                control={control}
                placeholder="Seleccionar"
                label='Periodo final de convocatoria'
                data={[]}
                direction={EDirection.column}
                className="select-basic big select-disabled-list"
                classNameLabel='text-black big text-with-colons'
              />
            </div>
            
          </FormComponent>
        </section>
        <section className="buttonsActions2">
          <ButtonComponent
            value="Limpiar Campos"
            type="button"
            className="button-cancel-text hover-three disabled-black padding-button"
            action={() => {
              setshowTable(false);
              reset();
            }}
          />
          <ButtonComponent
            value="Buscar"
            form="regulationSeach"
            type="submit"
            className="button-save disabled-black padding-button"
          />
        </section> 
      </div>
      {showTable && (
        <TableComponent
          ref={tableComponentRef}
          url={`${process.env.urlApiFunds}/api/v1/reglament/get-paginated`}
          columns={tableColumns}
          actions={tableActions}
          titleMessageModalNoResult="No hay resultados"
          isShowModal={true}
          descriptionModalNoResult="No hay resultados"
          emptyMessage="No hay resultados"
          classname="table-header"
          isMobil={false}
        />
      )}
      <DetailReglament
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        detailData={detailData}
        errors={formState.errors}
        control={control}
        setValue={setValue}
        getValues={getValues}
        listPrograms={listPrograms}
      />
    </div>
  );
};

export default Regulation;
