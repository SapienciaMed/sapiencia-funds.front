import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchResumenPriorizacion } from "../../../common/schemas/resumen-priorizacion-schema";
import { IVotingCreate } from "../../../common/interfaces/voting.interfaces";
import { ApiResponse } from "../../../common/utils/api-response";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";

export const useResumenPriorizacionSearch = () => {
  const { setMessage, authorization, setDataGrid, dataGrid } =
    useContext(AppContext);
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(searchResumenPriorizacion);
  const tableComponentRef = useRef(null);
  const [sending, setSending] = useState(false);
  const [deparmetList, setDeparmentList] = useState([]);
  const { getListByGroupers } = useGenericListService();
  const [valCommuneNeighborhood, setValCommuneNeighborhood] = useState();

  const onSubmitSearch = async () => {
    loadTableData({});
  };
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<IVotingCreate>({ resolver });

  /*Functions*/
  const onSubmitSearchVoting = handleSubmit((data: IVotingCreate) => {
    loadTableData({
      communeNeighborhood: valCommuneNeighborhood,
      numberProject: data?.numberProject,
      validity: data?.validity,
      ideaProject: data?.ideaProject,
    });
  });

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  const confirmVotingCreation = async (data: IVotingCreate) => {
    setSending(true);
  };

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
  }, []);

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
  };
};
