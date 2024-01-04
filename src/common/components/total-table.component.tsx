import React, { useState, forwardRef, useContext, useEffect, useImperativeHandle } from "react";
import { ITableAction, ITableElement } from "../interfaces/table.interfaces";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DataView } from "primereact/dataview";
import { ApiResponse, IPagingData, IUnifiedPagingData } from "../utils/api-response";
import {
  Paginator,
  PaginatorCurrentPageReportOptions,
  PaginatorNextPageLinkOptions,
  PaginatorPageChangeEvent,
  PaginatorPageLinksOptions,
  PaginatorPrevPageLinkOptions,
  PaginatorRowsPerPageDropdownOptions,
  PaginatorTemplateOptions,
} from "primereact/paginator";
import { classNames } from "primereact/utils";
import * as Icons from "react-icons/fa";
import * as IconsBS from 'react-icons/bs';
import { Dropdown } from "primereact/dropdown";
import { useWidth } from "../hooks/use-width";
import { EResponseCodes } from "../constants/api.enum";
import { AppContext } from "../contexts/app.context";

interface IProps<T> {
  emptyMessage?: string;
  title?: string;
  secondaryTitle?: string;
  columns: ITableElement<T>[];
  actions?: ITableAction<T>[];
  searchItems?: object;
  isShowModal: boolean;
  titleMessageModalNoResult?: string;
  data: Array<T>;
  classSizeTable?: string;
  isMobil?: boolean;
  viewPaginator?: boolean;
  classname?: string;
  isNotBorderClasse?: boolean;
}

interface IRef {
  loadData: (newSearchCriteria?: object) => void;
}

const TotalTableComponent = forwardRef<IRef, IProps<any>>((props, ref) => {
  const {
    title,
    secondaryTitle,
    columns,
    actions,
    emptyMessage = "No hay resultados.",
    classSizeTable,
    isMobil = true,
    viewPaginator = true,
    data,
    classname,
    isNotBorderClasse
  } = props;

  // States

  const [charged, setCharged] = useState<boolean>(false);
  const [resultData, setResultData] = useState<IPagingData<any>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [first, setFirst] = useState<number>(0);
  const { width } = useWidth();
  const { setMessage } = useContext(AppContext);

  useImperativeHandle(ref, () => ({
    loadData: loadData,
  }));

  useEffect(() => {
    loadData()
  }, [data])

  async function loadData(
    newSearchCriteria?: object,
    currentPage?: number
  ): Promise<void> {
    setLoading(true);

    const startIndex = (page ?? 1 * perPage - perPage);
    const lastPage = Math.ceil(data?.length / perPage);
    const endIndex = page != lastPage
      ? startIndex + perPage
      : data.length ?? 0// Índice de final
    const filteredData = data?.slice(startIndex, endIndex);

    const res: ApiResponse<IPagingData<any>> = {
      data: {
        meta: {
          total: data?.length ?? 0,
          currentPage,
          perPage,
          firstPageUrl: "/?page=1",
          lastPageUrl: "/?page=2",
          nextPageUrl: null,
          previousPageUrl: null
        },
        array: filteredData
      },
      operation: {
        code: EResponseCodes.OK,
        message: 'Respuesta'
      }
    }

    if (res.operation.code === EResponseCodes.OK) {
      setResultData(res.data);
    }

    setLoading(false);
  }

  function onPageChange(event: PaginatorPageChangeEvent): void {
    setPerPage(event.rows);
    setFirst(event.first);
    setPage(event.page);
  }

  useEffect(() => {
    if (charged) loadData(undefined, page + 1);
  }, [perPage, first, page]);

  useEffect(() => {
    setCharged(true);

    return () => {
      setCharged(false);
    };
  }, []);

  const mobilTemplate = (item) => {
    return (
      <div className="card-grid-item">
        <div className={` card-header ${classname}`}>
          {columns.map((column) => {
            const properties = column.fieldName.split(".");
            let field =
              properties.length === 2
                ? item[properties[0]][properties[1]]
                : item[properties[0]];
            return (
              <div key={item} className="item-value-container">
                <p className="text-black medium">{column.header}</p>
                <p> {column.renderCell ? column.renderCell(item) : field} </p>
              </div>
            );
          })}
        </div>
        <div className="card-footer">
          <section className="position-absolute top text-black bold text-center">
            {" "}
            Acciones{" "}
          </section>
          <section className="section-action">
            {actions?.map((action) => (
              <div key={action.icon} onClick={() => action.onClick(item)}>
                {getIconElement(action.icon, "src")}
              </div>
            ))}
          </section>
        </div>
      </div>
    );
  }

  useImperativeHandle(ref, () => ({
    loadData: loadData,
    emptyData: EmptyData,
  }));

  async function EmptyData(): Promise<void> {
    setLoading(true);
    setResultData({ array: [], meta: { total: 0 } });
    setLoading(false);
  }

  return (
    <div
        className={`spc-common-table2 ${
          isNotBorderClasse && "spc-common-table-without-border"
        }`}
      >
      {title && <div className="spc-table-title">{title}</div>}

      {
        viewPaginator && (
          <Paginator
            className="between spc-table-paginator"
            template={paginatorHeader(width)}
            first={first}
            rows={perPage}
            totalRecords={resultData?.meta?.total || 0} 
            onPageChange={onPageChange}
            leftContent={
              <p className="header-information text-black biggest">
                {secondaryTitle ?? "Totales"}
              </p>
            }
          />
        )
      }
      {width > 830  || !isMobil ? (
        <div>
          <DataTable
            className={`spc-table full-height ${classSizeTable}`}
            value={resultData?.array || []}
            loading={loading}
            scrollable={true}
            emptyMessage={emptyMessage}
          >
            {columns.map((col) => (
              <Column
                key={col.fieldName}
                field={col.fieldName}
                header={col.header}
                body={col.renderCell}
              />
            ))}

            {actions && (
              <Column
                className="spc-table-actions"
                header={
                  <div>
                    
                  </div>
                }
                body={(row) => <ActionComponent row={row} actions={actions} />}
              />
            )}
          </DataTable>
        </div>
      ) : (
        <DataView
          value={props.data}
          itemTemplate={mobilTemplate}
          rows={5}
          emptyMessage={emptyMessage}
        />
      )}

      {viewPaginator && (
          <Paginator
            className="spc-table-paginator"
            template={paginatorFooter}
            first={first}
            rows={perPage}
            totalRecords={resultData?.meta?.total || 0}
            onPageChange={onPageChange}
          />
        )}
    </div>
  );
});

// Metodo que retorna el icono o nombre de la accion
function getIconElement(icon: string, element: "name" | "src") {
  switch (icon) {
    case "Detail":
      return element == "name" ? (
        "Detalle"
      ) : (
        <Icons.FaEye className="button grid-button button-detail" />
      );
    case "Edit":
      return element == "name" ? (
        "Editar"
      ) : (
        <Icons.FaPencilAlt className="button grid-button button-edit" />
      );
    case "Delete":
      return element == "name" ? (
        "Eliminar"
      ) : (
        <Icons.FaTrashAlt className="button grid-button button-delete" />
      );
    case "Link":
      return element == "name" ? (
        "Vincular"
      ) : (
        <Icons.FaLink className="button grid-button button-link" />
      );
      case "download":
        return element == "name" ? (
          "descargar"
        ) : (
          <IconsBS.BsDownload 
          className="button grid-button button-download" 
          style={{ color: '#533893' }}
          />
        );

    default:
      return "";
  }
}

const paginatorHeader = (width: number): PaginatorTemplateOptions => {
  return {
    layout: `${
      width < 1024
        ? "RowsPerPageDropdown CurrentPageReport"
        : "CurrentPageReport RowsPerPageDropdown"
    }`,
    CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
      return (
        <section className="content-result">
          <p className="header-information text-black medium big">
            Total de resultados
          </p>
          <p className="header-information text-three medium big">
            {options.totalRecords}
          </p>
        </section>
      );
    },
    RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 30, value: 30 },
        { label: 50, value: 50 },
        { label: 100, value: 100 },
      ];

      return (
        <section className="content-result">
          <p className="header-information text-black medium big">
            Registros por página{" "}
          </p>
          <Dropdown
            value={options.value}
            className="header-information"
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </section>
      );
    },
  };
};


export const paginatorFooter: PaginatorTemplateOptions = {
  layout: "PrevPageLink PageLinks NextPageLink",
  PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
    return (
      <button
        type="button"
        className={classNames(options.className, "border-round")}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <span className="p-3 table-previus"></span>
      </button>
    );
  },
  NextPageLink: (options: PaginatorNextPageLinkOptions) => {
    return (
      <button
        type="button"
        className={classNames(options.className, "border-round")}
        onClick={options.onClick}
        disabled={options.disabled}
      >
        <span className="p-3 table-next"></span>
      </button>
    );
  },
  PageLinks: (options: PaginatorPageLinksOptions) => {
    if (
      (options.view.startPage === options.page &&
        options.view.startPage !== 0) ||
      (options.view.endPage === options.page &&
        options.page + 1 !== options.totalPages)
    ) {
      const className = classNames(options.className, { "p-disabled": true });

      return (
        <span className={className} style={{ userSelect: "none" }}>
          ...
        </span>
      );
    }

    return (
      <button
        type="button"
        className={options.className}
        onClick={options.onClick}
      >
        {options.page + 1}
      </button>
    );
  },
};

// Metodo que genera el elemento del icono
const ActionComponent = (props: {
  row: any;
  actions: ITableAction<any>[];
}): React.JSX.Element => {
  return (
    <div className="spc-table-action-button">
      {props.actions.map((action) => (
        <div key={action.icon} onClick={() => action.onClick(props.row)}>
          {getIconElement(action.icon, "src")}
        </div>
      ))}
    </div>
  );
};

export default React.memo(TotalTableComponent);
