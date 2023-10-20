import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useContext,
} from "react";
import { ITableAction, ITableElement } from "../interfaces/table.interfaces";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DataView } from "primereact/dataview";
import {IUnifiedPagingData} from "../../common/utils/api-response"
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
import { IPagingData } from "../utils/api-response";
import useCrudService from "../hooks/crud-service.hook";
import { EResponseCodes } from "../constants/api.enum";
import { classNames } from "primereact/utils";
import * as Icons from "react-icons/fa";
import { Dropdown } from "primereact/dropdown";
import { useWidth } from "../hooks/use-width";
import { AppContext } from "../contexts/app.context";

interface IProps<T> {
  url?: string;
  emptyMessage?: string;
  title?: string;
  secondaryTitle?: string;
  columns: ITableElement<T>[];
  actions?: ITableAction<T>[];
  searchItems?: object;
  isShowModal: boolean;
  titleMessageModalNoResult?: string;  
  data?: IUnifiedPagingData | null;
  
}


interface IRef {
  loadData: (newSearchCriteria?: object) => void;
}

const TableGridComponentNew = forwardRef<IRef, IProps<any>>((props, ref,) => {
  const {
    title,
    secondaryTitle,
    columns,
    actions,
    url,
    titleMessageModalNoResult,
    isShowModal,
    emptyMessage = "No hay resultados.",
  } = props;

  // States
  const [charged, setCharged] = useState<boolean>(false);
  const [resultData, setResultData] = useState<IUnifiedPagingData | null>(props.data || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [first, setFirst] = useState<number>(0);
  const [searchCriteria, setSearchCriteria] = useState<object>();
  const { width } = useWidth();
  const { setMessage } = useContext(AppContext);


  // Declaraciones
  const { post } = useCrudService(url);
  useImperativeHandle(ref, () => ({
    loadData: loadData,
  }));

  // Metodo que hace la peticion para realizar la carga de datos
  async function loadData(
    newSearchCriteria?: object,
    currentPage?: number
  ): Promise<void> {
    setLoading(true);
    if (props.data) {
      setResultData(props.data);
      setLoading(false);
      return;
    }
    if (newSearchCriteria) {
      setSearchCriteria(newSearchCriteria);
    }
    const body = newSearchCriteria || searchCriteria || {};
    const res = await post<IPagingData<any>>(url, {
      ...body,
      page: currentPage || 1,
      perPage: perPage,
    });

    if (res.operation.code === EResponseCodes.OK) {
      setResultData({
        data: res.data.array,  // Ajusta según el formato de tu respuesta
        pagingInfo: res.data.meta  // Ajusta según el formato de tu respuesta
    });

      if (res.data.array.length <= 0 && isShowModal) {
        setMessage({
          title: `${titleMessageModalNoResult || ""}`,
          show: true,
          description: "No hay resultado para la búsqueda",
          OkTitle: "Aceptar",
          background: true,
        });
      }
    } else {
      setMessage({
        title: `Error en la consulta de datos`,
        show: true,
        description: res.operation.message,
        OkTitle: "Aceptar",
        background: true,
        onOk: () => {
          setMessage({});
        },
      });
    }

    setLoading(false);
  }

  // Metodo que alamacena el el estado del paginador
  function onPageChange(event: PaginatorPageChangeEvent): void {
    setPerPage(event.rows);
    setFirst(event.first);
    setPage(event.page);
  }

  useEffect(() => {
    if (charged) loadData(undefined, page + 1);
  }, [perPage, first, page]);

  useEffect(() => {
    if (props.data) {
        setResultData(props.data);
    } else {
        setCharged(true);
    }
    return () => {
        setCharged(false);
    };
}, [props.data]);

  const mobilTemplate = (item) => {
    return (
      <div className="card-grid-item">
        <div className="card-header">
          {columns.map((column) => {
            const properties = column.fieldName.split(".");
            let field =
              properties.length === 2
                ? item[properties[0]][properties[1]]
                : item[properties[0]];
            return (
              <div key={item} className="item-value-container">
                <p className="text-black bold text-center">{column.header}</p>
                <p> {column.renderCell ? column.renderCell(item) : field} </p>
              </div>
            );
          })}
        </div>
        <div className="card-footer">
          <section className="position-absolute top text-black bold text-center"> Acciones </section>
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
  };

  useImperativeHandle(ref, () => ({
    loadData: loadData,
    emptyData: EmptyData,
  }));

  async function EmptyData(): Promise<void> {
    setLoading(true);
    setResultData({
        data: [],  // Cambia 'array' por 'data'
        pagingInfo: {
            total: 0,
            // También puedes inicializar los otros campos de IDataPaging con valores predeterminados si es necesario
            perPage: 0,
            currentPage: 0,
            lastPage: 0,
            firstPage: 0,
            firstPageUrl: "",
            lastPageUrl: "",
            nextPageUrl: "",
            previousPageUrl: ""
        }
    });
    setLoading(false);
}


  return (
    <div className="spc-common-table">
      {title && <div className="spc-table-title">{title}</div>}

      <Paginator
    className="between spc-table-paginator"
    template={paginatorHeader}
    first={first}
    rows={perPage}
    totalRecords={resultData?.pagingInfo?.total || 0}  // Cambia 'meta' por 'pagingInfo'
    onPageChange={onPageChange}
    leftContent={
        <p className="header-information text-black bold biggest">
            {secondaryTitle ?? 'Resultados de búsqueda'}
        </p>
    }
/>


{width > 830 ? (
    <DataTable
        className="spc-table full-height"
        value={resultData?.data || []}  // Actualizado de resultData?.array a resultData?.data
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
                        <div className="spc-header-title">Acciones</div>
                    </div>
                }
                body={(row) => <ActionComponent row={row} actions={actions} />}
            />
        )}
    </DataTable>
) : (
    <DataView
        value={resultData?.data || []}  // Actualizado de resultData?.array a resultData?.data
        itemTemplate={mobilTemplate}
        rows={5}
        emptyMessage={emptyMessage}
    />
)}
<Paginator
    className="spc-table-paginator"
    template={paginatorFooter}
    first={first}
    rows={perPage}
    totalRecords={resultData?.pagingInfo?.total || 0}  // Actualizado de resultData?.meta?.total a resultData?.pagingInfo?.total
    onPageChange={onPageChange}
/>
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
    default:
      return "";
  }
}

const paginatorHeader: PaginatorTemplateOptions = {
  layout: "CurrentPageReport RowsPerPageDropdown",
  CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
    return (
      <>
        <p className="header-information text-black bold big">
          Total de resultados
        </p>
        <p className="header-information text-three bold big">
          {options.totalRecords}
        </p>
      </>
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
      <React.Fragment>
        <p className="header-information text-black bold big">
          Registros por página{" "}
        </p>
        <Dropdown
          value={options.value}
          className="header-information"
          options={dropdownOptions}
          onChange={options.onChange}
        />
      </React.Fragment>
    );
  },
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

export default React.memo(TableGridComponentNew);