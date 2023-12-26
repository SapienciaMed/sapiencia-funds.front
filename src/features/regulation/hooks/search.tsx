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
import { useRegulationApi } from "../service";
import Tooltip from "../../../common/components/Form/tooltip";
import { EResponseCodes } from "../../../common/constants/api.enum";
import DetailReglament from '../pages/detailt';

export default function useSearchRegulation(auth, authDetail, authEdit) {
  // Context
  const { setMessage, authorization } = useContext(AppContext);
  const [showTable, setShowTable] = useState(false);
  const [ showSpinner, setShowSpinner ] = useState(false)
  const tableComponentRef = useRef(null);
  const [listPrograms, setListPrograms] = useState<
    { name: string; value: string }[]
  >([]);
  const [arrayPeriod, setArrayPeriod] = useState<{name: string; value: string; id: number, nameComplementary?: string}[]>([])

  const { getPrograms, getPeriodsFromSapiencia } = useRegulationApi();
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
          setMessage({
            title: "Detalle Reglamento!",
            description: <DetailReglament
                detailData={row}
                errors={formState.errors}
                control={control}
                setValue={setValue}
                getValues={getValues}
                listPrograms={listPrograms}
              />,
            show: true,
            onClose: () => {
              setMessage({});
            },
           
            OkTitle: 'Cerrar',
            onOk: () => {
              setMessage({});
            },
            size: 'large',
            background: true,
          });
        },
      });
    }

    return actions;
  };

  useEffect(() => {
    getPrograms().then((res) => {
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

    getPeriodsFromSapiencia().then(resp => {
      if (resp.operation.code === EResponseCodes.OK) {
        const data = resp.data.map((item) => {
          return {
            name: item.nameComplementary,
            value: item.name,
            id: item.id,
            nameComplementary: item.nameComplementary
          };
        });
        setArrayPeriod(data);
      }
    })
  }, []);

  const tableColumns: ITableElement<IReglamentConsolidation>[] = [
    {
      fieldName: "programs",
      header: "Programa",
      renderCell: (row) => {
        return <>{row?.programName}</>;
      },
    },
    {
      fieldName: "initialPeriod",
      header: "Periodo inicial",
      renderCell: (row) => {
        return <>{row?.initialPeriod}</>;
      },
    },
    {
      fieldName: "endPeriod",
      header: "Periodo Final",
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
      fieldName: "applyAcademicPerformancePercent",
      header: <Tooltip text={"¿Aplica % RA?"} />,
      renderCell: (row) => {
        return <>{row.applyAcademicPerformancePercent ? "SI" : "NO"}</>;
      },
    },
    {
      fieldName: "requirementsPercent",
      header: <Tooltip text={"¿Aplica % Requisitos?"} />,
      renderCell: (row) => {
        return <>{row.requirementsPercent ? "SI" : "NO"}</>;
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
    setShowSpinner(true)
    const buildData = {
      programId: parseInt(data.programId) || null,
      initialPeriod: data?.initialPeriod ?? null,
      endPeriod: data?.endPeriod
    };
    setShowTable(true);

    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(buildData);
    }
  });

  return {
    register,
    control,
    onSubmit,
    showTable,
    tableComponentRef,
    tableActions,
    newElement,
    setShowTable,
    reset,
    setShowSpinner,
    listPrograms,
    tableColumns,
    arrayPeriod,
    showSpinner
  };
}
