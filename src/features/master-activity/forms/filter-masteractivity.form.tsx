import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import {
  FormComponent,
  SelectComponent,
  InputComponent,
  ButtonComponent,
} from "../../../common/components/Form";

import { SelectComponentOld } from "../../../common/components/Form/select.component.old";

import {
  Control,
  FieldValues,
  FormState,
  Controller,
} from "react-hook-form";

import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { IMasterActivityFilter, IMasterActivity } from "../../../common/interfaces/funds.interfaces";
import useSearchMasterHook from "../hooks/search-master-activity.hook";
import TableComponent from "../../../common/components/table.component";
import { EDirection } from "../../../common/constants/input.enum";


export const FilterMasterActivityForm = () =>{

  const {    
    register,
    reset,
    control,
    errors,
    onSubmit,
    redirectCreate,
    formValues,
    showTable,
    activity,
    tableComponentRef,
    tableColumns,
    tableActions,
  
  } = useSearchMasterHook()

  return (
    <div className="container-sections-forms">
      <div className="title-area">
        <label className="text-black extra-large bold">Maestro actividad</label>

        <div
          className="title-button text-main biggest pointer"
          onClick={redirectCreate}
        >
          Crear maestro actividad <AiOutlinePlusCircle />
        </div>
      </div>

      <div>
      <FormComponent className="form-signIn" id="useQueryForm" action={onSubmit}>
          <div className="grid-form-3-container gap-25">
            <SelectComponentOld
              direction={EDirection.column}
              errors={errors}
              idInput={"name"}
              data={activity}
              register={register}
              label={"Actividad"}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />
          </div>
       
      </FormComponent>
      <div className="container-button-core-consultar">
              <div className="button-save-container-display">
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
                  form="useQueryForm"
                  value="Buscar"
                  type="submit"
                  className="button-search"
                /> 
              </div>
        </div>
      


      <div className="container-sections-forms">
            <TableComponent
              ref={tableComponentRef}
              url={`${process.env.urlApiFunds}/api/v1/activities/get-paginated`}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={true}
              titleMessageModalNoResult="Usuario no existe"
              descriptionModalNoResult="El usuario no existe en el sistema. 
              Haga clic en el botón Crear usuario"
            />
          </div>
      
      </div>
    </div>
  );
};
