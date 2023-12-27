import { Fragment, memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { useEditLegalAuditFundsModal } from "../../hooks/editLegalAuditFunds";
import { DatePickerComponent } from "../../../../common/components/Form/input-date.component";
import { Controller } from "react-hook-form";

const EditLegalAuditFundsModal = ({ announcementId, row, reloadTable }) => {
  const {
    errors,
    control,
    isValid,
    onSubmit,
    register,
    handleCancel,
    submitDisabled,
  } = useEditLegalAuditFundsModal(announcementId, row, reloadTable);
  return (
    <FormComponent
      id="EditLegalAuditFundsModal"
      className="form-signIn"
      action={onSubmit}
    >
      <div className="container-form-grid-actas">
        <div className="container-form padding-form">
          <div className="grid-form-3-container  gap-25 mb-25px">
            <Controller
              control={control}
              name="communeFundId"
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput="communeFundId"
                    label={
                      <>
                        ID comuna <span>*</span>
                      </>
                    }
                    typeInput="text"
                    register={register}
                    errors={errors}
                    className="input-basic medium"
                    disabled
                    classNameLabel="text-black big bold"
                    {...field}
                  />
                );
              }}
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
              name="fiduciaryName"
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput="fiduciaryName"
                    label={
                      <>
                        Fiducia <span>*</span>
                      </>
                    }
                    typeInput="number"
                    register={register}
                    errors={errors}
                    className="input-basic medium"
                    disabled
                    classNameLabel="text-black big bold"
                    {...field}
                  />
                );
              }}
            />
          </div>
          <div className="grid-form-3-container gap-25 mt-13px">
            <DatePickerComponent
              idInput="update"
              errors={errors}
              control={control}
              label={<> Fecha de actualización</>}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium "
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
              maxDate={new Date()}
              disabled
            />
            <Controller
              control={control}
              name="order"
              render={({ field }) => {
                return (
                  <InputComponent
                    idInput="order"
                    label={
                      <>
                        Orden <span>*</span>
                      </>
                    }
                    typeInput="number"
                    register={register}
                    errors={errors}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                    {...field}
                  />
                );
              }}
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
export default EditLegalAuditFundsModal;
