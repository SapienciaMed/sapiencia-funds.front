import { useEffect, useRef, useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { ITableElement } from "../../../../../common/interfaces";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { MenuItem } from "primereact/menuitem";
import { AppContext } from "../../../../../common/contexts/app.context";
import { useParams } from "react-router";
import { IApplyKnowledgeTransfer } from "../interface/manage-technical";
import { usePaccServices } from "../../../hook/pacc-serviceshook";
import { EResponseCodes } from "../../../../../common/constants/api.enum";
import { downloadFile } from "../helper/dowloadFile";

export default function useKnowledgeTransfer() {
  const { id } = useParams();
  const tableComponentRef = useRef(null);
  const { setMessage, authorization } = useContext(AppContext);
  const { GetUploadKnowledgeTransferFiles } = usePaccServices();
  const [filesService, setFilesService] = useState([]);

  useEffect(() => {
    loadTableData({
      idBeneficiary: parseInt(id),
      user: authorization.user.numberDocument,
    });
    getUploadKnow();
  }, []);

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  function getUploadKnow(): void {
    GetUploadKnowledgeTransferFiles(id).then((response) => {
      if (response.operation.code === EResponseCodes.OK) {
        setFilesService(response.data);
      }
    });
  }

  const tableColumns: ITableElement<IApplyKnowledgeTransfer>[] = [
    {
      fieldName: "committedHours",
      header: "Período",
    },
    {
      fieldName: "workedHours",
      header: "Horas comprometidas",
    },
    {
      fieldName: "pendingHours",
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
      fieldName: "status",
      header: "Estado",
      renderCell: (row) => {
        return (
          <Tag
            severity={row.status == 0 ? "danger" : "success"}
            value={row.status == 1 ? "Aprobado" : "Rechazado"}
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
                icon={<FaEye className="icon-size" />}
                onClick={(e) => {}}
              />
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
                        downloadFile(file, authorization, setMessage);
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
