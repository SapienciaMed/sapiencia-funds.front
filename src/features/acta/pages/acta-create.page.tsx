import React, { Fragment } from "react";
import { ButtonComponent, FormComponent, InputComponent } from "../../../common/components/Form";
import useActaCreate from "../hooks/acta-create.hook";
import useActaItems from "../hooks/items.hook";
import TableGridComponent from "../../../common/components/tableGrid.component";


const ActaCreatePage = () => {

    const datoss = [
        {
            program: 1,
        }
    ]

    const { errors, register,onsubmitItem,showTable,tableActions,tableColumns, tableComponentRef, datos } = useActaCreate();

    console.log("asi llegan los datos",datos)
  

    return (
        <Fragment>
            <div className="title-area">
                <p className="text-black huge ml-24px mt-20px mg-0">Acta</p>
            </div>
            <FormComponent id="createActaForm" className="form" action={onsubmitItem}>
                <div className="container-form-grid-actas">
                    <div className="container-form padding-form">
                        <div>
                            <div className="title-area">
                                <label className="text-black extra-large grid-span-4-columns mb-18px">Crear acta</label>
                            </div>
                            <div className='grid-form-3-container'>
                                <InputComponent
                                    idInput={"idStatus"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Estado"
                                    register={register}
                                    classNameLabel="text-black biggest"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                    disabled
                                />
                                <InputComponent
                                    idInput={"numberProject"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Número proyecto"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                />
                                <InputComponent
                                    idInput={"periodVigency"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Periodos por vigencia"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                />
                            </div>
                            <div className='grid-form-3-container mt-20px'>
                                <InputComponent
                                    idInput={"announcementInitial"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Convocatoria inicial"
                                    register={register}
                                    classNameLabel="text-black biggest text-required"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                />
                                <InputComponent
                                    idInput={"salaryMin"}
                                    className="input-basic medium"
                                    typeInput="text"
                                    label="Salario mínimo"
                                    register={register}
                                    classNameLabel="text-black biggest"
                                    //direction={EDirection.column}
                                    errors={errors}
                                    placeholder={""}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="container-form padding-form">
                        <div>
                        <div className="title-area">
                            <label className="text-black extra-large grid-span-4-columns mb-18px">Tasas</label>
                        </div>
                        <div className='grid-form-3-container mb-24px'>
                            <InputComponent
                                idInput={"costsExpenses"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Costo y gastos de operación logística"
                                //register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                            />
                            <InputComponent
                                idInput={"OperatorCommission"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Comisión operador financiero"
                                register={register}
                                classNameLabel="text-black biggest text-required"
                                //direction={EDirection.column}
                                errors={errors}
                                placeholder={""}
                            />
                            <InputComponent
                                idInput={"financialOperation"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Operación finaciera MB"
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
                        form="createActaForm"
                        value="Agregar item"
                        type="submit"
                        className="button-save large disabled-black"                    
                    />
                </div>



                <div className="container-form-grid mt-24px">
                    <div className="container-form padding-form">
                        <TableGridComponent
                            ref={tableComponentRef}
                            data={{
                                data: datos, 
                                pagingInfo: {
                                    total: datos.length,                                    
                                }
                            }}
                            columns={tableColumns}
                            actions={tableActions}
                            isShowModal={true}

                        />
                    </div>
                </div>


                

        </Fragment>

    )
}

export default React.memo(ActaCreatePage);