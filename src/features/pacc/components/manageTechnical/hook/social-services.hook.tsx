import { useEffect, useRef, useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { ITableElement } from "../../../../../common/interfaces";
import { Button } from "primereact/button";
import { AppContext } from "../../../../../common/contexts/app.context";
import { useParams } from "react-router";
import { ISocialServiceBeneficiary } from "../interface/social-service";
import { Tag } from "primereact/tag";
import { Accordion, AccordionTab } from "primereact/accordion";
import {
  FormComponent,
  SelectComponent,
} from "../../../../../common/components/Form";
import { TextAreaComponent } from "../../../../../common/components/Form/input-text-area.component";
import { EServiceSocialStates } from "../../../constants/service.social.states.enum";
import { MenuItem } from "primereact/menuitem";
import { FiPaperclip } from "react-icons/fi";
import { OverlayPanel } from "primereact/overlaypanel";
import { Menu } from "primereact/menu";
import { Tooltip } from "primereact/tooltip";
import { downloadFile } from "../helper/dowloadFile";
import { useWidth } from "../../../../../common/hooks/use-width";
import ModalUploadChangeData from "../modal-upload-change-data";
import { EStatePac } from "../../../../../common/constants/api.enum";

export default function useSocialServices() {
  const { id, typeState } = useParams();
  const { width } = useWidth();

  const [filesService, setFilesService] = useState([]);

  const toast = useRef(null);
  const tableComponentRef = useRef(null);

  const { setMessage, authorization } = useContext(AppContext);

  useEffect(() => {
    loadTableData({
      id: parseInt(id),
    });
  }, []);

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  function showDetailSocialService(row: ISocialServiceBeneficiary) {
    setMessage({
      show: true,
      title: "Revisar",
      description: (
        <ModalUploadChangeData
          requirements={row.beneficiarieConsolidate.requerimentsConsolidate.map(
            (i) => {
              return { id: i.id, description: i.descriptionRequirement };
            }
          )}
          showState={true}
          showObservation={true}
          showUploadFile={false}
          state={row.state}
          observation={row.observation}
          headerAccordion="Requisitos"
          width={width}
          action="show"
          loadTableData={loadTableData}
        />
      ),
      OkTitle: "Cerrar",
      onOk: () => {
        setMessage({});
      },
    });
  }

  function showModalSubmitData(row: ISocialServiceBeneficiary) {
    setMessage({
      show: true,
      title: "Revisar",
      description: (
        <ModalUploadChangeData
          requirements={row.beneficiarieConsolidate.requerimentsConsolidate.map(
            (i) => {
              return { id: i.id, description: i.descriptionRequirement };
            }
          )}
          showState={true}
          showObservation={true}
          showUploadFile={true}
          state={null}
          observation={""}
          headerAccordion="Requisitos"
          action="edit"
          width={width}
          loadTableData={loadTableData}
        />
      ),
    });
  }

  const tableColumns: ITableElement<ISocialServiceBeneficiary>[] = [
    {
      fieldName: "legalizationPeriod",
      header: "Período",
    },
    {
      fieldName: "committedHours",
      header: "Horas comprometidas",
    },
    {
      fieldName: "hoursDone",
      header: "Horas realizadas",
    },
    {
      fieldName: "pendingHours",
      header: "Horas pendientes",
    },
    {
      fieldName: "pendingHours",
      header: "Total horas pendientes",
    },
    {
      fieldName: "state",
      header: "Estado",
      renderCell: (row) => {
        if (row.state === null) {
          return <></>;
        }

        return (
          <Tag
            severity={row.state ? "danger" : "success"}
            value={row.state ? "Aprobado" : "Rechazado"}
            rounded
          />
        );
      },
    },
    {
      fieldName: "actions",
      header: "Acciones",
      renderCell: (row) => {
        return (
          <div className="content-tooltip">
            <section className="card-options">
              <Button
                className="button-table"
                title="Revisar"
                icon={<FaEye color="#058cc1" className="icon-size" />}
                onClick={(e) => {
                  if (Number(typeState) === EStatePac.SocialService)
                    showModalSubmitData(row);

                  if (Number(typeState) !== EStatePac.SocialService)
                    showDetailSocialService(row);
                }}
              />
            </section>
            <section className="card-options">
              <Tooltip target=".adjunto" style={{ borderRadius: "1px" }} />
              <i
                className="style-tooltip adjunto"
                data-pr-tooltip="Adjuntar"
                data-pr-position="right"
              >
                <Button
                  className="button-table"
                  icon={<FiPaperclip className="icon-size" />}
                  onClick={(e) => toast.current.toggle(e)}
                />

                <OverlayPanel ref={toast}>
                  <Menu model={items(row.id)} className="menu-style" />
                </OverlayPanel>
              </i>
            </section>
          </div>
        );
      },
    },
  ];

  const items = (row): MenuItem[] => [
    {
      label: "Ver documentos",
      items:
        filesService.length > 0
          ? filesService.map((file) => {
              return {
                label: file.name,
                icon: "", // Puedes asignar un icono si es necesario
                template: () => {
                  return (
                    <button
                      className="p-menuitem-link button-menu-tooltip"
                      onClick={() => {
                        downloadFile(
                          file,
                          authorization,
                          setMessage,
                          "/uploadInformation/files/get-file"
                        );
                      }}
                    >
                      <span className="p-menuitem-text ml-5px">
                        {file.name}
                      </span>
                    </button>
                  );
                },
              };
            })
          : [
              {
                label: "No hay adjunto",
                icon: "",
              },
            ],
    },
  ];

  return {
    tableComponentRef,
    tableColumns,
  };
}
