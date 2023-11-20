import React from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import useSearchCut from "../hooks/search";
import { Controller } from "react-hook-form";
import TableComponent from "../../../common/components/table.component";

export const Search = ({ auth, authDelete, authEdit }) => {
  const {
    control,
    formState,
    onSubmit,
    showTable,
    tableComponentRef,
    tableActions,
    setshowTable,
    reset,
    loading,
    setLoading,
    tableColumns,
    newElement,
  } = useSearchCut(auth, authDelete, authEdit);

  if (loading) return <></>;

  return (
    <div>
      <div className="containerTitleCut">
        <p className="text-black text-29 ml-24px mt-20px">Cortes por año</p>
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
            <div className="containerInitialPeriod mb-24px">
              <div style={{ paddingTop: "24px" }} className="container-input">
                <Controller
                  control={control}
                  name={"name"}
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        errors={formState.errors}
                        typeInput="text"
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value ? field.value : ""}
                        className="input-basic input-size"
                        classNameLabel="text-black biggest font-500"
                        label="Nombre Corte"
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="containerInitialPeriod mb-24px">
              <div className="container-input">
                <DatePickerComponent
                  control={control}
                  classNameLabel="text-black biggest font-500"
                  label={<>Fecha Inicial</>}
                  idInput="from"
                  dateFormat="dd-mm-yy"
                  errors={formState.errors}
                ></DatePickerComponent>
              </div>
            </div>
            <div className="containerInitialPeriod mb-24px">
              <div className="container-input">
                <DatePickerComponent
                  control={control}
                  classNameLabel="text-black biggest font-500"
                  label={<>Fecha Final</>}
                  idInput="until"
                  dateFormat="dd-mm-yy"
                  errors={formState.errors}
                ></DatePickerComponent>
              </div>
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
            setLoading(true);
            setshowTable(false);
            reset();
            setLoading(false);
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
            ref={tableComponentRef}
            url={`${process.env.urlApiFunds}/api/v1/cuts/get-paginated`}
            columns={tableColumns}
            actions={tableActions}
            titleMessageModalNoResult="No hay resultados"
            isShowModal={true}
            descriptionModalNoResult="No hay resultados"
            emptyMessage="No hay resultados"
            classname="table-header"
          />
        </div>
      )}
    </div>
  );
};

export default Search;
