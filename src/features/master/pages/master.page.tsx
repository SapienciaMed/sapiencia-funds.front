import React, { Fragment, useContext } from "react";
import { ButtonComponent, FormComponent, SelectComponent } from "../../../common/components/Form";
import useMasterConsult from "../hooks/master-consult.hook";
import { BiPlusCircle } from 'react-icons/bi';
import { AppContext } from "../../../common/contexts/app.context";
import TableComponent from "../../../common/components/table.component";
import { AiOutlinePlusCircle } from "react-icons/ai";



const MasterPage = () => {

    const { validateActionAccess } = useContext(AppContext);
    const { typeMasterList, control, errors, register, setValue, navigate, tableComponentRef, showTable, tableActions, tableColumns, setShowTable, onSubmit, reset } = useMasterConsult();

    return (
        <Fragment>
            <div className="title-area">
                <p className="text-black huge ml-24px mt-20px mg-0">Consultar maestro</p>

            </div>
            <div className="container-form-grid">
                <div className="container-form padding-form">
                    <div>
                        <FormComponent id="createMasterForm" className="form-signIn" action={onSubmit}>
                            <div className="title-area">
                                <label className="text-black large bold grid-span-4-columns"></label>

                                {validateActionAccess('MAESTROS_CREAR') && (
                                    <div className="title-button-users text-three biggest" onClick={() => { navigate('../crear') }}>
                                        Crear maestro <AiOutlinePlusCircle />
                                    </div>
                                    
                                )}

                            </div>
                            <div className='grid-form-4-container mb-24px'>
                                <SelectComponent
                                    idInput={"codtlmo"}
                                    control={control}

                                    errors={errors}
                                    data={typeMasterList}
                                    label={
                                        <>
                                            Tipo maestro <span>*</span>
                                        </>
                                    }
                                    className="select-basic medium select-disabled-list"
                                    classNameLabel="text-black biggest"
                                    filter={true}
                                    placeholder="Seleccione."
                                />
                            </div>
                        </FormComponent>
                    </div>
                </div>
                <div className="button-save-container-display-maestros margin-right0 mr-24px button-container">
                    <ButtonComponent
                        form="createMasterForm"
                        value="Limpiar"
                        type="button"
                        className="button-cancel-text large hover-three disabled-black"
                        action={() => {
                            reset()
                            if (showTable) {
                                tableComponentRef.current.emptyData();
                                setShowTable(false)
                            }
                        }}
                    />
                    <ButtonComponent
                        form="createMasterForm"
                        value="Buscar"
                        type="submit"
                        className="button-save large disabled-black"
                    />
                </div>
            </div>

            {
                showTable &&
                <div className="container-form-grid mt-24px">
                    <div className="container-form padding-form">
                        <TableComponent
                            ref={tableComponentRef}
                            url={`${process.env.urlApiFunds}/api/v1/master/get-paginated`}
                            columns={tableColumns}
                            actions={tableActions}
                            isShowModal={true}

                        />
                    </div>
                </div>
            }
        </Fragment>
    )
}


export default React.memo(MasterPage);