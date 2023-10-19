import React, { Fragment, useContext } from "react";
import { ButtonComponent, FormComponent, InputComponent } from "../../../common/components/Form";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import BasicTableComponent from "../../../common/components/basic-table.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { ITableAction, ITableElement } from "../../../common/interfaces/table.interfaces";
import { IVotingSearcheResult } from "../../../common/interfaces/voting.interfaces";
import { useVotingResultsSearch } from "../hooks/voting-search.hooks";
import { EDirection } from "../../../common/constants/input.enum";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../common/contexts/app.context";
import TableComponent from "../../../common/components/table.component";
import { AiOutlinePlusCircle } from "react-icons/ai";


const VotingResultsSearchPage = () => {
  const {
    CancelFunction,
    onSubmitSearchVoting,
    register,
    errors,
    sending,
    tableComponentRef,
    deparmetList,
    setValCommuneNeighborhood,
    reset,
  } = useVotingResultsSearch();

    const navigate = useNavigate();
  const { validateActionAccess } = useContext(AppContext);


  const tableColumns: ITableElement<IVotingSearcheResult>[] = [
    {
      fieldName: "aimStraight",
      header: "Objetivo directo",
    },
    {
      fieldName: "productCatalogueDnp",
      header: "Producto catalogo dnp",
    },
    {
      fieldName: "codProductgueDnp",
      header: "Código catalogo dnp",
    },
    {
      fieldName: "codPmaProgram",
      header: "Programa",
    },
    {
      fieldName: "codMtaTeacherActivity",
      header: "Actividad",
    },
    {
      fieldName: "activityValue",
      header: "Valor Actividad",
    },
    {
      fieldName: "amount",
      header: "Cantidad",
    },
    {
      fieldName: "costTotal",
      header: "Costo Total",
    },
    {
      fieldName: "percentage123",
      header: "Porcentaje 123",
    },
    {
      fieldName: "percentage456",
      header: "Porcentaje 456",
    },
  ];

    const tableActions: ITableAction<IVotingSearcheResult>[] = [
      {
        icon: "Edit",
        onClick: (row) => {
          navigate(`/core/usuarios/editar/${row.id}`);
        },
        hide: !validateActionAccess("USUARIOS_EDITAR"),
      },
    ];

  return (
    <Fragment>
      <div className=" container-form-grid">
        <div className="container-form padding-form">
          <p className="text-black huge mg-0">Resultados votación</p>

          <div className="card-user">
            <div className="card-table-user">
              <div className="title-area">
                <label className="text-black large medium grid-span-4-columns"></label>

                <div
                  className="title-button text-three large"
                  onClick={() => {
                    navigate("/fondos/resultados-votacion/crear");
                  }}
                >
                  Crear resultado de votación <AiOutlinePlusCircle />
                </div>
              </div>

              <FormComponent
                id="createVotingForm"
                className="form-signIn"
                action={onSubmitSearchVoting}
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
                    setValue={setValCommuneNeighborhood}
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
            </div>
            <div className="button-save-container-display-users margin-right0">
              <ButtonComponent
                form="useQueryForm"
                value="Limpiar campos"
                type="button"
                className="button-clean-fields "
                action={() => {
                  reset();
                  tableComponentRef.current.emptyData();
                }}
              />
              <ButtonComponent
                form="createVotingForm"
                value="Buscar"
                type="submit"
                className="button-save large disabled-black"
                disabled={sending}
              />
            </div>
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiFunds}/api/v1/voting/get-paginated`}
              columns={tableColumns}
              actions={tableActions}
              titleMessageModalNoResult="La votación no existe"
              descriptionModalNoResult="La votación no existe en el sistema. 
              Haga clic en el botón crear votación"
              isShowModal={true}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(VotingResultsSearchPage);
