import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { DatePickerComponent } from "../../../../common/components/Form/input-date.component";
import TableComponent from "../../../../common/components/table.component";
import Svgs from "../../../../public/images/icons/svgs";
import { tableColumns } from "./columns";
import { useWidth } from "../../../../common/hooks/use-width";
import { BiPlusCircle } from "react-icons/bi";

const AbsorptionPercentageForm = ({
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
  width,
  handleAggItem,
  periodsData,
  tableActions,
  setPaginateData,
  tableComponentRef,
  urlGet,
  register,
}) => (
  <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
    <FormComponent
      id="searchAccountStatementForm"
      className="form-signIn"
      action={onSubmit}
    >
      <span className="text-black large  grid-span-4-columns mt-15px ml-27px">
        Porcentaje de absorción
      </span>

      <div className=" container-sections-forms ml-20px mr-20px">
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
            placeholder="Seleccione."
            filter
          />
        </div>
      </div>
      <div className="button-save-container-display mr-24px">
        {tableView && (
          <div className="mr-auto ml-25px">
            <div>
              <div
                className={`title-button  ${
                  width < 300 ? "font-medium" : "font-big"
                } mt-12px mr-15px hover`}
                onClick={handleAggItem}
              >
                <div className="button-border colorTittle alin pr-23px pl-23px">
                  <BiPlusCircle />
                  <span className="p-2px"> Agregar ítem </span>
                </div>
              </div>
            </div>
          </div>
        )}

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
        <div className="container-sections-forms ml-20px mr-20px">
          <TableComponent
            setPaginateData={setPaginateData}
            ref={tableComponentRef}
            url={urlGet}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={true}
            setShowFooterActions={setShowFooterActions}
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
        {showFooterActions && (
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

export default memo(AbsorptionPercentageForm);
