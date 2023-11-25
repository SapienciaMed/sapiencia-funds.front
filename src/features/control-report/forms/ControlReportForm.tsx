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
import useControlInfo from "../hooks/control-info";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { tableColumns } from "./config-columns/columns-estrato-123";

export const ManagePropertyForm = ({
  urlGet,
  tableComponentRef,
  tableView,
  onSubmit,
  setPaginateData,
  tableColumns,
  control,
  errors,
  isValid,
  handleClean,
  submitDisabled,
  register,
  handleChange,
  updateOrSaveData,
  tableActions,
  totalNoPreseleccionados,
  totalOtorgado,
  totalNoCupos,
  totalRecursoDisponible,
  totalDisponible,
  totalPorParticipacion,
  totalNoLegalizados,
  totalRendimientoFinancieros,
}) => {
  const { infoData } = useControlInfo();

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
                idInput="noProject"
                label={<>Número proyecto</>}
                register={register}
                typeInput="text"
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
                onChange={handleChange}
              />
            </div>
            <div>
              <InputComponent
                idInput="validity"
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
                idInput="valueConvocatoria"
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
                idInput="idControlSelect"
                control={control}
                errors={errors}
                data={infoData}
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
              // disabled={!isValid || submitDisabled}
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
          </div>{" "}
          <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
            {" "}
            <div
              className="bold mt-24px ml-16px mr-16px p-0"
              style={{ fontWeight: 500, fontSize: "29px", color: "#000000" }}
            >
              Totales
            </div>
            <div className="grid-form-4-container mb-24px">
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="No. Preseleccionados"
                register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                errors={errors}
                placeholder={`${totalNoPreseleccionados}`}
                disabled
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="No. Cupos"
                register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                errors={errors}
                placeholder={""}
                disabled
                value={String(totalNoCupos)}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Recurso disponible"
                register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                errors={errors}
                placeholder={""}
                disabled
                value={String(totalRecursoDisponible)}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Otorgado"
                register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                errors={errors}
                placeholder={""}
                disabled
                value={String(totalOtorgado)}
              />
            </div>
            <div className="grid-form-4-container mb-24px">
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Disponible"
                register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                errors={errors}
                placeholder={""}
                disabled
                value={String(totalDisponible)}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="%Participacion"
                register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                errors={errors}
                placeholder={""}
                disabled
                value={String(totalPorParticipacion)}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="No.Legalizados"
                register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                errors={errors}
                placeholder={""}
                disabled
                value={String(totalNoLegalizados)}
              />
              <InputComponent
                idInput={"tQuantity1"}
                className="input-basic medium"
                typeInput="text"
                label="Rendimiento financieros"
                register={register}
                classNameLabel="text-black biggest text-required"
                //direction={EDirection.column}
                errors={errors}
                placeholder={""}
                disabled
                value={String(totalRendimientoFinancieros)}
              />
            </div>
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
