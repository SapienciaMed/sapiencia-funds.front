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

export default function useSearchRegulation(auth, authDetail, authEdit) {
  // Context
  const { setMessage, authorization } = useContext(AppContext);
  const [showTable, setshowTable] = useState(false);
  const tableComponentRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [listPrograms, setListPrograms] = useState<
    { name: string; value: string }[]
  >([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailData, setDetailData] = useState<IRegulation>();

  const {
    getRegulationById,
    editRegulation,
    createRegulationAction,
    getPrograms,
  } = useRegulationApi();
  //react-router-dom
  const navigate = useNavigate();

  const resolver = useYupValidationResolver(searchRegulation);

  const {
    register,
    handleSubmit,
    formState,
    control,
    watch,
    reset,
    setValue,
    getValues,
  } = useForm<IRegulationSearch>({ resolver });

  const [deparmetList, setDeparmentList] = useState([]);

  //permisions
  useEffect(() => {
    const findPermission = authorization?.allowedActions?.findIndex(
      (i) => i == auth
    );
    if (findPermission <= 0) {
      setMessage({
        title: "¡Acceso no autorizado!",
        description: "Consulte con el admimistrador del sistema.",
        show: true,
        OkTitle: "Aceptar",
        onOk: () => {
          navigate("/core");
          setMessage({});
        },
        background: true,
      });
      return;
    }
  }, [auth, authorization]);

  //permissions
  const getActions = () => {
    const actions = [];

    const detailPermissions = authorization?.allowedActions?.findIndex(
      (i) => i == authDetail
    );

    const editPermissions = authorization?.allowedActions?.findIndex(
      (i) => i == authEdit
    );

    if (editPermissions > 0) {
      actions.push({
        icon: "EditFill",
        onClick: (row) =>
          navigate("/fondos/administracion/reglamento/form/" + row.id),
      });
    }

    if (detailPermissions > 0) {
      actions.push({
        icon: "Detail",
        onClick: (row) => {
          setDetailData(row);
          setShowDetailModal(true);
        },
      });
    }

    return actions;
  };

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
  }, [loading, showDetailModal]);

  const tableColumns: ITableElement<IRegulation>[] = [
    {
      fieldName: "row.regulation.program",
      header: 'Programa',
      renderCell: (row) => {
        const getListItem: any = listPrograms.find(
          (item) => item.name === row.program || item.value === row.program
        );
        return <>{getListItem?.name}</>;
      },
    },
    {
      fieldName: "row.regulation.initialPeriod",
      header: 'Periodo inicial',
      renderCell: (row) => {
        const getListItem: any = periods.find(
          (item) =>
            item.name === row.initialPeriod || item.value === row.initialPeriod
        );
        return <>{getListItem?.name}</>;
      },
    },
    {
      fieldName: "row.regulation.endPeriod",
      header: 'Periodo Final',
      renderCell: (row) => {
        const getListItem: any = periods.find(
          (item) => item.name === row.endPeriod || item.value === row.endPeriod
        );
        return <>{getListItem?.name ? getListItem?.name : ""}</>;
      },
    },
    {
      fieldName: "row.regulation.endPeriod",
      header: <div style={{ fontWeight: 400 }}>{"% Pago Teorico"}</div>,
      renderCell: (row) => {
        return <>{row.theoreticalPercentage}%</>;
      },
    },
    {
      fieldName: "row.regulation.applySocialService",
      header: <Tooltip text={"¿Aplica servicio social?"} />,
      renderCell: (row) => {
        return <>{row.applySocialService ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.knowledgeTransferApply",
      header: <Tooltip text={"¿Aplica trasferencia de conocimiento?"} />,
      renderCell: (row) => {
        return <>{row.knowledgeTransferApply ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.gracePeriodApply",
      header: <Tooltip text={"¿Aplica periodo de gracia?"} />,
      renderCell: (row) => {
        return <>{row.gracePeriodApply ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.continuousSuspensionApplies",
      header: <Tooltip text={"¿Aplica suspensiones continuas?"} />,
      renderCell: (row) => {
        return <>{row.continuousSuspensionApplies ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.applyDiscontinuousSuspension",
      header: <Tooltip text={"¿Aplica suspensiones discontinuas?"} />,
      renderCell: (row) => {
        return <>{row.applyDiscontinuousSuspension ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.applySpecialSuspensions",
      header: <Tooltip text={"¿Aplica suspensiones especiales?"} />,
      renderCell: (row) => {
        return <>{row.applySpecialSuspensions ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.extensionApply",
      header: <Tooltip text={"¿Aplica prórroga?"} />,
      renderCell: (row) => {
        return <>{row.extensionApply ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "row.regulation.applyCondonationPerformancePeriod",
      header: (
        <Tooltip
          text={"¿Aplica condonación por rendimiento académico por periodo?"}
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
            "¿Aplica condonación por rendimiento académico final acumulado?"
          }
        />
      ),
      renderCell: (row) => {
        return <>{row.accomulatedIncomeCondonationApplies ? "SI" : "NO"}</>;
      },
    },
  ];

  const tableActions: ITableAction<IRegulation>[] = getActions();

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

    const endPeriod = data?.endPeriod
      ? periods.find(
          (item) =>
            item.name === data.endPeriod || item.value === data.endPeriod
        ).value
      : null;

    const buildData = {
      program: getProgram?.value ? getProgram?.value : null,
      initialPeriod: getListItem?.value ? getListItem?.value : null,
      endPeriod: endPeriod,
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
    showDetailModal,
    setShowDetailModal,
    detailData,
    setValue,
    getValues,
  };
}
