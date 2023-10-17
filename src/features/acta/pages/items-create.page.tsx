import React, { Fragment } from "react";
import { ButtonComponent, FormComponent, InputComponent, SelectComponent } from "../../../common/components/Form";
import useActaItems from "../hooks/items.hook";
import TableGridComponent from "../../../common/components/tableGrid.component";
import useActaCreate from "../hooks/acta-create.hook";


const ItemsCreatePage = ({action, acta}) => {

    const { errors, register,onsubmitAddItem, showTable, tableComponentRef, datos,control,typeProgram } = useActaItems(action, acta); 

  
    return (
        <Fragment>
            <FormComponent id="createItemsForm" className="form" action={onsubmitAddItem}>                
                <div className="container-form-grid-actas">
                    <div className="container-form padding-form">
                        <div>
                            <div className='grid-form-3-container'>                              
                                 <SelectComponent
                                    idInput={"program"}
                                    control={control}

                                    errors={errors}
                                    data={typeProgram}
                                    label={
                                        <>
                                            Programa <span>*</span>
                                        </>
                                    }
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel="text-black biggest bold"
                                    filter={true}
                                    placeholder="Seleccione."                                    
                                />
                                <InputComponent
                                    idInput={"found"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Fondo"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                />
                                <InputComponent
                                    idInput={"line"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Linea"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </FormComponent>
            <div className="button-save-container-display-maestros margin-right0 mr-24px">
                    <ButtonComponent
                        form="createItemsForm"
                        value="Cancelar"
                        type="button"
                        className="button-cancel-text large hover-three disabled-black"
                        //action={() => CancelFunction()}                    
                    />
                    <ButtonComponent
                        form="createItemsForm"
                        value="Aceptar"
                        type="submit"
                        className="button-save large disabled-black"                    
                    />
                </div>



               
            
            {/*     <div className="container-form-grid mt-24px">
                    <div className="container-form padding-form">
                        <TableGridComponent
                            ref={tableComponentRef}
                            data={{
                                data: datos,  // Aquí pasas tu array de datos
                                pagingInfo: {
                                    total: datos.length,                                    
                                }
                            }}
                            columns={tableColumns}
                            actions={tableActions}
                            isShowModal={true}

                        />
                    </div>
                </div> */}
        </Fragment>
    )
}

export default React.memo(ItemsCreatePage);