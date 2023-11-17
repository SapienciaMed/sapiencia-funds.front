import { useContext, useEffect, useRef, useState } from "react";
import { useVotingService } from "../../../common/hooks/voting-service.hook";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchVotings } from "../../../common/schemas/voting-schema";
import { IVotingCreate } from "../../../common/interfaces/voting.interfaces";
import { ApiResponse } from "../../../common/utils/api-response";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import useVotingItemApi from "./voting-items-api.hooks";

export const useVotingResultsSearch = () => {
  const { setMessage } = useContext(AppContext);
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(searchVotings);
  const { downloadFile, consultVoting } = useVotingService();
  const tableComponentRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [deparmetList, setDeparmentList] = useState([]);
  const { getListByGroupers } = useGenericListService();
  const [valCommuneNeighborhood, setValCommuneNeighborhood] = useState();
  const [sendingXLSX, setSendingXLSX] = useState(false);
  const [dataTblTotal, setDataTblTotal] = useState([]);
  const { getProjectsList } = useVotingItemApi();
  const [projectList, setProjectsList] = useState([]);

  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm<IVotingCreate>({
    resolver,
    mode: "all",
    defaultValues: {
      communeNeighborhood: null,
      numberProject: null,
      validity: "",
      ideaProject: "",
    },
  });

  const dataForm = getValues();

  const onSubmitSearch = async () => {
    loadTableData(dataForm);
  };

  /*Functions*/
  const onSubmitSearchVoting = handleSubmit(async (data: IVotingCreate) => {
    loadTableData({
      communeNeighborhood: data?.communeNeighborhood,
      numberProject: data?.numberProject,
      validity: data?.validity,
      ideaProject: data?.ideaProject,
    });
    if (
      data?.numberProject &&
      data?.validity &&
      data?.ideaProject &&
      data?.communeNeighborhood
    ) {
      const dataConsult: any = await consultVoting(data);
      setDataTblTotal(dataConsult.data.data);
    }
  });

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  const CancelFunction = () => {
    setMessage({
      show: true,
      title: "Cancelar",
      description: "¿Estás segur@ de cancelar esta acción en el sistema?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        navigate("/core/usuarios/consultar");
        setMessage((prev) => ({ ...prev, show: false }));
      },
      background: true,
    });
  };

  useEffect(() => {
    const groupers = ["COMUNA_CORREGIMIENTO"];
    getListByGroupers(groupers).then(
      (response: ApiResponse<IGenericList[]>) => {
        if (response && response?.operation?.code === EResponseCodes.OK) {
          setDeparmentList(
            response.data.map((item) => {
              const list = {
                name: item.itemDescription,
                value: item.itemCode,
              };
              return list;
            })
          );
        }
      }
    );

    getProjectsList().then((response) => {
      if (response && response?.operation?.code === EResponseCodes.OK) {
        setProjectsList(
          response.data.map((item) => {
            const list = {
              value: item.bpin,
              name: item.bpin,
              meta: item.goal,
            };
            return list;
          })
        );
      }
    });
  }, []);

  const downloadXLSX = async () => {
    await downloadFile(dataForm).then((resp: any) => {
      const buffer = new Uint8Array(resp.data.data); // Convierte el Array del búfer en Uint8Array
      const blob = new Blob([buffer]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ResultadosVotacion.xls`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setMessage({
        title: `Resultados de votación`,
        description: `Información descargada exitosamente`,
        show: true,
        OkTitle: "Aceptar",
        background: true,
      });
    });
  };

  return {
    onSubmitSearch,
    loadTableData,
    tableComponentRef,
    register,
    errors,
    sending,
    setSending,
    onSubmitSearchVoting,
    CancelFunction,
    deparmetList,
    valCommuneNeighborhood,
    setValCommuneNeighborhood,
    reset,
    control,
    downloadXLSX,
    sendingXLSX,
    setSendingXLSX,
    dataTblTotal,
    setDataTblTotal,
    projectList,
  };
};
