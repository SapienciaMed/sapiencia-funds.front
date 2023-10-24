import React, { Fragment } from "react";
import { useVotingResults } from "../hooks/voting-create.hooks";
import { ButtonComponent, FormComponent, InputComponent } from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { EDirection } from "../../../common/constants/input.enum";
import { SelectComponentUser } from "../../../common/components/Form/select.component.user";


const VotingResultsPage = () => {

  const {
    CancelFunction,
    onSubmitCreateVoting,
    register,
    errors,
    sending,
    deparmetList,
    addItem,
  } = useVotingResults();

  return (
    <Fragment>
      <div className=" container-form-grid">
        <div className="container-form padding-form">
          <p className="text-black huge mg-0">Resultados votación</p>
          <div>
            <FormComponent
              id="createVotingForm"
              className="form-signIn"
              action={onSubmitCreateVoting}
            >
              <div className="grid-form-4-container gap-25 container-sections-forms alto-auto">
                <SelectComponentOld
                  idInput="communeNeighborhood"
                  register={register}
                  className="select-basic medium"
                  placeholder="Seleccionar"
                  label="Comuna y/o corregimiento "
                  data={deparmetList ? deparmetList : []}
                  value={null}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                />

                <InputComponent
                  idInput="numberProject"
                  className="input-basic medium form-group"
                  typeInput="number"
                  label="Número proyecto"
                  register={register}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                  placeholder={""}
                />

                <InputComponent
                  idInput="validity"
                  className="input-basic medium form-group"
                  typeInput="text"
                  label="Vigencia"
                  register={register}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                  placeholder={""}
                />

                <InputComponent
                  idInput="ideaProject"
                  className="input-basic medium form-group"
                  typeInput="text"
                  label="Idea de proyecto"
                  register={register}
                  classNameLabel="text-black big text-required bold"
                  direction={EDirection.column}
                  errors={errors}
                  placeholder={""}
                />
              </div>
            </FormComponent>

            <div className="button-save-container-display-users margin-right0">
              <ButtonComponent
                value="Agregar ítem"
                className="button-save large disabled-black"
                disabled={sending}
                action={() => {
                  addItem();
                }}
              />
            </div>
          </div>

          <div>
            <hr className="barra-spacing" />
          </div>

          <div className="button-save-container-display-users margin-right0">
            <ButtonComponent
              form="createVotingForm"
              value="Cancelar"
              type="button"
              className="button-cancel-text large hover-three disabled-black"
              action={() => CancelFunction()}
              disabled={sending}
            />
            <ButtonComponent
              form="createVotingForm"
              value="Guardar"
              type="submit"
              className="button-save large disabled-black"
              disabled={sending}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(VotingResultsPage);
