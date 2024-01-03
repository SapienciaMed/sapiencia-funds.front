import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  MultiSelects,
  SelectComponent,
} from "../../../../common/components/Form";
import { DatePickerComponent } from "../../../../common/components/Form/input-date.component";
import TableComponent from "../../../../common/components/table.component";
import Svgs from "../../../../public/images/icons/svgs";
import { useWidth } from "../../../../common/hooks/use-width";
import { BiPlusCircle } from "react-icons/bi";
import { tableColumns } from "./columns";

const FinancialMonitoringForm = ({
  tableView,
  onSubmit,
  control,
  errors,
  isValid,
  handleClean,
  submitDisabled,
  downloadCollection,
  showFooterActions,
  setShowFooterActions,
  periodsData,
  setPaginateData,
  tableComponentRef,
  urlGet,
  validateActionAccess,
  budgetList,
}) => (
  <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
    <FormComponent
      id="searchFinancialMonitoringForm"
      className="form-signIn"
      action={onSubmit}
    >
      <span className="text-black large  grid-span-4-columns mt--4px ml--1px">
        Seguimiento financiero
      </span>

      <div className=" container-sections-forms ml-5px mr-10px">
        <div className="grid-form-4-container gap-25">
          <MultiSelects
            idInput={"id_comuna"}
            control={control}
            errors={errors}
            data={budgetList}
            label={<>ID Comuna</>}
            className={
              "select-basic medium select-disabled-list input-basic input-regular"
            }
            classNameLabel="text-black big medium label-regularx"
            placeholder="Seleccionar"
            filter={true}
          />

          <SelectComponent
            idInput="announcementId"
            control={control}
            errors={errors}
            data={periodsData}
            label={
              <div>
                Convocatoria <span>*</span>
              </div>
            }
            className="select-basic medium"
            classNameLabel="text-black big "
            placeholder="Seleccionar"
            filter
          />
        </div>
      </div>
      <div className="button-save-container-display mr-24px">
        {tableView && (
          <ButtonComponent
            value="Limpiar campos"
            className="button-clean  mr-3px mt-14px"
            type="button"
            action={handleClean}
          />
        )}
        <ButtonComponent
          value="Buscar"
          className={`button-save ${
            !isValid || submitDisabled ? "disabled-black" : ""
          } big`}
          type="submit"
          disabled={!isValid || submitDisabled}
        />
      </div>
    </FormComponent>
    {tableView && (
      <>
        <div className="container-sections-forms ml-10px mr-10px">
          <TableComponent
            setPaginateData={setPaginateData}
            ref={tableComponentRef}
            url={urlGet}
            columns={tableColumns}
            isShowModal={true}
            setShowFooterActions={setShowFooterActions}
            classSizeTable="size-table-wd-550"
            isMobil={false}
            emptyMessage="No se generó resultado en la búsqueda"
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
        {showFooterActions &&
          validateActionAccess("FONDOS_PORCENTAJE_ABSORCION_XLSX") && (
            <div className="button-save-container-display mt-20px mr-24px">
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
                action={downloadCollection}
              />
            </div>
          )}
      </>
    )}
  </div>
);

export default memo(FinancialMonitoringForm);
