import Acordion from "../components/acordion";
import SwitchComponent from "../../../common/components/Form/switch.component";
import { SelectComponentOld } from "../../../common/components/Form/select.component.old";
import { Control, FieldErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ButtonComponent,InputComponent } from "../../../common/components/Form";
import TableJson from "../components/tableJson";
import { LIST_DATA_GRACE_PERIOD } from "../service";
import { IReglamentConsolidation, IRegulationSearch } from "../../../common/interfaces/regulation";
import RequirementOnlyView from "./modules/requeriments/RequirementOnlyView";
interface IPropDetailReglament{
  isOpen: boolean;
  detailData: IReglamentConsolidation;
  listPrograms: any[];
  errors: FieldErrors<IRegulationSearch>;
  control: Control<IRegulationSearch, any>;
  onClose: () => void;
  setValue: UseFormSetValue<IRegulationSearch>
  getValues: UseFormGetValues<IRegulationSearch>
}

const DetailReglament = ({ isOpen, onClose, detailData, setValue, getValues, listPrograms, errors, control }: IPropDetailReglament) => {
  if (!isOpen || !detailData) return null

  const preventClick = (e) => { return e.preventDefault() }

  return (
    <div className="modal-overlay">
      <div className="modal-reglament">
        <button className="modal-close-button" onClick={onClose}>
          X
        </button>
        <p className="title-modal-reglament">Detalle Reglamento</p>
        <div className="container-modal-body">
          <Acordion
            title="Configuración inicial"
            classname="container-modal-acordion-title"
            onClick={async () => {}}
            switchElement={<></>}
            iconRow={true}
          >
            <>
              <div className="containerProgram mb-24px">
                <SelectComponentOld
                  idInput={"program"}
                  value={String(detailData?.idProgram) ?? ""}
                  disabled={true}
                  data={listPrograms}
                  label='Programa'
                  className="select-basic select-disabled-list input-size"
                  classNameLabel="text-black biggest font-500"
                  placeholder="Seleccionar"
                />
              </div>
              <div className="containerGroup mb-24px">
                <div className="containerInitialPeriod ">
                  <InputComponent
                    idInput='initialPeriod'
                    disabled={true}
                    defaultValue={detailData?.initialPeriod ?? '0'}
                    typeInput="text"
                    value={detailData?.initialPeriod}
                    className="input-basic input-size"
                    classNameLabel="text-black biggest font-500"
                    label="Periodo inicial de convocatoria"
                  />
                </div>
                <div className="containerIsOpenPeriod">
                  <SwitchComponent
                    idInput={"isOpenPeriod"}
                    defaultValue={detailData?.isOpenPeriod == 1}
                    size="normal"
                    control={control}
                    disabled={true}
                    label={<>Convocatoria abierta</>}
                    className="select-basic select-disabled-list input-size"
                    classNameLabel="text-black biggest font-500"
                  />
                </div>

                <div className="containerEndPeriod">
                  <InputComponent
                    idInput='endPeriod'
                    disabled={true}
                    defaultValue={detailData?.endPeriod ?? '0'}
                    typeInput="text"
                    value={detailData?.endPeriod}
                    className="input-basic input-size"
                    classNameLabel="text-black biggest font-500"
                    label='Periodo final de convocatoria'
                  />
                </div>
              </div>
              <div onClick={preventClick}>
                <Acordion
                  title="¿Aplica porcentaje de pago teórico semestral?"
                  isOpen={detailData?.applyTheoreticalSemiannualPercent == 1}
                  onClick={() => {}}
                  onlyView
                  switchElement={
                    <SwitchComponent
                        control={control}
                      idInput={"theoreticalSemiannualPercent"}
                      disabled={true}
                      defaultValue={detailData?.applyTheoreticalSemiannualPercent == 1}
                      size="small"
                      classNameSwitch="opacity"
                      className="select-basic select-disabled-list input-size opacity"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div className="mb-24px">
                        <InputComponent
                          idInput='theoreticalPercentage'
                          disabled={true}
                          defaultValue={`${detailData?.theoreticalSemiannualPercent ?? '0'}%`}
                          typeInput="text"
                          className="input-basic input-size"
                          classNameLabel="text-black biggest font-500"
                          label="Porcentaje de pago teórico semestral"
                        />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div onClick={preventClick}>
                <Acordion
                  title="¿Aplica servicio social?"
                  isOpen={detailData?.applySocialService == 1}
                  onClick={() => {}}
                  onlyView
                  switchElement={
                    <SwitchComponent
                      control={control}
                      idInput={"applySocialService"}
                      disabled={true}
                      defaultValue={detailData?.applySocialService == 1}
                      size="small"
                      classNameSwitch="opacity"
                      className="select-basic select-disabled-list input-size opacity"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div className="mb-24px">
                      <InputComponent
                        idInput='socialServicePercentage'         
                        disabled={true}
                        defaultValue={`${detailData?.socialServicePercent || '0'}`}
                        typeInput="number"
                        className="input-basic input-size "
                        classNameLabel="text-black biggest font-500"
                        label="Porcentaje de descuento por periodo"
                      />
                    </div>
                    <div className="mb-24px">
                      <InputComponent
                        idInput='socialServiceHours'
                        defaultValue={`${detailData?.socialServiceHours}`}
                        typeInput="number"
                        className="input-basic input-size"
                        classNameLabel="text-black biggest font-500"
                        label="Horas por periodo"
                        disabled={true}
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div onClick={preventClick}>
                <Acordion
                  title="¿Aplica trasferencia de conocimiento?"
                  isOpen={detailData?.applyKnowledgeTransfer == 1}
                  onClick={() => {}}
                  onlyView
                  switchElement={
                    <SwitchComponent
                      control={control}
                      idInput='applyKnowledgeTransfer'
                      disabled={true}
                      defaultValue={detailData?.applyKnowledgeTransfer == 1}
                      size="small"
                      classNameSwitch="opacity"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div className="mb-24px">
                      <InputComponent
                        idInput='knowledgeTransferPercent'
                        defaultValue={`${detailData?.knowledgeTransferPercent}`}
                        typeInput="number"
                        disabled={true}
                        className="input-basic input-size "
                        classNameLabel="text-black biggest font-500"
                        label="Porcentaje de cumplimiento"
                      />
                    </div>
                    <div className="mb-24px">
                      <InputComponent
                        idInput='knowledgeTransferHours'
                        defaultValue={`${detailData?.knowledgeTransferHours}`}
                        typeInput="number"
                        className="input-basic input-size"
                        classNameLabel="text-black biggest font-500"
                        label="Horas totales por el crédito"
                        disabled={true}
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div onClick={preventClick}>
                <Acordion
                  title="¿Aplica periodo de gracia?"
                  isOpen={detailData?.applyGracePeriod == 1}
                  onClick={() => {}}
                  onlyView
                  switchElement={
                    <SwitchComponent
                      control={control}
                      idInput={"applyGracePeriod"} 
                      disabled={true}
                      defaultValue={detailData?.applyGracePeriod == 1}
                      size="small"
                      classNameSwitch="opacity"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div className="mb-24px">
                      <InputComponent
                        idInput='gracePeriodMonths'
                        defaultValue={`${detailData?.gracePeriodMonths}`}
                        typeInput="number"
                        className="input-basic input-size"
                        classNameLabel="text-black biggest font-500"
                        label="Meses"
                        disabled={true}
                      />
                    </div>
                    <div className="mb-24px">
                      <SelectComponentOld
                        idInput={"graceDateApplication"}
                        value={detailData?.graceDateApplication}
                        data={LIST_DATA_GRACE_PERIOD} //pendiente = ¿Porque? comentario del otro desarrollador
                        label='Fecha de aplicación'
                        className="select-basic select-disabled-list input-size"
                        classNameLabel="text-black biggest font-500"
                        placeholder="Seleccionar"
                        disabled={true}
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div onClick={preventClick}>
                <Acordion
                  title="¿Aplica suspensiones continuas?"
                  isOpen={detailData?.applyContinuousSuspension == 1}
                  onClick={() => {}}
                  onlyView
                  switchElement={
                    <SwitchComponent
                      control={control}
                      idInput={"continuousSuspensionApplies"}
                      defaultValue={detailData?.applyContinuousSuspension == 1}
                      disabled={true}
                      size="small"
                      classNameSwitch="opacity"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div>
                      <InputComponent
                        idInput='continuosSuspencionQuantity'
                        defaultValue={`${detailData?.continuosSuspencionQuantity}`}
                        typeInput="number"
                        className="input-basic input-size"
                        classNameLabel="text-black biggest font-500"
                        label="Cantidad"
                        disabled={true}
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div onClick={preventClick}>
                <Acordion
                  title="¿Aplica suspensiones discontinuas?"
                  isOpen={detailData?.applyDiscontinuousSuspension == 1}
                  onClick={async () => {}}
                  onlyView
                  switchElement={
                    <SwitchComponent
                      control={control}
                      idInput={"applyDiscontinuousSuspension"}
                      defaultValue={detailData?.applyDiscontinuousSuspension == 1}
                      disabled={true}
                      size="small"
                      classNameSwitch="opacity"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div>
                      <InputComponent
                        idInput='discontinuousSuspensionQuantity'
                        defaultValue={`${detailData?.discontinuousSuspensionQuantity}`}
                        typeInput="number"
                        className="input-basic input-size"
                        classNameLabel="text-black biggest font-500"
                        label="Cantidad"
                        disabled={true}
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div onClick={preventClick}>
                <Acordion
                  title="¿Aplica suspensiones especiales?"
                  isOpen={detailData?.applySpecialSuspensions == 1}
                  onClick={async () => {}}
                  onlyView
                  switchElement={
                    <SwitchComponent
                      control={control}
                      disabled={true}
                      idInput={"applySpecialSuspensions"}  
                      defaultValue={detailData?.applySpecialSuspensions == 1}
                      size="small"
                      classNameSwitch="opacity"
                      className="select-basic select-disabled-list input-size mb-24px"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div>
                      <InputComponent
                        idInput='specialSuspensionsQuantity'
                        disabled={true}
                        defaultValue={`${detailData?.specialSuspensionsQuantity}`}
                        typeInput="number"
                        className="input-basic input-size"
                        classNameLabel="text-black biggest font-500"
                        label="Cantidad"
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
              <div onClick={preventClick}>
                <Acordion
                  title="¿Aplica prórroga?"
                  isOpen={detailData?.applyExtension == 1}
                  onClick={() => {}}
                  onlyView
                  switchElement={
                    <SwitchComponent
                      control={control}
                      idInput={"extensionApply"}
                      disabled={true}
                      defaultValue={detailData?.applyExtension == 1}
                      size="small"
                      classNameSwitch="opacity"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div className="containerApplyService">
                    <div>
                      <InputComponent
                        idInput='extensionQuantity'
                        disabled={true}
                        defaultValue={`${detailData?.extensionQuantity}`}
                        typeInput="number"
                        className="input-basic input-size"
                        classNameLabel="text-black biggest font-500"
                        label="Cantidad"
                      />
                    </div>
                  </div>
                </Acordion>
              </div>
            </>
          </Acordion>
          <Acordion
            title="Porcentajes de condonación"
            classname="container-modal-acordion-title"
            onClick={async () => {}}
            switchElement={<></>}
            iconRow={true}
          >
            <>
              <div onClick={preventClick}>
                <Acordion
                  title="¿Aplica condonación por rendimiento académico por periodo?"
                  isOpen={detailData?.applyCondonationPerformancePeriod == 1}
                  onClick={async () => {}}
                  onlyView
                  switchElement={
                    <SwitchComponent
                      control={control}
                      idInput={"applyCondonationPerformancePeriod"}
                      defaultValue={detailData?.applyCondonationPerformancePeriod == 1}
                      disabled={true}
                      classNameSwitch="opacity"
                      size="small"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div>
                    <TableJson
                      idInput="performancePeriod"
                      isOpen={detailData?.applyCondonationPerformancePeriod == 1}
                      setValue={setValue}
                      title="promedio y porcentaje de condonación"
                      onlyView={true}
                      getValues={getValues}
                      error={errors}
                      dataRead={detailData.performancePeriodStructure}
                    />
                  </div>
                </Acordion>
              </div>
              <div onClick={preventClick}>
                <Acordion
                  title="¿Aplica condonación por rendimiento académico final acumulado?"
                  isOpen={detailData?.applyAccomulatedIncomeCondonation == 1}
                  onClick={async () => {}}
                  onlyView
                  switchElement={
                    <SwitchComponent
                      control={control}
                      idInput='applyAccomulatedIncomeCondonation'
                      disabled={true}
                      defaultValue={detailData?.applyAccomulatedIncomeCondonation == 1}
                      classNameSwitch="opacity"
                      size="small"
                      className="select-basic select-disabled-list input-size"
                      classNameLabel="text-black biggest font-500"
                    />
                  }
                >
                  <div>
                    <TableJson
                      isOpen={detailData?.applyAccomulatedIncomeCondonation == 1}
                      idInput="accumulatedPerformance"
                      setValue={setValue}
                      title="Agregar promedio y porcentaje de condonación"
                      getValues={getValues}
                      error={errors}
                      onlyView={true}
                      dataRead={detailData.accumulatedPerformanceDataTable}
                    />
                  </div>
                </Acordion>
              </div>
            </>
          </Acordion>
          <Acordion
            title="Requisitos"
            classname="container-modal-acordion-title"
            onClick={async () => {}}
            switchElement={<></>}
            iconRow={true}
          >
            <RequirementOnlyView  detailData={detailData.requirementsForReglament} />
          </Acordion>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              height: "40%",
              alignItems: "end",
            }}
          >
            <div>
              <ButtonComponent
                value="Cerrar"
                form="regulationCreate"
                action={onClose}
                type="button"
                className="button-save disabled-black padding-button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailReglament;
