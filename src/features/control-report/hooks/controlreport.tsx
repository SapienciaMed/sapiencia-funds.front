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
import Estratum123Tab from "../pages/conditionalPages/stratum123";
import LegalizacionTab from "../pages/conditionalPages/legalizacionTab";
import PagareTab from "../pages/conditionalPages/pagareTab";
import ControlTab from "../pages/conditionalPages/controlTab";
import Stratum456Tab from "../pages/conditionalPages/stratum456Tab";
export interface IControlReportFilter {
  noProject: string;
  validity: string;
  idConvocatoria: number;
  idControlSelect: number;
  id_comuna: number | number[] | string;
}

export interface IConfig {
  columnsTable?: boolean;
  listConfigColumns: object;
}

export const useConsultControlReport = () => {
  const [tableView, setTableView] = useState<boolean>(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [bandProyect, setbandProyect] = useState(false);
  const [bandValidiy, setbandValidiy] = useState(false);
  const [bandComuna, setbandComuna] = useState(false);
  const [conditionalPage, setconditionalPage] = useState(null);
  const tableComponentRef = useRef(null);
  const resolver = useYupValidationResolver(controlReportSchema);
  const [currentIdControlSelect, setCurrentIdControlSelect] = useState(null);
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "all" });
  const [idConvocatoria, idControlSelect, id_comuna] = watch([
    "idConvocatoria",
    "idControlSelect",
    "id_comuna",
  ]);

  useState(null);
  const [formWatch, setFormWatch] = useState({
    noProject: "",
    validity: "",
  });

  const handleClean = () => {
    reset();
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const [reload, setReload] = useState(new Date());
  const onSubmit = handleSubmit((filters: IControlReportFilter) => {
    tableComponentRef.current?.emptyData();
    setTableView(true);
    // const idConvocatoria = watch("idConvocatoria");
    const { noProject, validity } = formWatch;
    filters.noProject = noProject;
    filters.validity = validity;

    setReload(new Date());
    switch (filters.idControlSelect) {
      case 1: {
        setconditionalPage(<ConsolidateTab data={filters} reload={reload} />);
        break;
      }
      case 2: {
        setconditionalPage(
          <Estratum123Tab filters={filters} reload={reload} />
        );
        break;
      }
      case 3: {
        setconditionalPage(<Stratum456Tab data={filters} reload={reload} />);
        break;
      }
      case 4: {
        setconditionalPage(<LegalizacionTab data={filters} reload={reload} />);
        break;
      }
      case 5: {
        setconditionalPage(<PagareTab data={filters} reload={reload} />);
        break;
      }
      case 6: {
        setconditionalPage(<ControlTab data={filters} reload={reload} />);
        break;
      }
      default: {
        break;
      }
    }
  });

  // useEffect(() => {
  //   const { noProject, validity } = formWatch;

  //   if (idControlSelect == 1 || idControlSelect == 2 || idControlSelect == 3) {
  //     if (noProject && validity && idConvocatoria) {
  //       return setSubmitDisabled(false);
  //     } else {
  //       return setSubmitDisabled(true);
  //     }
  //   }

  //   if (idControlSelect == 4 || idControlSelect == 5) {
  //     if (idConvocatoria) {
  //       return setSubmitDisabled(false);
  //     } else {
  //       return setSubmitDisabled(true);
  //     }
  //   }

  //   if (idControlSelect == 6) {
  //     if (idConvocatoria && id_comuna) {
  //       return setSubmitDisabled(false);
  //     } else {
  //       return setSubmitDisabled(true);
  //     }
  //   }
  //   setSubmitDisabled(true);
  // }, [formWatch, idConvocatoria, idControlSelect, id_comuna]);

  useEffect(() => {
    if (idControlSelect == 1 || idControlSelect == 2 || idControlSelect == 3) {
      return setbandProyect(true), setbandValidiy(true);
    }
    if (idControlSelect == 6) {
      return setbandComuna(true);
    }
    setbandProyect(false);
    setbandValidiy(false);
    setbandComuna(false);
  }, [idControlSelect]);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

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
    conditionalPage,
    bandProyect,
    bandValidiy,
    bandComuna,
  };
};
