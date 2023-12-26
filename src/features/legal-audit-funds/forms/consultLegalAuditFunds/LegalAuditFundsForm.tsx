import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import Svgs from "../../../../public/images/icons/svgs";
import { tableColumns } from "./columns";
import BasicTableComponent from "../../../../common/components/basic-table.component";
import TableDataPropComponent from "../../../../common/components/table-data-prop.component";
const LegalAuditFundsForm = ({
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
  tableActions,
  tableComponentRef,
  legalAuditData,
  validateActionAccess,
}) => (
  <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
    <FormComponent
      id="searchAccountStatementForm"
      className="form-signIn"
      action={onSubmit}
    >
      <span className="text-black large  grid-span-4-columns mt--4px ml--1px">
        Legalizados
      </span>

      <div className=" container-sections-forms ml-5px mr-10px">
        <div className="grid-form-4-container gap-25">
          <SelectComponent
            idInput="announcementId"
            control={control}
            errors={errors}
            data={periodsData}
            label={
              <div className="mb-8px">
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
    {tableView && legalAuditData && (
      <>
        <div className="container-sections-forms ml-10px mr-10px">
          <TableDataPropComponent
            ref={tableComponentRef}
            dataTable={legalAuditData}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={false}
            setShowFooterActions={setShowFooterActions}
            titleMessageModalNoResult={"No se encontraron registros"}
            secondaryTitle="Resultados de busqueda"
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
          validateActionAccess("FONDOS_LEGALIZADO_XLSX") && (
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

export default memo(LegalAuditFundsForm);
