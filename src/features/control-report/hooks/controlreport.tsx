import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { controlReportSchema } from "../../../common/schemas/controlReport-shema";
import ConsolidateTab from "../pages/conditionalPages/consolidateTab";
import Estratos123Tab from "../pages/conditionalPages/estratos123Tab";
import Estratos456Tab from "../pages/conditionalPages/estratos456Tab";
import LegalizacionTab from "../pages/conditionalPages/legalizacionTab";
import PagareTab from "../pages/conditionalPages/pagareTab";
import ControlTab from "../pages/conditionalPages/controlTab";
export interface IControlReportFilter {
  noProject: string;
  validity: string;
  valueConvocatoria: string;
  idControlSelect: number;
}

export interface IConfig {
  columnsTable?: boolean;
  listConfigColumns: object;
}

export const useConsultControlReport = () => {
  const [tableView, setTableView] = useState<boolean>(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [conditionalPage, setconditionalPage] = useState(null);
  const resolver = useYupValidationResolver(controlReportSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const [controlReport] = watch(["controlReport"]);

  useState(null);
  const [formWatch, setFormWatch] = useState({
    noProject: "",
    validity: "",
  });

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    setTableView(false);
  };

  const onSubmit = handleSubmit((filters: IControlReportFilter) => {
    const { noProject, validity } = formWatch;
    filters.noProject = noProject;
    filters.validity = validity;
    filters.valueConvocatoria = "2023-1";

    if (filters.idControlSelect == 1) {
      setconditionalPage(<ConsolidateTab data={filters} />);
    }
    if (filters.idControlSelect == 2) {
      setconditionalPage(<Estratos123Tab />);
    }
    if (filters.idControlSelect == 3) {
      setconditionalPage(<Estratos456Tab />);
    }
    if (filters.idControlSelect == 4) {
      setconditionalPage(<LegalizacionTab />);
    }
    if (filters.idControlSelect == 5) {
      setconditionalPage(<PagareTab />);
    }
    if (filters.idControlSelect == 6) {
      setconditionalPage(<ControlTab />);
    }
    setTableView(true);
  });

  const updateOrSaveData = (data) => {
    console.log(data);
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  useEffect(() => {
    if (controlReport) {
      return setSubmitDisabled(false);
    }
    setSubmitDisabled(true);
  }, [controlReport]);

  return {
    tableView,
    onSubmit,
    register,
    control,
    errors,
    isValid,
    submitDisabled,
    handleChange,
    handleClean,
    updateOrSaveData,
    conditionalPage,
  };
};
