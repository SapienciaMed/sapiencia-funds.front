import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import TableComponent from "../../../common/components/table.component";
import Svgs from "../../../public/images/icons/svgs";
import useControlInfo from "../../acta/hooks/control-info";
// import { tableColumns } from "./config-columns/columns-estrato-123";

export const ManagePropertyForm = ({
  urlGet,
  tableComponentRef,
  tableView,
  onSubmit,
  setPaginateData,
  tableActions,
  tableColumns,
  control,
  errors,
  isValid,
  handleClean,
  submitDisabled,
  register,
  handleChange,
}) => {
  const { info } = useControlInfo();

  useEffect(() => {
    console.log("tableColumns: **", tableColumns);
  }, [tableColumns]);

  useEffect(() => {
    console.log("urlGet: **", urlGet);
  }, [urlGet]);

  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="ControlInfoForm"
        className="form-signIn"
        action={onSubmit}
      >
        <div className="container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <div className="text-black large bold grid-span-2-columns pb-14px">
              Control financiero
            </div>
            <span className="text-black biggest bold grid-span-3-columns">
              Consultar Informe Control
            </span>
          </div>
          <div className="grid-form-4-container gap-25 mt-24px">
            <div>
              <InputComponent
                idInput="ghjhg"
                label={<>Número proyecto</>}
                register={register}
                typeInput="number"
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
                onChange={handleChange}
              />
            </div>
            <div>
              <InputComponent
                idInput="gjkgh"
                label={<>Vigencia</>}
                register={register}
                typeInput="text"
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
                onChange={handleChange}
              />
            </div>
            <div>
              <SelectComponent
                idInput="equipmentStatus"
                control={control}
                errors={errors}
                // data={info}
                label={<> Convocatoria </>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccionar"
                filter
              />
            </div>
            <div>
              <SelectComponent
                idInput="controlReport"
                control={control}
                errors={errors}
                data={info}
                label={<> Informe control </>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccionar"
                filter
              />
            </div>
          </div>
          <div className="button-save-container-display mr-24px mt-24px button-save-bussiness">
            <ButtonComponent
              value="Limpiar campos"
              className="button-clean bold"
              type="button"
              action={handleClean}
            />
            <ButtonComponent
              value="Buscar"
              className={`button-save ${
                !isValid || submitDisabled ? "disabled-black" : ""
              } big`}
              type="submit"
              disabled={!isValid || submitDisabled}
            />
          </div>
        </div>
      </FormComponent>
      {tableView && (
        <>
          <div className="container-sections-forms ml-20px mr-20px">
            <TableComponent
              setPaginateData={setPaginateData}
              ref={tableComponentRef}
              url={urlGet}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={true}
              emptyMessage="Resultado en la búsqueda"
              descriptionModalNoResult="No se generó resultado en la búsqueda"
              titleMessageModalNoResult="Resultado de búsqueda"
            />
          </div>
          <div
            style={{
              height: "1px",
              margin: "0 20px",
              backgroundColor: "#e0e0e0",
            }}
          ></div>
          <div className="button-save-container-display mr-24px">
            <ButtonComponent
              value="Cerrar"
              className="button-save big"
              action={handleClean}
            />
          </div>
        </>
      )}
    </div>
  );
};
