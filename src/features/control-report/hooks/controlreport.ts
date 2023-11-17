import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { ITableAction } from "../../../common/interfaces/table.interfaces";
import { controlReportSchema } from "../../../common/schemas/controlReport-shema";

export interface IProperty {
  id?: number;
  plate: string; // BIE_PLACA_ACTIVO
  controlReport: number; // BIE_ESTADO_EQUIPO
  workerId: number;
  area: number; // BIE_AREA
  model: string; // BIE_MODELO
  measure: string; // BIE_MEDIDAS
  activeOwner: number; // BIE_PROPIETARIO_ACTIVO
  observation: string; // BIE_OBSERVACION
  brand: string; //BIE_MARCA
  clerk: number; // BIE_FUNCIONARIO
}
export interface IControlReportFilter {
  controlReport: number;
}

export interface IConfig {
  columnsTable?: boolean;
  listConfigColumns: object;
}

export const useConsultControlReport = (config: IConfig) => {
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [tableView, setTableView] = useState<boolean>(false);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const resolver = useYupValidationResolver(controlReportSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const [urlGet, setUrlGet] = useState(`fondos/seguimiento-financiero`);
  const urlGetConsult = `fondos/seguimiento-financiero`; // Endpoint del backend, (se colocan aquí)
  const [formWatch, setFormWatch] = useState({});
  const [tableColumns, setTableColumns] = useState([]);
  const [controlReport] = watch(["controlReport"]);

  const tableActions: ITableAction<IProperty>[] = [
    {
      icon: "Edit",
      onClick: (row) => {
        // navigate(`/contabilidad/activos-fijos/editar/${row.id}`);
      },
      //   hide: !validateActionAccess("BIEN_MUEBLE_EDITAR"),
    },
  ];

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  //   const onSubmit = () => {
  //     if (config.columnsTable) {
  //       console.log("controlReport: ***", controlReport);
  //       console.log("config.listConfigColumns: ***", config.listConfigColumns);
  //       setTableColumns(config.listConfigColumns[controlReport]);
  //       setUrlGet(`${urlGetConsult}/${controlReport}`);
  //       //   urlGetConsult = `${urlGetConsult}/${controlReport}`;
  //     }
  //   };

  const onSubmit = handleSubmit((filters: IControlReportFilter) => {
    if (config.columnsTable) {
      console.log("controlReport: ***", controlReport);
      console.log("config.listConfigColumns: ***", config.listConfigColumns);
      setTableColumns(config.listConfigColumns[controlReport]);
      setUrlGet(`${urlGetConsult}/${controlReport}`);
      //   urlGetConsult = `${urlGetConsult}/${controlReport}`;
    }
    setTableView(true);
    tableComponentRef.current?.loadData({
      ...filters,
    });
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  useEffect(() => {
    // const {} = formWatch;
    if (controlReport) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [controlReport]);

  return {
    tableComponentRef,
    setPaginateData,
    urlGet,
    tableView,
    onSubmit,
    register,
    control,
    errors,
    isValid,
    tableActions,
    submitDisabled,
    handleChange,
    handleClean,
    tableColumns,
  };
};
