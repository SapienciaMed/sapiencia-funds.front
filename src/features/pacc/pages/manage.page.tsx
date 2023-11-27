import React from "react";
import { ButtonComponent, InputComponent } from "../../../common/components/Form";
import { EDirection } from "../../../common/constants/input.enum";
import { useManage } from "../hook/manage.hook";
import { ProgressSpinner } from "primereact/progressspinner";


function ManagePage() {

    const { dataManager, showSpinner, onCancel  } =  useManage()
    
    return(
        <div className="main-page">
            <div className="card-table gap-0 mt-14px">
                <section className="title-area-2">
                    <div className="text-black extra-large">{dataManager.title}</div>
                </section>
                    {
                        showSpinner &&<ProgressSpinner style={{width: '25px', height: '25px'}}  animationDuration=".5s" />
                    }
                <section className="card-table mt-14px">
                    <div className="title-area-2">
                        <div className="text-black biggest">Información Beneficiario</div>
                    </div>
                    <section className='grid-form-4-container gap-15'>
                        <InputComponent
                            idInput={"idCredit"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Id Crédito"
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                            value={dataManager.beneficiaryInformationValues.idCredit}
                        />
                        <InputComponent
                            idInput={"document"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Documento"
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                            value={dataManager.beneficiaryInformationValues.document}
                        />
                        <div className="grid-span-2-columns">
                            <InputComponent
                                idInput={"name"}
                                className="input-basic medium"
                                typeInput="text"
                                label="Nombre"
                                classNameLabel="text-black big text-with-colons"
                                direction={EDirection.column}
                                disabled
                                value={dataManager.beneficiaryInformationValues.name}
                            />
                        </div>
                    </section>
                    <section className='grid-form-3-container gap-15 mt-14px'>
                        <InputComponent
                            idInput={"contactNumber"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Número de contacto"
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                            value={dataManager.beneficiaryInformationValues.contactNumber}
                        />
                        <InputComponent
                            idInput={"email"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Correo"
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                            value={dataManager.beneficiaryInformationValues.email}
                        />
                        <InputComponent
                            idInput={"program"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Programa"
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                            value={dataManager.beneficiaryInformationValues.program}
                        />
                    </section>
                    <section className='grid-form-3-container gap-15 mt-14px'>
                        <InputComponent
                            idInput={"draftsProjected"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Giros proyectados"
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                            value={dataManager.beneficiaryInformationValues.draftsProjected}
                        />
                        <InputComponent
                            idInput={"draftsPerformed"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Giros realizados"
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                            value={dataManager.beneficiaryInformationValues.draftsPerformed}
                        />
                        <InputComponent
                            idInput={"dateInput"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Fecha de ingreso"
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                            value={dataManager.beneficiaryInformationValues.dateInput}
                        />
                    </section>
                    <section className='grid-form-3-container gap-15 mt-14px'>
                        <InputComponent
                            idInput={"reasonCompletion"}
                            className="input-basic medium"
                            typeInput="text"
                            label="Motivo finalización"
                            classNameLabel="text-black big text-with-colons"
                            direction={EDirection.column}
                            disabled
                            value={dataManager.beneficiaryInformationValues.reasonCompletion}
                        />
                    </section>
                </section>
                {
                    dataManager.component ? dataManager.component : <></>
                }
            </div>
            <div className="funcionality-buttons-container">
                <ButtonComponent
                    value="Cancelar"
                    type="button"
                    className="button-clean-fields bold"
                    action={onCancel}
                />
                <ButtonComponent
                    className="button-main huge hover-three"
                    value="Guardar"
                    type="submit"
                    form="acta-form"
                />
            </div>
        </div>
    )
}

export default React.memo(ManagePage)