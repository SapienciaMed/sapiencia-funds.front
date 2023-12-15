import React, { Fragment } from 'react'
import { ButtonComponent, FormComponent, SelectComponent } from '../../../common/components/Form';
import useRemnants from '../hooks/remnants.hook';
import Svgs from '../../../public/images/icons/svgs';

const RemnantsPage = () => {

    const { control, errors, register } = useRemnants();

    const select1 = [{ value: 1, name: "prueba" }]

    return (
        <Fragment>
            <div className="container-sections-forms mt-24px ml-14px mr-14px p-0">
                <FormComponent
                    id="searchAccountStatementForm"
                    className="form-signIn"
                    action={""}
                >
                    <span className="text-black extra-large medium grid-span-4-columns mt-15px ml-5px">
                        Remanentes
                    </span>

                    <div className=" container-sections-forms ml-5px mr-5px">
                        <div className="grid-form-3-container mb-24px">
                            <SelectComponent
                                idInput="announcementId"
                                control={control}
                                errors={errors}
                                data={select1}
                                label={
                                    <div className="mb-1px">
                                        Convocatoria <span>*</span>
                                    </div>
                                }
                                className="select-basic medium select-disabled-list mb-24px"
                                classNameLabel="text-black big bold"
                                placeholder="Seleccionar"
                                filter
                            />

                            <SelectComponent
                                idInput="announcementId"
                                control={control}
                                errors={errors}
                                data={select1}
                                label={
                                    <div className="mb-1px">
                                        ID fondo <span>*</span>
                                    </div>
                                }
                                className="select-basic medium select-disabled-list mb-24px"
                                classNameLabel="text-black big bold"
                                placeholder="Seleccionar"
                                filter
                            />
                            <SelectComponent
                                idInput="announcementId"
                                control={control}
                                errors={errors}
                                data={select1}
                                label={
                                    <div className="mb-1px">
                                        Fiducia <span>*</span>
                                    </div>
                                }
                                className="select-basic medium select-disabled-list mb-14px"
                                classNameLabel="text-black big bold"
                                placeholder="Seleccionar"
                                filter
                            />
                        </div>
                    </div>
                </FormComponent>
            </div>
            <div className="button-save-container-display-remanentes">                
                <ButtonComponent
                    form="createMasterForm"
                    value="Buscar"
                    type="submit"
                    className="button-save large disabled-black"
                />
            </div>

            
            {/* aqui va la tabla */}



            {/* ********************* */}



            <div className="button-save-container-display mr-8px">
            <ButtonComponent
              value={
                <>
                  <div className="container-buttonText">
                    <span>Descargar</span>
                    <Svgs svg="excel" width={23.593} height={28.505} />
                  </div>
                </>
              }
              className="button-download large "
              //action={downloadCollection}
            />
          </div>
        </Fragment>
    )
}

export default React.memo(RemnantsPage);


/* 
    <label className="text-black extra-large medium">
            Visualizar informe renovación
          </label>

*/