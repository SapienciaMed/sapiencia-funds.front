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
import { usePaccServices } from "../../../hook/pacc-serviceshook";
import { IFiles } from "../../../../../common/interfaces/storage.interfaces";
import { useNavigate } from "react-router-dom";

export default function useSocialServices() {
  const { id, typeState } = useParams();
  const navigate = useNavigate();
  const { width } = useWidth();

  const { UpdateSocialService } = usePaccServices(Number(typeState));

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
          id={row?.id}
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
          navigate={navigate}
          requirements={row.beneficiarieConsolidate.requerimentsConsolidate.map(
            (i) => {
              return { id: i.id, description: i.descriptionRequirement };
            }
          )}
          showState={row.editable}
          idConsolidationBeneficiary={row.idConsolidationBeneficiary}
          showObservation={row.editable}
          showUploadFile={true}
          editable={row.editable}
          id={row?.id}
          state={row.state}
          observation={row.observation}
          headerAccordion="Requisitos"
          action="edit"
          width={width}
          loadTableData={loadTableData}
          executeFunctionSubmit={UpdateSocialService}
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
      fieldName: "totalPendingHours",
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
            severity={row.state ? "success" : "danger"}
            value={row.state ? "Aprobado" : "Rechazado"}
            rounded
          />
        );
      },
    },
    {
      fieldName: "observation",
      header: "Observacion",
    },
    {
      fieldName: "actions",
      header: "Acciones",
      renderCell: (row) => {
        const toast = useRef(null);

        return (
          <div className="content-tooltip">
            <section className="card-options">
              <Button
                className="button-table"
                title={
                  Number(typeState) === EStatePac.SocialService
                    ? "Gestionar"
                    : "Revisar"
                }
                icon={
                  Number(typeState) === EStatePac.SocialService ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5133 14.2083H1.375C0.896667 14.2083 0.5 13.8117 0.5 13.3333C0.5 12.855 0.896667 12.4583 1.375 12.4583H11.5133L9.50667 10.4517C9.16833 10.1133 9.16833 9.55332 9.50667 9.21499C9.845 8.87666 10.405 8.87666 10.7433 9.21499L14.2433 12.715C14.325 12.7967 14.3833 12.89 14.43 12.995C14.5233 13.205 14.5233 13.45 14.43 13.66C14.3833 13.765 14.325 13.8583 14.2433 13.94L10.7433 17.44C10.5683 17.615 10.3467 17.6967 10.125 17.6967C9.90333 17.6967 9.68167 17.615 9.50667 17.44C9.16833 17.1017 9.16833 16.5417 9.50667 16.2033L11.5133 14.1967V14.2083ZM21.5 8.08332V18C21.5 19.7733 20.065 21.2083 18.2917 21.2083H9.54167C7.76833 21.2083 6.33333 19.7733 6.33333 18V16.8333C6.33333 16.355 6.73 15.9583 7.20833 15.9583C7.68667 15.9583 8.08333 16.355 8.08333 16.8333V18C8.08333 18.805 8.73667 19.4583 9.54167 19.4583H18.2917C19.0967 19.4583 19.75 18.805 19.75 18V8.95832H14.2083C13.73 8.95832 13.3333 8.56166 13.3333 8.08332V2.54166H9.54167C8.73667 2.54166 8.08333 3.19499 8.08333 3.99999V9.83332C8.08333 10.3117 7.68667 10.7083 7.20833 10.7083C6.73 10.7083 6.33333 10.3117 6.33333 9.83332V3.99999C6.33333 2.22666 7.76833 0.791656 9.54167 0.791656H14.2083C14.4417 0.791656 14.6633 0.88499 14.8267 1.04832L21.2433 7.46499C21.4067 7.62832 21.5 7.84999 21.5 8.08332ZM15.0833 7.20832H18.5133L15.0833 3.77832V7.20832Z"
                        fill="black"
                      />
                    </svg>
                  ) : (
                    row.state && <FaEye color="#058cc1" className="icon-size" />
                  )
                }
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

                <OverlayPanel id={String(row.id)} ref={toast}>
                  <Menu
                    key={row.id}
                    id={String(row.id)}
                    model={items(row)}
                    className="menu-style"
                  />
                </OverlayPanel>
              </i>
            </section>
          </div>
        );
      },
    },
    // },
  ];

  const items = (row: ISocialServiceBeneficiary): MenuItem[] => {
    return [
      {
        id: String(row.id),
        label: "Ver documentos",
        items:
          row.infoFiles.length > 0
            ? row.infoFiles.map((file) => {
                return {
                  id: String(row.id),
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
                            "/consolidation-tray-social-service/get-service-social-file"
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
      { separator: true },
      {
        items:
          row.externalInfoFiles.parameters.length > 0 &&
          row.externalInfoFiles.parameters.map((fileExternal) => {
            console.log(fileExternal);
            return {
              id: String(row.id),
              label: fileExternal.tipo,
              icon: "",
              template: () => {
                return (
                  <button
                    className="p-menuitem-link button-menu-tooltip"
                    onClick={() => {
                      viewDocuments(
                        row.externalInfoFiles.documentPath,
                        fileExternal.tipo,
                        fileExternal.documento,
                        fileExternal.periodo,
                        fileExternal.npseleccion
                      );
                    }}
                  >
                    <span className="p-menuitem-text ml-5px">
                      {fileExternal.tipo}
                    </span>
                  </button>
                );
              },
            };
          }),
      },
    ];
  };

  const viewDocuments = (
    path: string,
    tipo: string,
    documento: string,
    id_periodo_giro: string,
    pseleccion: string
  ) => {
    const url = path;
    const form = document.createElement("form");
    form.action = url;
    form.method = "POST";
    form.target = "_blank";
    form.style.display = "none";

    // Definir el tipo para los elementos del formulario
    type FormElement = {
      name: string;
      value: string;
    };

    // Agregar inputs al formulario
    const formElements: FormElement[] = [
      { name: "tipo", value: tipo },
      { name: "documento", value: documento },
      { name: "periodo", value: id_periodo_giro },
      { name: "npseleccion", value: pseleccion },
    ];

    formElements.forEach(({ name, value }) => {
      const input = document.createElement("input");
      input.type = "text";
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return {
    tableComponentRef,
    tableColumns,
  };
}
