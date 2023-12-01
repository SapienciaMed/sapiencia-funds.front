import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  MultiSelects,
  SelectComponent,
} from "../../../common/components/Form";
import useBudgetSearch from "../../budget-convocation/hooks/search-budget.hook";
import useControlInfo from "../hooks/control-info";
import { useConsultControlReport } from "../hooks/controlreport";

const SearchContrlPage = () => {
  const {
    tableView,
    onSubmit,
    control,
    errors,
    isValid,
    handleClean,
    submitDisabled,
    register,
    handleChange,
    conditionalPage,
    bandProyect,
    bandValidiy,
    bandComuna,
  } = useConsultControlReport();

  const { announcementList, budgetList } = useBudgetSearch();

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
            <div className="text-black large grid-span-2-columns pb-14px">
              Control financiero
            </div>
            <span className="text-black biggest bold grid-span-3-columns">
              Consultar Informe Control
            </span>
          </div>
          <div className="grid-form-4-container gap-25 mt-24px">
            {bandProyect && (
              <div>
                <InputComponent
                  idInput="noProject"
                  label={<>Número proyecto</>}
                  register={register}
                  typeInput="text"
                  errors={errors}
                  className="input-basic medium"
                  classNameLabel="text-black big"
                  onChange={handleChange}
                />
              </div>
            )}

            {bandValidiy && (
              <div>
                <InputComponent
                  idInput="validity"
                  label={<>Vigencia</>}
                  register={register}
                  typeInput="text"
                  errors={errors}
                  className="input-basic medium"
                  classNameLabel="text-black big"
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <SelectComponent
                idInput="idConvocatoria"
                control={control}
                errors={errors}
                data={announcementList}
                label={<> Convocatoria </>}
                className="select-basic medium"
                classNameLabel="text-black big"
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
                classNameLabel="text-black big"
                placeholder="Seleccionar"
                filter
              />
            </div>
            {bandComuna && (
              <div>
                <MultiSelects
                  idInput={"id_comuna"}
                  control={control}
                  errors={errors}
                  data={budgetList}
                  label={<>Fondo Comuna</>}
                  className={
                    "select-basic medium select-disabled-list input-basic input-regular"
                  }
                  classNameLabel="text-black big medium label-regular"
                  placeholder="Seleccionar"
                  filter={true}
                />
              </div>
            )}
          </div>

          <div className="button-save-container-display mr-24px mt-24px button-save-bussiness">
            <ButtonComponent
              value="Limpiar campos"
              className="button-clean"
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
      {tableView && <>{conditionalPage}</>}
    </div>
  );
};

export default SearchContrlPage;
