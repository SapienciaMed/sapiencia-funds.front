import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import useControlInfo from "../hooks/control-info";
import { useConsultControlReport } from "../hooks/controlreport";
import { columns123 } from "./config-columns/columns-estrato-123";
import { columns456 } from "./config-columns/columns-estrato-456";

const SearchBudgetPage = () => {
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
  } = useConsultControlReport();

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
      {tableView && <>{conditionalPage}</>}
    </div>
  );
};

export default SearchBudgetPage;