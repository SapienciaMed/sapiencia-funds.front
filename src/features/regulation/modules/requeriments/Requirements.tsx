
import SwitchComponent from "../../../../common/components/Form/switch.component";
import {
  ButtonComponent,
  FormComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { TextAreaComponent } from "../../../../common/components/Form/input-text-area.component";
import { Control, FieldErrors, UseFormGetValues, UseFormReset, UseFormResetField, UseFormSetValue } from "react-hook-form";
import useRequerimentsHook from "../../hooks/requeriments.hook";
import { EDirection } from "../../../../common/constants/input.enum";
import { IRegulation } from "../../../../common/interfaces/regulation";
import TotalTableComponent from "../../../../common/components/total-table.component";

interface IRequirements {
  getValues: UseFormGetValues<IRegulation>
  setValue: UseFormSetValue<IRegulation>
  updateData: IRegulation;
  errors: FieldErrors<IRegulation>
  control: Control<IRegulation, any>
}

const Requirements = ({ updateData, errors, control, setValue, getValues }: IRequirements ) => {
  const {
    tableColumns,
    tableComponentRef,
    data,
    tempData,
    messageError,
    controlRequirement,
    addItem,
    setTempData
  } = useRequerimentsHook({ getValues, setValue, updateData, errors, control });

  return (
    <>
      <div className="main-page">
        <div className="card-table gap-0 mt-14px">
          <section className="title-area-2">
            <div className="text-black extra-large">
              Requisitos
            </div>
          </section>
          <FormComponent id="regulationCreate"  action={() => {}}>
              <section className='grid-form-3-container-area grid-colum-requirent'>
                <SwitchComponent
                  idInput={"state"}
                  errors={errors}
                  control={control}
                  size="normal"
                  label="Estado"
                  className="select-basic select-disabled-list input-size mr-12"
                  classNameLabel="text-black biggest font-500 text-required"
                  onChange={() => {
                    setTempData({...tempData, active: !tempData.active })
                  }}
                />
                <SelectComponent
                    idInput='mandatoryFor'
                    control={controlRequirement}
                    placeholder="Seleccionar"
                    label="Obligatorio para"
                    data={[
                      { name:'Servicio social', value:'Servicio social'},
                      { name:'Transferencia de conocimiento', value:'Transferencia de conocimiento'},
                      { name:'Rendimiento académico', value:'Rendimiento académico'},
                      { name:'Porcentaje de requisitos', value:'Porcentaje de requisitos'},
                    ]}
                    direction={EDirection.column}
                    className="select-basic big select-disabled-list"
                    classNameLabel="text-black big text-with-colons"
                    optionSelected={(value) => {
                      setTempData({...tempData, mandatoryFor: value })
                    }}
                    errors={messageError}
                  />
              </section>

              <section className="mt-16px">
                  <TextAreaComponent
                    idInput='description'
                    id="rew"
                    label="Descripción"
                    className="text-area-basic"
                    classNameLabel="text-black biggest text-required font-500"
                    rows={2}
                    onChange={(e) =>{
                      setTempData({...tempData, description: e.target.value })
                    }}
                    placeholder="Escribe aquí"
                    errors={messageError}
                    characters={200}
                    value={tempData.description}
                  />
              </section>
          </FormComponent>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <ButtonComponent
                  value="Agregar"
                  type="submit"
                  action={() => addItem()}
                  className="button-save disabled-black padding-button btn-back"
                />
              </div>
          {
            data.dataTable.length > 0 && 
              <div className="mt-16px">
                <TotalTableComponent
                  ref={tableComponentRef}
                  data={data.dataTable}
                  columns={tableColumns}
                  isShowModal={true}
                  secondaryTitle='Requisitos creados'
                  isMobil={false}
                  classSizeTable='size-table-wd-150' 
                />
            </div>
          } 
        </div>
      </div>
    </>
  );
};

export default Requirements;
