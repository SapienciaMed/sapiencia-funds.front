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
  IReglamentConsolidation,
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
  const [listPrograms, setListPrograms] = useState<{ name: string; value: string }[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailData, setDetailData] = useState<IReglamentConsolidation>();

  const {getPrograms} = useRegulationApi();
  //react-router-dom
  const navigate = useNavigate();

  const resolver = useYupValidationResolver(searchRegulation);

  const {
    register,
    handleSubmit,
    formState,
    control,
    reset,
    setValue,
    getValues,
  } = useForm<IRegulationSearch>({ resolver });

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
    getPrograms().then(res => {
      if (res?.data) {
        const buildData = res.data.map((item) => {
          return {
            name: item.value,
            value: item.id.toString(),
          };
        });
        setListPrograms(buildData);
      }
    });
  }, []);

  const tableColumns: ITableElement<IReglamentConsolidation>[] = [
    {
      fieldName: "programs",
      header: 'Programa',
      renderCell: (row) => {
        return <>{row?.programName}</>;
      },
    },
    {
      fieldName: "initialPeriod",
      header: 'Periodo inicial',
      renderCell: (row) => {
        return <>{row?.initialPeriod}</>;
      },
    },
    {
      fieldName: "endPeriod",
      header: 'Periodo Final',
      renderCell: (row) => {
        return <>{row.endPeriod}</>;
      },
    },
    {
      fieldName: "theoreticalPercentage",
      header: <Tooltip text={"¿Aplica pago teórico?"} />,
      renderCell: (row) => {
        return <>{row.applyTheoreticalSemiannualPercent ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "applySocialService",
      header: <Tooltip text={"¿Aplica servicio social?"} />,
      renderCell: (row) => {
        return <>{row.applySocialService ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "applyKnowledgeTransfer",
      header: <Tooltip text={"¿Aplica trasferencia de conocimiento?"} />,
      renderCell: (row) => {
        return <>{row.applyKnowledgeTransfer ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "applyGracePeriod",
      header: <Tooltip text={"¿Aplica periodo de gracia?"} />,
      renderCell: (row) => {
        return <>{row.applyGracePeriod ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "applyContinuousSuspension",
      header: <Tooltip text={"¿Aplica suspensiones continuas?"} />,
      renderCell: (row) => {
        return <>{row.applyContinuousSuspension ? "SI" : "NO"}</>;
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
      fieldName: "applyExtension",
      header: <Tooltip text={"¿Aplica prórroga?"} />,
      renderCell: (row) => {
        return <>{row.applyExtension ? "SI" : "NO"}</>;
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
      fieldName: "applyAccomulatedIncomeCondonation",
      header: (
        <Tooltip
          text={
            "¿Aplica condonación por rendimiento académico final acumulado?"
          }
        />
      ),
      renderCell: (row) => {
        return <>{row.applyAccomulatedIncomeCondonation ? "SI" : "NO"}</>;
      },
    },
  ];

  const tableActions: ITableAction<IRegulation>[] = getActions();

  const newElement = () => navigate("form");

  const onSubmit = handleSubmit(async (data: IRegulationSearch) => {
    const getProgram: any = listPrograms.find((item) => item.name === data.programId || item.value === data.programId);
    const getListItem: any = periods.find( (item) => item.name === data.initialPeriod || item.value === data.initialPeriod); // esto viene de un endpoint


    const endPeriod = data?.endPeriod &&
      periods.find(
        (item) => item.name === data.endPeriod || item.value === data.endPeriod
    )?.value || null; 

    const buildData = {
      programId: parseInt(getProgram?.value) ?? null,
      initialPeriod: getListItem?.value ?? null, // TODO: Ajustar
      endPeriod: endPeriod, // TODO: Ajustar
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
    showTable,
    tableComponentRef,
    tableActions,
    newElement,
    setshowTable,
    reset,
    listPrograms,
    tableColumns,
    showDetailModal,
    setShowDetailModal,
    detailData,
    setValue,
    getValues,
  };
}
