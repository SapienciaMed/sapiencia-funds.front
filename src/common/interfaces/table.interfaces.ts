export interface ITableElement<T> {
  header: string | JSX.Element;
  fieldName: string;
  required?: boolean;
  sorteable?: boolean;
  dataList?: IListTableElement[];
  renderCell?: (row: T) => JSX.Element;
  width?: string | number;
}

export interface IGroupTableElement<T> {
  header: string;
  fieldName: string;
  parent?: string;
  required?: boolean;
  dataList?: IListTableElement[];
  renderCell?: (row: T) => JSX.Element;
  width?: string | number;
  sortable?: boolean;
}

export interface IListTableElement {
  id: string | number;
  value: string;
}

export interface ITableAction<T> {
  icon?: "Detail" | "Edit" | "Delete" | "Link" | "download" | "DeleteFill" | "Manage" | "ChangeCut" | "More" | "Paperclip" | "";
  onClick: (row: T) => void;
  customName?: string;
  customIcon?: () => JSX.Element;
  hide?: boolean;
}
