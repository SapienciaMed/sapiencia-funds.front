import React, { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import TableComponent from "../../../common/components/table.component";
import useSearchSocialization from "../hooks/search";

export const Socialization = () => {
  const {
    tableComponentRef,
    tableColumns,
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
  } = useSearchSocialization();

  if (loading) return <></>;

  return (
    <div className="container-form">
      <div className="title-area">
        <p className="text-black text-29 ml-24px mt-20px mg-0">
          Resumen de socialización, informes de gestión
        </p>
      </div>
      <div className="container-form padding-form ">
        <div className="containerIndexAction">
          <div className="flex" onClick={() => newElement()}>
            <p className="btnCreate"> Crear socializacion</p>
            <p className="plusBtn">+</p>
          </div>
        </div>
        <FormComponent
          id="socializationSearch"
          className="form-signIn"
          action={onSubmit}
        >
          <div className="containerIndexForm mt-24">
            <div className="mr-24">
              <InputComponent
                idInput={"numberProyect"}
                className="input-basic input-size"
                typeInput="number"
                label="Proyecto"
                register={register}
                classNameLabel="text-black biggest text-required bold"
                errors={formState.errors}
                placeholder={""}
              />
            </div>
            <div className="mr-24">
              <SelectComponentOld
                idInput="communeCode"
                register={register}
                className="select-basic input-size"
                placeholder="Seleccionar"
                label="Comuna y/o corregimiento "
                data={deparmetList ? deparmetList : []}
                classNameLabel="text-black biggest text-required bold"
                // direction={EDirection.column}
                errors={formState.errors}
              />
            </div>
            <div className="mr-24">
              <InputComponent
                idInput={"validity"}
                className="input-basic input-size"
                typeInput="text"
                label="Vigencia"
                register={register}
                classNameLabel="text-black biggest text-required bold"
                errors={formState.errors}
                placeholder={""}
              />
            </div>
          </div>
        </FormComponent>
      </div>

      <div className="container-btns padding-form">
        <ButtonComponent
          form="socializationSearch"
          value="Limpiar"
          type="button"
          className="button-cancel-text hover-three disabled-black padding-button"
          action={() => {
            setshowTable(false);
            setLoading(true);
            reset();
          }}
        />
        <ButtonComponent
          form="socializationSearch"
          value="Buscar"
          type="submit"
          className="button-save disabled-black padding-button"
        />
      </div>

      {showTable && (
        <div className="container-form padding-form ">
          <TableComponent
            title="Resultados disponibles socializados"
            ref={tableComponentRef}
            url={`${process.env.urlApiFunds}/api/v1/socialization/get-paginated`}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={false}
          />
        </div>
      )}
    </div>
  );
};

export default memo(Socialization);
