import { Fragment, memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
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
          <div className="grid-form-4-container  gap-25 mb-25px">
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
          </div>
          <div className="grid-form-4-container gap-25 mt-13px">
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
