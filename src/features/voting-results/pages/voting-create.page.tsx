import React, { Fragment, useContext } from "react";
import { useVotingResults } from "../hooks/voting-create.hooks";
import { ButtonComponent, FormComponent, InputComponent } from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { EDirection } from "../../../common/constants/input.enum";
import { SelectComponentUser } from "../../../common/components/Form/select.component.user";
import TableComponent from "../../../common/components/table.component";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { IVotingSearcheResult } from "../../../common/interfaces/voting.interfaces";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";


const VotingResultsPage = () => {

  const {
    CancelFunction,
    onSubmitCreateVoting,
    register,
    errors,
    sending,
    deparmetList,
    addItem,
    tableComponentRef,
  } = useVotingResults();

  const navigate = useNavigate();
  const { validateActionAccess } = useContext(AppContext);

    const tableColumns: ITableElement<IVotingSearcheResult>[] = [
      {
        fieldName: "numberDocument",
        header: "Objetivo directo",
      },
      {
        fieldName: "Producto catalogo dnp",
        header: "Nombres y apellidos",
      },
      {
        fieldName: "email",
        header: "ódigo catalogo dnp",
      },
      {
        fieldName: "profile",
        header: "Programa",
      },
      {
        fieldName: "profile",
        header: "Actividad",
      },
      {
        fieldName: "profile",
        header: "",
      },
  ];
  
    const tableActions: ITableAction<IVotingSearcheResult>[] = [
      {
        icon: "Detail",
        onClick: (row) => {
          navigate(`/core/usuarios/editar/${row.id}`);
        },
        hide: !validateActionAccess("USUARIOS_DETALLE"),
      },
      {
        icon: "Edit",
        onClick: (row) => {
          navigate(`/core/usuarios/editar/${row.id}`);
        },
        hide: !validateActionAccess("USUARIOS_EDITAR"),
      },
      {
        icon: "Delete",
        onClick: (row) => {},
        hide: !validateActionAccess("USUARIOS_ELIMINAR"),
      }
    ];

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

            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiAuth}/api/v1/voting/search`}
              columns={tableColumns}
              actions={tableActions}
              titleMessageModalNoResult="Registro no existente"
              descriptionModalNoResult="EL registro no existe en el sistema."
              isShowModal={true}
            />
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
