import React, { Fragment } from "react";
import { useVotingResults } from "../hooks/voting-results.hooks";
import { ButtonComponent, FormComponent, InputComponent } from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { EDirection } from "../../../common/constants/input.enum";
import { SelectComponentUser } from "../../../common/components/Form/select.component.user";


const VotingResultsPage = () => {

  const { CancelFunction, onSubmitSignIn, register, errors, sending } =
    useVotingResults();

  return (
    <Fragment>
      <div className="full-height container-form-grid">
        <div className="container-form">
          <p className="text-black huge ml-24px">Crear usuario del sistema</p>
          <div>
            <FormComponent
              id="createUserForm"
              className="form-signIn"
              action={onSubmitSignIn}
            >
              <div className="grid-form-4-container gap-25 container-sections-forms">
                <span className="text-black large bold grid-span-4-columns">
                  Datos personales
                </span>
                <div className="">
                  <div className="display-justify-space-between">
                    <SelectComponentOld
                      idInput="typeDocument"
                      label="Tipo"
                      register={register}
                      className="select-basic medium "
                      placeholder="Tipo"
                      data={[]}
                      value={null}
                      classNameLabel="text-black big text-required bold"
                      direction={EDirection.column}
                      errors={errors}
                    />
                    <InputComponent
                      idInput="numberDocument"
                      className="input-basic medium form-group"
                      typeInput="number"
                      label="No. documento"
                      register={register}
                      classNameLabel="text-black big text-required bold "
                      direction={EDirection.column}
                      errors={errors}
                      placeholder={""}
                    />
                  </div>
                </div>

                <InputComponent
                  idInput="names"
                  className="input-basic medium form-group"
                  typeInput="text"
                  label="Nombres"
                  register={register}
                  classNameLabel="text-black big text-required bold "
                  direction={EDirection.column}
                  errors={errors}
                  placeholder={""}
                />

                <InputComponent
                  idInput="lastNames"
                  className="input-basic medium form-group"
                  typeInput="text"
                  label="Apellidos"
                  register={register}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                  placeholder={""}
                />

                <SelectComponentOld
                  idInput="gender"
                  register={register}
                  className="select-basic medium"
                  placeholder="Seleccionar"
                  label="G&eacute;nero"
                  data={[]}
                  value={null}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                />
                <InputComponent
                  idInput="email"
                  className="input-basic medium form-group"
                  typeInput="email"
                  label="Correo electr&oacute;nico"
                  register={register}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                  placeholder={""}
                />

                <InputComponent
                  idInput="numberContact1"
                  className="input-basic medium form-group"
                  typeInput="phone"
                  label="Celular"
                  register={register}
                  classNameLabel="text-black big bold"
                  direction={EDirection.column}
                  errors={errors}
                  placeholder={""}
                />
              </div>

              <div className="grid-form-4-container gap-25 container-sections-forms">
                <span className="text-black large bold grid-span-4-columns ">
                  Información de localización
                </span>
                <InputComponent
                  idInput="address"
                  className="input-basic medium form-group"
                  typeInput="text"
                  label="Direcci&oacute;n"
                  register={register}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                  placeholder={""}
                />
                {/* <SelectComponentUser
                  idInput="deparmentCode"
                  register={register}
                  className="select-basic medium "
                  placeholder="Seleccione"
                  label="Departamento"
                  data={[{}]}
                  setValue={setDeparment}
                  value={null}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                />
                <SelectComponentUser
                  idInput="townCode"
                  register={register}
                  className="select-basic medium "
                  placeholder="Seleccione"
                  label="Municipio"
                  data={[{}]}
                  setValue={setTown}
                  value={null}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                /> */}

                <InputComponent
                  idInput="neighborhood"
                  register={register}
                  className="input-basic medium "
                  placeholder={""}
                  label="Barrio"
                  typeInput="text"
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                />
              </div>
            </FormComponent>
          </div>
        </div>

        <div>
          <hr />
        </div>

        <div className="button-save-container-display-users">
          <ButtonComponent
            form="createUserForm"
            value="Cancelar"
            type="button"
            className="button-cancel-text large hover-three disabled-black"
            action={() => CancelFunction()}
            disabled={sending}
          />
          <ButtonComponent
            form="createUserForm"
            value="Guardar"
            type="submit"
            className="button-save large disabled-black"
            disabled={sending}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(VotingResultsPage);
