import React from "react";
import useSearchMasterHook from "../hooks/search-master-activity.hook";
import TableComponent from "../../../common/components/table.component";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Controller } from "react-hook-form";

const SearchMasterPage = (): React.JSX.Element => {
  const {
    control,
    formState,
    onSubmit,
    redirectCreate,
    formValues,
    showTable,
    activity,
    tableComponentRef,
    tableColumns,
    tableActions,
  } = useSearchMasterHook();

  const { errors, isValid } = formState;

  return (
    <div className="main-page">
      <div className="card-table">
        <div className="title-area">
          <label className="text-black extra-large medium">
            Consultar maestro actividad
          </label>
        </div>

        <div className="container-sections-forms">
          <div className="title-area">
            <label className="text-black large medium grid-span-4-columns">Maestro actividad</label>

            <div
              className="title-button text-three large"
              onClick={redirectCreate}
            >Crear maestro actividad <AiOutlinePlusCircle />
            </div>
          </div>

          <div>
            <FormComponent className="form-signIn" action={onSubmit}>
              <div className='grid-form-4-container mb-24px'>
                <Controller
                  control={control}
                  name={"name"}
                  render={({ field }) => {
                    return (
                      <InputComponent
                        idInput={field.name}
                        errors={errors}
                        typeInput={"text"}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        className="input-basic medium"
                        classNameLabel="text-black big medium"
                        label={
                          <>
                            Actividad
                          </>
                        }
                      />
                    );
                  }}
                />
              </div>

              <div className="button-save-container-display">
                <ButtonComponent
                  value={"Buscar"}
                  className="button-save disabled-black big"
                //disabled={!name}
                />
              </div>
            </FormComponent>
          </div>
        </div>

        {showTable && (
          <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiFunds}/api/v1/activities/get-paginated`}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(SearchMasterPage);
