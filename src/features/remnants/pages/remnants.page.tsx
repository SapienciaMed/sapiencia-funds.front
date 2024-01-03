import React, { Fragment } from 'react'
import { ButtonComponent, FormComponent, MultiSelects, SelectComponent } from '../../../common/components/Form';
import useRemnants from '../hooks/remnants.hook';
import Svgs from '../../../public/images/icons/svgs';
import TableComponent from '../../../common/components/table.component';

const RemnantsPage = () => {

    const { control, errors, register, onSubmit, announcementList, fundList, fiduciaList, tableComponentRef, tableColumns, tableActions, showTable, downloadCollection, showDownload, setShowTable, reset, setShowDownload } = useRemnants();

    return (
        <Fragment>
            <div className="container-sections-forms mt-24px ml-14px mr-14px p-0">
                <FormComponent id="searchRemnantsForm" className="form-signIn" action={onSubmit}>
                    <span className="text-black extra-large medium grid-span-4-columns mt-15px ml-5px">
                        Excedentes de Contratos
                    </span>

                    <div className=" container-sections-forms ml-5px mr-5px">
                        <div className="grid-form-3-container mb-24px ">
                            <div className="spacing-remanents">
                                <MultiSelects
                                    idInput="fund"
                                    control={control}
                                    errors={errors}
                                    data={fundList}
                                    label="Línea de crédito"
                                    className={
                                        "select-basic medium select-disabled-list input-basic input-regular"
                                    }
                                    classNameLabel="text-black big text-required bold"
                                    placeholder="Seleccionar"
                                    filter={true}
                                />
                            </div>
                            <div className="spacing-remanents">
                                <MultiSelects
                                    idInput="announcement"
                                    control={control}
                                    errors={errors}
                                    data={announcementList ? announcementList : []}
                                    label="Convocatoria"
                                    className={
                                        "select-basic medium select-disabled-list input-basic input-regular"
                                    }
                                    classNameLabel="text-black big text-required bold"
                                    placeholder="Seleccionar"
                                    filter={true}
                                />
                            </div>
                        </div>
                    </div>
                </FormComponent>
            </div>
            <div className="button-save-container-display-remanentes">
                <ButtonComponent
                    form="searchRemnantsForm"
                    value="Limpiar campos"
                    type="button"
                    className="button-cancel-text large hover-three disabled-black"
                    action={() => {
                        reset()
                        if (showTable) {
                            tableComponentRef.current.emptyData();
                            setShowDownload(false)
                            setShowTable(false)
                        }
                    }}
                />
                <ButtonComponent
                    form="searchRemnantsForm"
                    value="Buscar"
                    type="submit"
                    className="button-save large disabled-black"
                />
            </div>



            {
                showTable &&
                <div className="container-form-grid-remants mt-24px">
                    <div className="container-form padding-form">
                        <TableComponent
                            ref={tableComponentRef}
                            url={`${process.env.urlApiFunds}/api/v1/surplus-contracts/get-all-paginated`}
                            columns={tableColumns}
                            actions={tableActions}
                            titleMessageModalNoResult="El remanente no existe"
                            descriptionModalNoResult="No se encontraron resultados"
                            isShowModal={true}
                            classSizeTable="size-table-wd-550"
                            isMobil={false}


                        />
                    </div>
                </div>

            }

            {
                showDownload &&
                <div className="button-save-container-display mr-8px mb-20px">
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
                        action={downloadCollection}
                    />
                </div>
            }



        </Fragment>
    )
}

export default React.memo(RemnantsPage);

