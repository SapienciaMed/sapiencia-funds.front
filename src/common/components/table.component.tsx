import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { ITableAction, ITableElement } from "../interfaces/table.interfaces";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DataView } from "primereact/dataview";
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
import * as IconsBS from "react-icons/bs";
import * as IconFI from "react-icons/fi";
import { Dropdown } from "primereact/dropdown";
import { useWidth } from "../hooks/use-width";
import { AppContext } from "../contexts/app.context";
import { ImProfile } from "react-icons/im";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";

interface IProps<T> {
  url: string;
  emptyMessage?: string;
  title?: string;
  princialTitle?: string;
  columns: ITableElement<T>[];
  actions?: ITableAction<T>[];
  searchItems?: object;
  isShowModal: boolean;
  setPaginateData?: ({}) => {} | any;
  titleMessageModalNoResult?: string;
  descriptionModalNoResult?: string;
  classname?: string;
  isDisabled?: boolean;
  onResult?: (rows: T[]) => void;
  isMobil?: boolean;
  classSizeTable?: string;
  isInputSearch?: boolean;
  bodyRequestParameters?: string | number;
  keyBodyRequest?: string;
  setShowFooterActions?: ({}) => {};
  onGlobalFilterChange?: (value: any) => void; // Es necesario llamar una funcion para que haga la peticion para el filtrado interno.
  valueFilterTable?: string; // Es necesario llamar el value para el filtro.
  count?: boolean;
  viePaginator?: boolean;
  isNotBorderClasse?: boolean;
  setShowSpinner?: Dispatch<SetStateAction<boolean>>;
  resetValue?: () => void;
}

interface IRef {
  loadData: (newSearchCriteria?: object) => void;
}

const TableComponent = forwardRef<IRef, IProps<any>>((props, ref) => {
  const {
    title,
    columns,
    actions,
    url,
    titleMessageModalNoResult,
    descriptionModalNoResult,
    isShowModal,
    emptyMessage = "No hay resultados.",
    princialTitle,
    classname = "",
    setPaginateData,
    isDisabled,
    isMobil = true,
    classSizeTable,
    isInputSearch = false,
    onGlobalFilterChange,
    valueFilterTable,
    count,
    viePaginator = true,
    isNotBorderClasse,
    setShowFooterActions,
    setShowSpinner,
    resetValue,
  } = props;

  // States
  const [charged, setCharged] = useState<boolean>(false);
  const [resultData, setResultData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [perPage, setPerPage] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [first, setFirst] = useState<number>(0);
  const [searchCriteria, setSearchCriteria] = useState<object>();
  const { width } = useWidth();
  const { setMessage } = useContext(AppContext);

  useEffect(() => {
    if (!setShowFooterActions) return;
    const thereAreData = resultData?.array?.length > 0;
    setShowFooterActions(thereAreData);
  }, [resultData]);

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
      setResultData(res.data);
      setShowSpinner && setShowSpinner(false);
      if (props.onResult) props.onResult(res?.data?.array || []);
      if (res.data?.array?.length <= 0 && isShowModal) {
        setMessage({
          title: `${titleMessageModalNoResult || ""}`,
          show: true,
          description: `${descriptionModalNoResult}` || "",
          OkTitle: "Aceptar",
          onOk: () => {
            setMessage({});
            if (onGlobalFilterChange) {
              const valor = { target: { value: "" } as HTMLInputElement };
              onGlobalFilterChange(valor);
            }
          },
          background: true,
        });
        resetValue && resetValue();
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
      resetValue && resetValue();
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
    setCharged(true);

    return () => {
      setCharged(false);
    };
  }, []);

  const mobilTemplate = (item: any) => {
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

        {actions ? (
          <div className="card-footer">
            <section className="position-absolute top text-black bold text-center">
              {" "}
              Acciones{" "}
            </section>
            <section className="section-action">
              {actions?.map((action) => (
                <div
                  key={action.icon}
                  onClick={() => !isDisabled && action.onClick(item)}
                >
                  {getIconElement(action.icon, "src", isDisabled)}
                </div>
              ))}
            </section>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  useImperativeHandle(ref, () => ({
    loadData: loadData,
    emptyData: EmptyData,
  }));

  async function EmptyData(): Promise<void> {
    setLoading(true);
    setResultData({ array: [], meta: { total: 0 } });
    setLoading(false);
  }

  if (resultData && resultData.array && resultData.array.length > 0) {
    return (
      <div
        className={`spc-common-table ${
          isNotBorderClasse && "spc-common-table-without-border"
        }`}
      >
        {title && <div className="spc-table-title">{title}</div>}

        {viePaginator && (
          <Paginator
            className="between spc-table-paginator"
            template={paginatorHeader}
            first={first}
            rows={perPage}
            totalRecords={resultData?.meta?.total || 0}
            onPageChange={onPageChange}
            leftContent={leftContent(
              princialTitle,
              isInputSearch,
              onGlobalFilterChange,
              valueFilterTable
            )}
          />
        )}

        {width > 830 || !isMobil ? (
          <div>
            <DataTable
              className={`spc-table full-height ${classSizeTable}`}
              value={resultData?.array || []}
              loading={loading}
              scrollable={true}
              emptyMessage={emptyMessage}
            >
              {count && (
                <Column
                  header="Número"
                  body={(data, options) => options.rowIndex + 1}
                />
              )}

              {columns.map((col) => (
                <Column
                  key={col.fieldName}
                  field={col.fieldName}
                  header={col.header}
                  body={col.renderCell}
                />
              ))}

              {actions && actions.length && (
                <Column
                  className="spc-table-actions"
                  header={
                    <div>
                      <div className="spc-header-title">Acciones</div>
                    </div>
                  }
                  body={(row) => (
                    <ActionComponent
                      row={row}
                      actions={actions}
                      isDisabled={isDisabled}
                    />
                  )}
                />
              )}
            </DataTable>
          </div>
        ) : (
          <DataView
            value={resultData?.array || []}
            itemTemplate={mobilTemplate}
            rows={5}
            emptyMessage={emptyMessage}
          />
        )}

        {viePaginator && (
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
  }
});

function getIconElement(
  icon: string,
  element: "name" | "src",
  isDisabled: boolean
) {
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
    case "EditFill":
      return element == "name" ? (
        "Editar"
      ) : (
        <IconsBS.BsPencil className="button grid-button button-edit" />
      );
    case "Delete":
      return element == "name" ? (
        "Eliminar"
      ) : (
        <Icons.FaTrashAlt className="button grid-button button-delete" />
      );
    case "DeleteFill":
      return element == "name" ? (
        "Eliminar"
      ) : (
        <IconsBS.BsTrash className="button grid-button button-delete" />
      );
    case "Link":
      return element == "name" ? (
        "Vincular"
      ) : (
        <Icons.FaLink className="button grid-button button-link" />
      );
    case "Profile":
      return element == "name" ? (
        "Vincular"
      ) : (
        <ImProfile className="button grid-button button-link" />
      );
    case "download":
      return element == "name" ? (
        "descargar"
      ) : (
        <IconsBS.BsDownload
          className="button grid-button button-download"
          style={{ color: "#533893" }}
        />
      );
    case "Manage":
      return element == "name" ? (
        "Gestionar"
      ) : (
        <>
          <Tooltip target=".Manage" style={{ borderRadius: "1px" }} />
          <i
            className="style-tooltip not-padding Manage"
            data-pr-tooltip="Gestionar"
            data-pr-position="right"
            id="Manage"
          >
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
          </i>
        </>
      );
    case "ChangeCut":
      return element == "name" ? (
        "Cambiar corte"
      ) : (
        <>
          <Tooltip target=".ChangeCut" style={{ borderRadius: "1px" }} />
          <i
            className="style-tooltip not-padding ChangeCut"
            data-pr-tooltip="Cambiar corte"
            data-pr-position="left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M18.8585 4.6416C18.6604 4.64419 18.4711 4.72404 18.331 4.86414C18.1909 5.00423 18.1111 5.19349 18.1085 5.3916V7.8216L17.2685 6.9816C16.3995 6.10524 15.3209 5.46556 14.1351 5.12332C12.9494 4.78108 11.6958 4.74764 10.4935 5.02618C9.29113 5.30472 8.17997 5.88599 7.26549 6.71478C6.35101 7.54358 5.66358 8.59239 5.26848 9.7616C5.22734 9.85691 5.20671 9.95982 5.20794 10.0636C5.20916 10.1674 5.23222 10.2698 5.2756 10.3641C5.31899 10.4584 5.38173 10.5426 5.45975 10.611C5.53778 10.6795 5.62934 10.7308 5.72848 10.7616C5.81119 10.776 5.89577 10.776 5.97848 10.7616C6.13493 10.76 6.28708 10.7102 6.41415 10.6189C6.54122 10.5276 6.63702 10.3994 6.68848 10.2516C6.96785 9.42171 7.43694 8.66842 8.05848 8.0516C9.13804 6.97624 10.5997 6.37246 12.1235 6.37246C13.6472 6.37246 15.1089 6.97624 16.1885 8.0516L17.0285 8.8916H14.6185C14.4196 8.8916 14.2288 8.97062 14.0882 9.11127C13.9475 9.25192 13.8685 9.44269 13.8685 9.6416C13.8685 9.84051 13.9475 10.0313 14.0882 10.1719C14.2288 10.3126 14.4196 10.3916 14.6185 10.3916H18.8585C18.9573 10.3929 19.0555 10.3745 19.1471 10.3373C19.2387 10.3 19.3219 10.2448 19.3918 10.1749C19.4617 10.105 19.5169 10.0218 19.5541 9.9302C19.5913 9.8386 19.6098 9.74047 19.6085 9.6416V5.3916C19.6085 5.19269 19.5295 5.00192 19.3888 4.86127C19.2482 4.72062 19.0574 4.6416 18.8585 4.6416Z"
                fill="black"
              />
              <path
                d="M19.1085 14.0716C19.0122 14.0338 18.9092 14.016 18.8058 14.0193C18.7024 14.0227 18.6008 14.0471 18.5072 14.0911C18.4136 14.1351 18.3299 14.1978 18.2614 14.2752C18.1928 14.3527 18.1408 14.4433 18.1085 14.5416C17.8291 15.3715 17.36 16.1248 16.7385 16.7416C15.6589 17.817 14.1972 18.4207 12.6735 18.4207C11.1497 18.4207 9.68804 17.817 8.60848 16.7416L7.76848 15.9016H10.2385C10.4374 15.9016 10.6282 15.8226 10.7688 15.6819C10.9095 15.5413 10.9885 15.3505 10.9885 15.1516C10.9885 14.9527 10.9095 14.7619 10.7688 14.6213C10.6282 14.4806 10.4374 14.4016 10.2385 14.4016H5.99848C5.89962 14.4002 5.80149 14.4187 5.70988 14.4559C5.61828 14.4932 5.53507 14.5484 5.46515 14.6183C5.39524 14.6882 5.34005 14.7714 5.30283 14.863C5.26562 14.9546 5.24714 15.0527 5.24848 15.1516V19.3916C5.24848 19.5905 5.3275 19.7813 5.46815 19.9219C5.6088 20.0626 5.79957 20.1416 5.99848 20.1416C6.19739 20.1416 6.38816 20.0626 6.52881 19.9219C6.66946 19.7813 6.74848 19.5905 6.74848 19.3916V16.9616L7.58848 17.8016C8.45748 18.678 9.53607 19.3176 10.7218 19.6599C11.9076 20.0021 13.1612 20.0355 14.3635 19.757C15.5658 19.4785 16.677 18.8972 17.5915 18.0684C18.5059 17.2396 19.1934 16.1908 19.5885 15.0216C19.6211 14.9278 19.6345 14.8284 19.6279 14.7293C19.6213 14.6302 19.5948 14.5334 19.55 14.4448C19.5052 14.3561 19.4431 14.2774 19.3672 14.2133C19.2913 14.1492 19.2034 14.101 19.1085 14.0716Z"
                fill="black"
              />
            </svg>
          </i>
        </>
      );
    case "Paperclip":
      return element == "name" ? (
        "adjunto"
      ) : (
        <>
          <Tooltip target=".adjunto" style={{ borderRadius: "1px" }} />
          <i
            className="style-tooltip not-padding adjunto"
            data-pr-tooltip="Ver adjunto"
            data-pr-position="left"
          >
            <IconFI.FiPaperclip />
          </i>
        </>
      );
    default:
      return "";
  }
}

const leftContent = (
  title: string,
  isInputSearch: boolean,
  onGlobalFilterChange?: (value: React.ChangeEvent<HTMLInputElement>) => void,
  valueFilterTable?: string
) => {
  //TODO: Para utilizar el filtro es necesario las prop isInputSearch, onGlobalFilterChange y valueFilterTable
  return (
    <>
      {isInputSearch && onGlobalFilterChange && valueFilterTable != null ? (
        <div className="col-1 col-100 seeker">
          <span className="p-input-icon-left">
            <i className="custom-target-icon p-text-secondary p-overlay-badge flex justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.77024 15.3C6.28094 15.3 4.8251 14.8584 3.58679 14.031C2.34849 13.2036 1.38335 12.0275 0.813425 10.6516C0.243497 9.27568 0.0943779 7.76165 0.384925 6.30097C0.675471 4.84029 1.39263 3.49858 2.44572 2.44549C3.49881 1.3924 4.84053 0.675235 6.30121 0.384688C7.76188 0.0941414 9.27592 0.24326 10.6518 0.813188C12.0278 1.38312 13.2038 2.34826 14.0312 3.58656C14.8586 4.82486 15.3002 6.28071 15.3002 7.77C15.3002 8.75885 15.1055 9.73803 14.727 10.6516C14.3486 11.5652 13.794 12.3953 13.0948 13.0945C12.3955 13.7937 11.5654 14.3484 10.6518 14.7268C9.73826 15.1052 8.75909 15.3 7.77024 15.3ZM7.77024 1.75C6.58355 1.75 5.42351 2.1019 4.43682 2.76118C3.45012 3.42047 2.68109 4.35754 2.22696 5.4539C1.77283 6.55026 1.65401 7.75666 1.88553 8.92054C2.11704 10.0844 2.68848 11.1535 3.5276 11.9926C4.36671 12.8318 5.43581 13.4032 6.5997 13.6347C7.76358 13.8662 8.96998 13.7474 10.0663 13.2933C11.1627 12.8392 12.0998 12.0701 12.7591 11.0834C13.4183 10.0967 13.7702 8.93669 13.7702 7.75C13.7702 6.1587 13.1381 4.63258 12.0129 3.50736C10.8877 2.38214 9.36154 1.75 7.77024 1.75Z"
                  fill="#596471"
                />
                <path
                  d="M17.0005 17.75C16.9019 17.7505 16.8043 17.7312 16.7133 17.6935C16.6222 17.6557 16.5397 17.6001 16.4705 17.53L12.3405 13.4C12.208 13.2578 12.1358 13.0698 12.1393 12.8755C12.1427 12.6812 12.2214 12.4958 12.3588 12.3584C12.4962 12.221 12.6816 12.1422 12.8759 12.1388C13.0702 12.1354 13.2583 12.2075 13.4005 12.34L17.5305 16.47C17.6709 16.6106 17.7498 16.8012 17.7498 17C17.7498 17.1987 17.6709 17.3894 17.5305 17.53C17.4612 17.6001 17.3787 17.6557 17.2876 17.6935C17.1966 17.7312 17.099 17.7505 17.0005 17.75Z"
                  fill="#596471"
                />
              </svg>
            </i>
            <InputText
              className="h-10"
              placeholder="Buscar"
              onChange={(value) => onGlobalFilterChange(value)}
              value={valueFilterTable}
            />
          </span>
        </div>
      ) : (
        <p className="header-information text-black  biggest">
          {title ? title : "Resultados de búsqueda"}
        </p>
      )}
    </>
  );
};
// Metodo que retorna el icono o nombre de la accion
const paginatorHeader: PaginatorTemplateOptions = {
  layout: "CurrentPageReport RowsPerPageDropdown",
  CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
    return (
      <>
        <p className="header-information text-black medium big">
          Total de resultados
        </p>
        <p className="header-information text-three medium big">
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
        <p className="header-information text-black medium big">
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

const paginatorFooter: PaginatorTemplateOptions = {
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
  isDisabled: boolean;
}): React.JSX.Element => {
  return (
    <div className="spc-table-action-button">
      {props.actions.map((action, index) => (
        <div
          style={{ display: action.hide ? "none" : "block" }}
          key={index}
          onClick={() => action.onClick(props.row)}
        >
          {action.customIcon ? (
            <div className="button grid-button button-link">
              {action.customIcon()}
            </div>
          ) : (
            getIconElement(action.icon, "src", props.isDisabled)
          )}
        </div>
      ))}
    </div>
  );
};

export default React.memo(TableComponent);
