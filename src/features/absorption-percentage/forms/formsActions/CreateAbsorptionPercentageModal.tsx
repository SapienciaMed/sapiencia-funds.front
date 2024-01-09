import { Fragment, memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  MultiSelects,
  SelectComponent,
} from "../../../../common/components/Form";
import { useCreateAbsorptionPercentageModal } from "../../hooks/createAbsorptionPercentage";
import { Controller } from "react-hook-form";
import { InputNumberComponent } from "../../../../common/components/Form/input-number.component";

const CreateAbsorptionPercentage = ({ announcementId, reloadTable }) => {
  const {
    errors,
    control,
    isValid,
    onSubmit,
    register,
    handleCancel,
    submitDisabled,
    communeFundData,
    handleChange,
    budgetList,
    handleChangeResource,
  } = useCreateAbsorptionPercentageModal(announcementId, reloadTable);
  return (
    <FormComponent
      id="CreateAbsorptionPercentageModal"
      className="form-signIn"
      action={onSubmit}
    >
      <div className="container-form-grid-actas">
        <div className="container-form padding-form">
          <span className="text-black large bold grid-span-3-columns  ml-18px ">
            Agregar ítem
          </span>

          <div className="grid-form-4-container mr-0px ml--2px padding-form container-form">
            <MultiSelects
              idInput={"id_comuna"}
              control={control}
              errors={errors}
              data={budgetList}
              label={
                <>
                  Fondo comuna <span>*</span>
                </>
              }
              className={
                "select-basic medium select-disabled-list input-basic input-regular"
              }
              classNameLabel="text-black big bold"
              placeholder="Seleccionar"
              filter={true}
            />
          </div>

          <div className="mt--25px" style={{ display: "flex" }}>
            <div className="grid-form-4-container display-flex-direction-column  ml--2px padding-form container-form">
              <span className="text-black biggest  ">Valores</span>

              <div className="grid-form-4-container ">
                <Controller
                  control={control}
                  name="resource"
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput="resource"
                        label={
                          <>
                            Recurso <span>*</span>
                          </>
                        }
                        typeInput="text"
                        register={register}
                        onChange={handleChangeResource}
                        errors={errors}
                        className="input-basic medium"
                        classNameLabel="text-black big bold"
                        {...field}
                      />
                    );
                  }}
                />

                <InputNumberComponent
                  idInput="sceneryPercentage1"
                  control={control}
                  errors={errors}
                  label={<>Escenario 1</>}
                  classNameLabel="text-black big bold text-required"
                  className="inputNumber-basic medium "
                  mode="decimal"
                  prefix="% "
                  maxFractionDigits={2}
                  min={0}
                />

                <InputNumberComponent
                  idInput="sceneryPercentage2"
                  control={control}
                  errors={errors}
                  label={<>Escenario 2</>}
                  classNameLabel="text-black big bold text-required"
                  className="inputNumber-basic medium "
                  mode="decimal"
                  prefix="% "
                  maxFractionDigits={2}
                  min={0}
                />
                <InputNumberComponent
                  idInput="sceneryPercentage3"
                  control={control}
                  errors={errors}
                  label={<>Escenario 3</>}
                  classNameLabel="text-black big bold text-required"
                  className="inputNumber-basic medium "
                  mode="decimal"
                  prefix="% "
                  maxFractionDigits={2}
                  min={0}
                />
              </div>
            </div>
            <div className="mt-27px">
              <SelectComponent
                idInput="communeFundId"
                control={control}
                errors={errors}
                data={communeFundData}
                label={
                  <>
                    Fondo comuna <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione."
                filter
              />
            </div>
          </div>

          <div className="grid-form-4-container display-flex-direction-column  ml--2px mr-0px padding-form container-form">
            <span className="text-black biggest  ">Porcentajes escenarios</span>

            <div className="grid-form-3-container ">
              <InputComponent
                idInput="sceneryValue1"
                disabled
                label={
                  <>
                    Valor escenario 1 <span>*</span>
                  </>
                }
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput="sceneryValue2"
                disabled
                label={
                  <>
                    Valor escenario 2 <span>*</span>
                  </>
                }
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput="sceneryValue3"
                disabled
                label={
                  <>
                    Valor escenario 3 <span>*</span>
                  </>
                }
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="button-save-container-display mr-21px">
        <ButtonComponent
          value="Cancelar"
          className="button-clean bold"
          type="button"
          action={handleCancel}
        />
        <ButtonComponent
          value="Guardar"
          className={`button-save ${
            !isValid || submitDisabled ? "disabled-black" : ""
          } big`}
          type="submit"
          disabled={!isValid || submitDisabled}
        />
      </div>
    </FormComponent>
  );
};
export default CreateAbsorptionPercentage;
