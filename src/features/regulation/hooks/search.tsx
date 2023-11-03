import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ITableAction,
  ITableElement,
} from "../../../common/interfaces/table.interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchRegulation } from "../../../common/schemas/regulation-schema";
import {
  IRegulation,
  IRegulationSearch,
} from "../../../common/interfaces/regulation";
import { periods, useRegulationApi } from "../service";
import Tooltip from "../../../common/components/Form/tooltip";

export default function useSearchRegulation() {
  // Context
  const { setMessage } = useContext(AppContext);
  const [showTable, setshowTable] = useState(false);
  const tableComponentRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [listPrograms, setListPrograms] = useState<
    { name: string; value: string }[]
  >([]);
  const {
    getRegulationById,
    editRegulation,
    createRegulationAction,
    getPrograms,
  } = useRegulationApi();
  //react-router-dom
  const navigate = useNavigate();

  const resolver = useYupValidationResolver(searchRegulation);

  const { register, handleSubmit, formState, control, watch, reset } =
    useForm<IRegulationSearch>({ resolver });

  const [deparmetList, setDeparmentList] = useState([]);

  useEffect(() => {
    const getListPrograms = async () => {
      const res = await getPrograms();
      if (res?.data) {
        const buildData = res.data.map((item) => {
          return {
            name: item.value,
            value: item.id.toString(),
          };
        });
        setListPrograms(buildData);
      }
    };

    getListPrograms();
    setLoading(false);
  }, [loading]);

  const tableColumns: ITableElement<IRegulation>[] = [
    {
      fieldName: "row.regulation.program",
      header: <>{"Programa"}</>,
      renderCell: (row) => {
        const getListItem: any = listPrograms.find(
          (item) => item.name === row.program || item.value === row.program
        );
        return <>{getListItem.name}</>;
      },
    },
    {
      fieldName: "row.regulation.initialPeriod",
      header: "Periodo inicial",
      renderCell: (row) => {
        const getListItem: any = periods.find(
          (item) =>
            item.name === row.initialPeriod || item.value === row.initialPeriod
        );
        return <>{getListItem.name}</>;
      },
    },
    {
      fieldName: "row.regulation.endPeriod",
      header: "Periodo Final",
      renderCell: (row) => {
        const getListItem: any = periods.find(
          (item) => item.name === row.endPeriod || item.value === row.endPeriod
        );
        return <>{getListItem?.name ? getListItem?.name : ""}</>;
      },
    },
    {
      fieldName: "row.regulation.endPeriod",
      header: "% Pago Teorico",
      renderCell: (row) => {
        return <>{row.theoreticalPercentage}%</>;
      },
    },
    {
      fieldName: "row.regulation.applySocialService",
      header: "¿Aplica servicio social?",
      renderCell: (row) => {
        return <>{row.applySocialService ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.knowledgeTransferApply",
      header: "¿Aplica periodo de gracia?",
      renderCell: (row) => {
        return <>{row.knowledgeTransferApply ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.continuousSuspensionApplies",
      header: "¿Aplica suspencion continua?",
      renderCell: (row) => {
        return <>{row.continuousSuspensionApplies ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.applyDiscontinuousSuspension",
      header: <Tooltip text={"¿Aplica suspencion discontinua?"} />,
      renderCell: (row) => {
        return <>{row.applyDiscontinuousSuspension ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.applySpecialSuspensions",
      header: <Tooltip text={"¿Aplica suspencion especiales?"} />,
      renderCell: (row) => {
        return <>{row.applySpecialSuspensions ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.applyCondonationPerformancePeriod",
      header: (
        <Tooltip
          text={"¿Aplica condonacion por rendimiento academico por periodo?"}
        />
      ),
      renderCell: (row) => {
        return <>{row.applyCondonationPerformancePeriod ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.accomulatedIncomeCondonationApplies",
      header: (
        <Tooltip
          text={
            "¿Aplica condonacion por rendimiento academico final acomulado?"
          }
        />
      ),
      renderCell: (row) => {
        return <>{row.accomulatedIncomeCondonationApplies ? "SI" : "NO"}</>;
      },
    },
  ];

  const tableActions: ITableAction<IRegulation>[] = [
    {
      icon: "Edit",
      onClick: (row) =>
        navigate("/fondos/administracion/reglamento/form/" + row.id),
    },
    {
      icon: "Detail",
      onClick: (row) =>
        navigate(
          "/fondos/administracion/reglamento/form/" + row.id + "onlyView"
        ),
    },
  ];

  const formValues = watch();

  const newElement = () => navigate("form");

  const onSubmit = handleSubmit(async (data: IRegulation) => {
    const getProgram: any = listPrograms.find(
      (item) => item.name === data.program || item.value === data.program
    );
    const getListItem: any = periods.find(
      (item) =>
        item.name === data.initialPeriod || item.value === data.initialPeriod
    );

    const buildData = {
      program: getProgram.value,
      initialPeriod: getListItem.value,
      endPeriod: data?.endPeriod
        ? periods.find(
            (item) =>
              item.name === data.endPeriod || item.value === data.endPeriod
          ).value
        : null,
    };

    setshowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(buildData);
    }
  });

  return {
    register,
    control,
    formState,
    onSubmit,
    formValues,
    showTable,
    tableComponentRef,
    tableActions,
    deparmetList,
    newElement,
    setshowTable,
    reset,
    loading,
    setLoading,
    listPrograms,
    tableColumns,
  };
}
