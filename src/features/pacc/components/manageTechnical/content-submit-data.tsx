import { Control, Controller, UseFormRegister, UseFormUnregister } from "react-hook-form";
import { ISocialServiceBeneficiary } from "./interface/social-service";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { ButtonComponent, FormComponent, SelectComponent } from "../../../../common/components/Form";
import { EServiceSocialStates } from "../../constants/service.social.states.enum";
import { BiPlusCircle } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { TextAreaComponent } from "../../../../common/components/Form/input-text-area.component";
import { Dialog } from "primereact/dialog";
import UploadNewComponent from "../../../../common/components/Form/UploadNewComponent";
import { IMessage } from "../../../../common/interfaces/global.interface";

interface IPropsContentSubmitData {
    readonly row: ISocialServiceBeneficiary;
    readonly control: Control<any>;
    readonly register: UseFormRegister<{
      state: any;
      observation: string;
    }>;
    readonly unregister: UseFormUnregister<{
      state: any;
      observation: string;
    }>;
    readonly width: number;
    readonly setMessage: (value: SetStateAction<IMessage>) => void
    readonly loadTableData: (searchCriteria?: object) => void;
  }
  
function ContentSubmitData({
    row,
    control,
    register,
    unregister,
    width,
    setMessage,
    loadTableData
  }: IPropsContentSubmitData): React.JSX.Element {

    //TODO: Si quieres pones esto en un hook, y los botones de Aceptar y Cancelar estan aca. tambien tendrias que hacer la accion del onSubmit para FormComponent
    //TODO: La funcion loadTableData deberia llamarse cuando termine de guardar todo. 

    const [visible, setVisible] = useState(false);
    const [filesUploadData, setFilesUploadData] = useState<File>(null);

    return (
      <>
      <Dialog
        header="Si tienes más de un documento, se deben unir en un solo archivo para ser cargados"
        className="text-center div-modal movil"
        visible={visible}
        onHide={() => setVisible(false)}
        pt={{
          root: { style: { width: "35em" } },
        }}
      >
        <UploadNewComponent
          id="cargarArchivo"
          dataArchivo={(files: File) => {
            if (files && files.name) {
              setFilesUploadData(files);
              setVisible(false);
            }
          }}
          showModal={(e: boolean) => {
            setVisible(e);
          }}
          titleFilesAccept="Solo es permitido el formato PDF"
          filesAccept="application/pdf"
        />
        <div className="modal-footer" style={{ margin: "1rem" }}>
          <ButtonComponent
            value="Cancelar"
            className="button-ok small"
            type="button"
            action={() => {
              setVisible(false);
              setFilesUploadData(null);
            }}
          />
        </div>
      </Dialog>
        <Accordion
          activeIndex={1}
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          <AccordionTab header="Requisitos" style={{ fontSize: "1.22em" }}>
            {row.beneficiarieConsolidate.requerimentsConsolidate.map(
              (us, index) => {
                return (
                  <div
                    key={us.id}
                    className="content-accordion-tab medium mt-14px"
                    style={{ fontWeight: "400" }}
                  >
                    {index + 1}. {us.descriptionRequirement}
                  </div>
                );
              }
            )}
          </AccordionTab>
        </Accordion>
        <div className="card-table gap-0 full-width">
          <FormComponent id="formManageTransfer">
            <div className="grid-form-2-container ">
              <SelectComponent
                idInput={"state"}
                control={control}
                data={[
                  {
                    name: "Aprobado",
                    value: EServiceSocialStates.Aprobado,
                  },
                  {
                    name: "Rechazado",
                    value: EServiceSocialStates.Rechazado,
                  },
                ]}
                label="Estado"
                className="select-basic medium select-disabled-list"
                classNameLabel="text-black biggest"
                filter={true}
                placeholder="Seleccionar."
              />
            </div>
            {!filesUploadData ? (
              <div className="title-area-3 mt-14px">
                <div
                  className={`title-button ${
                    width < 300 ? "font-medium" : "font-big"
                  } no-margin`}
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  Adjuntar archivos <BiPlusCircle />
                </div>
              </div>
            ) : (
              <>
                <div className="title-area-3 mt-14px">
                  <div
                    className={`title-button color-red ${
                      width < 300 ? "font-medium" : "font-big"
                    } no-margin spc-common-table`}
                    style={{ justifyContent: "center" }}
                    onClick={() => {
                      setFilesUploadData(null);
                      unregister("observation");
                    }}
                  >
                    {filesUploadData.name}{" "}
                    <BsTrash className="button grid-button button-delete" />
                  </div>
                </div>
                <div className="">
                  <Controller
                    control={control}
                    name={"observation"}
                    render={({ field }) => {
                      return (
                        <TextAreaComponent
                          id={field.name}
                          idInput={field.name}
                          value={`${field.value}`}
                          label="Observación"
                          className="text-area-basic"
                          classNameLabel="text-black biggest text-required"
                          rows={2}
                          placeholder="Escribe aquí"
                          register={register}
                          onChange={field.onChange}
                          // errors={er}
                          characters={150}
                        />
                      );
                    }}
                  />
                </div>
              </>
            )}
          </FormComponent>
        </div>
        <div className="funcionality-buttons-container2">
        <ButtonComponent
            value="Cancelar"
            type="button"
            className="button-clean-fields bold"
            action={() => {
                setMessage({})
            }}
        />
        <ButtonComponent
            form="formManageTransfer"
            className="button-main huge hover-three"
            value="Aceptar"
            type="submit"
        />
    </div>   
      </>
    );
}
  
export default React.memo(ContentSubmitData);