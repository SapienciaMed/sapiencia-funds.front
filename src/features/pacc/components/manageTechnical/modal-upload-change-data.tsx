import React, { Dispatch, SetStateAction, useState } from "react";
import { Controller } from "react-hook-form";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dialog } from "primereact/dialog";
import { BsTrash } from "react-icons/bs";
import { BiPlusCircle } from "react-icons/bi";

import {
  ButtonComponent,
  FormComponent,
  SelectComponent,
  TextAreaComponent,
} from "../../../../common/components/Form";
import UploadNewComponent from "../../../../common/components/Form/UploadNewComponent";

import { EServiceSocialStates } from "../../constants/service.social.states.enum";

import useModalUploadChangeData from "./hook/modal-upload-change-data.hook";

interface IPropsContentSubmitData {
  readonly action: "edit" | "show";
  readonly requirements: {
    id: string | number;
    description: string;
  }[];
  readonly showState: boolean;
  readonly showObservation: boolean;
  readonly showUploadFile: boolean;
  readonly width: number;
  readonly state: boolean;
  readonly observation: string;
  readonly headerAccordion?: string;
  readonly loadTableData: (searchCriteria?: object) => void;
}

function ModalUploadChangeData({
  action,
  requirements,
  showState,
  showObservation,
  showUploadFile,
  width,
  state,
  observation,
  headerAccordion,
  loadTableData,
}: IPropsContentSubmitData): React.JSX.Element {
  const {
    visible,
    fileUploadData,
    control,
    formState,
    renderElementFile,
    handleSubmit,
    handleChangeShowDialog,
    handleChangeUploadFile,
    setMessage,
  } = useModalUploadChangeData(
    state,
    observation,
    action,
    width,
    showUploadFile
  );

  return (
    <>
      <Dialog
        header="Si tienes más de un documento, se deben unir en un solo archivo para ser cargados"
        className="text-center div-modal movil"
        visible={visible}
        onHide={() => handleChangeShowDialog(false)}
        pt={{
          root: { style: { width: "35em" } },
        }}
      >
        <UploadNewComponent
          id="cargarArchivo"
          dataArchivo={(files: File) => {
            if (files || files.name) {
              handleChangeUploadFile(files);
              handleChangeShowDialog(false);
            }
          }}
          showModal={(e: boolean) => handleChangeShowDialog(e)}
          titleFilesAccept="Solo es permitido el formato PDF"
          filesAccept="application/pdf"
        />
        <div className="modal-footer" style={{ margin: "1rem" }}>
          <ButtonComponent
            value="Cancelar"
            className="button-ok small"
            type="button"
            action={() => {
              handleChangeShowDialog(false);
              handleChangeUploadFile(null);
            }}
          />
        </div>
      </Dialog>
      <Accordion
        activeIndex={1}
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        <AccordionTab header={headerAccordion} style={{ fontSize: "1.22em" }}>
          {requirements.map((us, index) => {
            return (
              <div
                key={us.id}
                className="content-accordion-tab medium mt-14px"
                style={{ fontWeight: "400" }}
              >
                {index + 1}. {us.description}
              </div>
            );
          })}
        </AccordionTab>
      </Accordion>
      <div className="card-table gap-0 full-width">
        <FormComponent id="formManageTransfer">
          <div className="grid-form-2-container ">
            {showState && (
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
                disabled={action === "show"}
              />
            )}
          </div>
          {renderElementFile()}
          {showObservation && (
            <div className="">
              <Controller
                control={control}
                name={"observation"}
                shouldUnregister={true}
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
                      onChange={field.onChange}
                      characters={150}
                      disabled={action === "show"}
                    />
                  );
                }}
              />
            </div>
          )}
        </FormComponent>
      </div>
      {action === "edit" && (
        <div className="funcionality-buttons-container2">
          <ButtonComponent
            value="Cancelar"
            type="button"
            className="button-clean-fields bold"
            action={() => {
              setMessage({});
            }}
          />
          <ButtonComponent
            form="formManageTransfer"
            className="button-main huge hover-three"
            value="Aceptar"
            type="submit"
          />
        </div>
      )}
    </>
  );
}

export default React.memo(ModalUploadChangeData);