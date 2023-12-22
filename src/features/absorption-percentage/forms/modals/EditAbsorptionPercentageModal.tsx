import { Fragment, memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { useEditAbsorptionPercentageModal } from "../../hooks/editAbsorptionPercentage";
import { InputNumberComponent } from "../../../../common/components/Form/input-number.component";
import { Controller } from "react-hook-form";

const EditAbsorptionPercentageModal = ({
  announcementId,
  row,
  reloadTable,
}) => {
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
  } = useEditAbsorptionPercentageModal(announcementId, row, reloadTable);
  return (
    <FormComponent
      id="EditAbsorptionPercentageModal"
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
              placeholder="Seleccionar"
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
                  onChange={handleChange}
                  errors={errors}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  {...field}
                />
                );
              }}
            />
            <Controller
              control={control}
              name="sceneryPercentage1"
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput="sceneryPercentage1"
                    label={
                      <>
                        Escenario 1 <span>*</span>
                      </>
                    }
                    typeInput="text"
                    register={register}
                    errors={errors}
                    onChange={handleChange}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                    {...field}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="sceneryPercentage2"
              render={({ field }) => {
                return (
                  <InputComponent
                  idInput="sceneryPercentage2"
                  label={
                    <>
                      Escenario 2 <span>*</span>
                    </>
                  }
                  typeInput="text"
                  register={register}
                  errors={errors}
                  onChange={handleChange}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  {...field}
                />
                );
              }}
            />
          </div>
          <div className="grid-form-4-container gap-25 mt-13px">
          <Controller
              control={control}
              name="sceneryPercentage3"
              render={({ field }) => {
                return (
                  <InputComponent
                  idInput="sceneryPercentage3"
                  label={
                    <>
                      Escenario 3 <span>*</span>
                    </>
                  }
                  typeInput="text"
                  errors={errors}
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  onChange={handleChange}
                  {...field}
                />
                );
              }}
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
export default EditAbsorptionPercentageModal;
