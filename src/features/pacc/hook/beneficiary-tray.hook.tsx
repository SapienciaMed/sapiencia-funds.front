import { useContext, useEffect, useRef, useState } from "react";
import { ITableAction, ITableElement } from "../../../common/interfaces";
import {
  IConsolidationTrayForTechnicianCollection,
  IConsolidationTrayForTechnicianCollectionParams,
  IStepCashing,
} from "../interface/pacc";
import { usePaccServices } from "./pacc-serviceshook";
import { EResponseCodes, EStatePac } from "../../../common/constants/api.enum";
import { IDropdownProps } from "../../../common/interfaces/select.interface";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import ChangeCuttingBeneficiary from "../components/change-cutting-beneficiary";
import { useNavigate } from "react-router-dom";
import { typePrefixeTabs } from "../helpers/TypePrefixeTab";
import { useRegulationApi } from "../../regulation/hooks/regulation-api-service.hook";

export default function useBeneficiaryTray(typeState: number, isCut: boolean = true, changeCut: boolean = true, isProgram?: boolean, isDowloadFile?: boolean) {
 
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const { setMessage } = useContext(AppContext);
  const { GetCutsForConsolidationTray } = usePaccServices(typeState);
  const { getPrograms } = useRegulationApi()
  const [idCutData, setIdCutData] = useState<IDropdownProps[]>([]);
  const [ idProgramData, setIdProgramData ] = useState<IDropdownProps[]>([]);

  const [listSearch, setListSearch] = useState({
    data: {},
    status: false,
  });
  const [valueFilterTable, setValueFilterTable] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const { control, setValue, getValues, reset } = useForm<IStepCashing>();

  useEffect(() => {
    setShowSpinner(true);
    isCut ? getCuts() : reset({ idCut: undefined });
    isProgram ? getProgram() : reset({ idProgram: undefined })

    if (typeState) {
      setValueFilterTable("");
      setListSearch({
        data: {},
        status: false,
      });

      setTimeout(() => {
        setShowSpinner(false);
        loadTableData({ statusPaccSearch: typeState });
      }, 600);
    }

    return () => {
      setListSearch({
        data: {},
        status: false,
      });
    };
  }, [typeState, isCut, isProgram]);

  useEffect(() => {
    if (listSearch.status) {
      loadTableData(listSearch.data);
    }
  }, [listSearch]);

  const tableColumns =
    (): ITableElement<IConsolidationTrayForTechnicianCollectionParams>[] => {
      const a: ITableElement<IConsolidationTrayForTechnicianCollectionParams>[] =
        [
          {
            fieldName: "creditId",
            header: "Id crédito",
            hide: true,
          },
          {
            fieldName: "nroFiducy",
            header: "Nro contrato fiduciario",
            hide: true,
          },
          {
            fieldName: "document",
            header: "Documento",
            hide: true,
          },
          {
            fieldName: "fullName",
            header: "Nombres y Apellidos",
            hide: true,
          },
          {
            fieldName: "program",
            header: "Programa",
            hide: true,
          },
          {
            fieldName: "legalDate",
            header: "Fecha legalización",
            hide: true,
          },
          {
            fieldName: "dateIncomeCut",
            header: "Fecha ingreso al corte",
            renderCell(row) {
              const date = new Date(row.dateIncomeCut);
              const day = date.getUTCDate();
              const month = date.getUTCMonth() + 1;
              const year = date.getUTCFullYear();

              return (
                <div>
                  {year}/{month < 10 ? "0" + month : month}/
                  {day < 10 ? "0" + day : day}
                </div>
              );
            },
            hide: !changeCut
        },
        {
          fieldName: "cut",
          header: "Corte",
          hide: true,
        },
        {
          fieldName: "dateFinallyCut",
          header: "Fecha final corte",
          hide: true,
          renderCell(row) {
            const date = new Date(row.dateFinallyCut);
            const day = date.getUTCDate();
            const month = date.getUTCMonth() + 1;
            const year = date.getUTCFullYear();

            return (
              <div>
                {year}/{month < 10 ? "0" + month : month}/
                {day < 10 ? "0" + day : day}
              </div>
            );
          },
        },
        {
          fieldName: "dateEndGracePeriod",
          header: "Fecha fin periodo de gracia",
          hide: true,
          renderCell(row) {
            const date = new Date(row.dateEndGracePeriod);
            const day = date.getUTCDate();
            const month = date.getUTCMonth() + 1;
            const year = date.getUTCFullYear();

            return (
              <div>
                {year}/{month < 10 ? "0" + month : month}/
                {day < 10 ? "0" + day : day}
              </div>
            );
          },
        },
        {
          fieldName: "status",
          header: "Estado",
          hide: true,
        },
        {
          fieldName: "reason",
          header: "Motivo",
          hide: true,
        },
        {
          fieldName: "characterization",
          header: "Caracterización",
          hide: true,
        },
        {
          fieldName: "currentResponsible",
          header: "Responsable actual",
          hide: true,
        },
        ];

      return a.filter((u) => u.hide);
    };

  const tableActions: ITableAction<IConsolidationTrayForTechnicianCollectionParams>[] =
    [
      {
        icon: "ChangeCut",
        onClick: (row) => {
          let newArray = idCutData.filter((item) => item.value !== "TODOS");
          setMessage({
            show: true,
            title: "Mover beneficiario a otro corte",
            description: (
              <ChangeCuttingBeneficiary
                idBenef={row.idBenef}
                idCutData={newArray}
                typeState={typeState}
              />
            ),
            background: true,
            onOk() {
              setMessage({});
            },
          });
        },
        hide: !changeCut,
      },
      {
        icon: "Manage",
        onClick: (row) => {
          // condicion para llevar a la vista de gestionar = Tab "Técnico paso al cobro" o Tab "Servicio social"
          (typeState == EStatePac.TecnhicianStepCashing ||
            typeState === EStatePac.SocialService) &&
            navigate(`./gestion/${row.idBenef}/${typeState}`);
        },
      },
    ];

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  const handleFilterChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    setValueFilterTable(value.target.value);
    timer && clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setShowSpinner(true);
      if (value.target.value != undefined && value.target.value.length > 0 && getValues("idCut") != null) {
        const searchCriteriaData = {
          searchParam: value.target.value,
          [getValues("idCut") == "TODOS" ? "cutParamName" : "cutParamId"]:
            getValues("idCut"),
          page: 1,
          perPage: 10,
          statusPaccSearch: typeState,
        };
        
        const idProgramValue = getValues('idProgram');
        if (idProgramValue !== undefined) {
          searchCriteriaData.programParamId = parseInt(idProgramValue);
        }
        setListSearch({
          data: searchCriteriaData,
          status: true,
        });
      } else {
        const searchCriteriaData = {
          [getValues("idCut") == "TODOS" ? "cutParamName" : "cutParamId"]:
            getValues("idCut") || "",
          statusPaccSearch: typeState,
          searchParam: value.target.value || "",
        };

        setListSearch({
          data: {},
          status: false,
        });
        loadTableData(searchCriteriaData);
      }
      setShowSpinner(false);
    }, 700);

    setTimer(newTimer);
  };

  const handleChangeCut = (value: any) => {
    if (value != null) {
      const data: IConsolidationTrayForTechnicianCollection = {
        [value === "TODOS" ? "cutParamName" : "cutParamId"]: value,
        searchParam: valueFilterTable || "",
        page: 1,
        perPage: 10,
        statusPaccSearch: typeState,
      };
  
      // Verificar si getValues('idProgram') tiene valor antes de añadirlo al objeto
      const idProgramValue = getValues('idProgram');
      if (idProgramValue !== undefined) {
        data.programParamId = parseInt(idProgramValue);
      }

      setListSearch({
        data,
        status: true,
      });
    }
  };

  const handleChangeProgram = (value: any) => {
    if (value != null) {
      const data: IConsolidationTrayForTechnicianCollection = {
        programParamId: value,
        searchParam: valueFilterTable || "",
        page: 1,
        perPage: 10,
        statusPaccSearch: typeState,
        [value === "TODOS" ? "cutParamName" : "cutParamId"]: getValues('idCut'),
      };

      setListSearch({
        data,
        status: true,
      });
     
    }
  }

  const getCuts = () => {
    isCut &&
      GetCutsForConsolidationTray()
        .then((response) => {
          setShowSpinner(false);
          if (response.operation.code === EResponseCodes.OK) {
            const CurrentDate = new Date();

            const elementsWithCurrentDate = response.data.filter((item) => {
              const fromDate = new Date(item.from);
              const untilDate = new Date(item.until);
              return fromDate <= CurrentDate && CurrentDate <= untilDate;
            });

            // Ordena los elementos filtrados por fecha de creación en orden descendente
            elementsWithCurrentDate.sort(
              (a, b) =>
                new Date(b.createDate).getTime() -
                new Date(a.createDate).getTime()
            );

            // Filtra los elementos que no contienen la fecha actual en su rango
            const elementsWithoutCurrentDate = response.data.filter(
              (item) => !elementsWithCurrentDate.includes(item)
            );

            const dataConcat = elementsWithCurrentDate.concat(
              elementsWithoutCurrentDate
            );

            const data = dataConcat?.map((item: any) => {
              return {
                name: item.name,
                value: item.id,
              };
            });
            const newData = [...data, { name: "Todos", value: "TODOS" }];
            setValue("idCut", newData[0].value);
            setIdCutData(newData);
          }
        })
        .catch((error) => console.log(error));
  };

  const getProgram = () => {
    isProgram &&
      getPrograms()
        .then((response) => {
          setShowSpinner(false);
          if (response.operation.code === EResponseCodes.OK) {
            const data = response.data?.map((item: any) => {
              return {
                name: item.value,
                value: item.id,
              };
            });
            setValue("idProgram", data[0].value);
            setIdProgramData(data);    
          }
        })
        .catch((error) => console.log(error));
  }

  const apiUrl = () => {
    const baseApiUrl = process.env.urlApiFunds;
    const endpoint = listSearch.status
        ? "get-consolidation-tray-by-cut"
        : "get-consolidation-tray";

    return `${baseApiUrl}/api/v1/${typePrefixeTabs(typeState)}/${endpoint}`;
  };

  const resetValue = () => {
    setValueFilterTable("");
  }

  return {
    tableComponentRef,
    tableColumns,
    tableActions,
    idCutData,
    control,
    showSpinner,
    valueFilterTable,
    idProgramData,
    handleFilterChange,
    handleChangeCut,
    apiUrl,
    setShowSpinner,
    resetValue,
    handleChangeProgram
  };
}
