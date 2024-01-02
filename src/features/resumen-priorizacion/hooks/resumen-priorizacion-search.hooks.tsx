import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { searchResumenPriorizacion } from "../../../common/schemas/resumen-priorizacion-schema";
import { ApiResponse } from "../../../common/utils/api-response";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { IResumenPriorizacion } from "../../../common/interfaces/resumenPriorizacion.interfaces";
import useSumaryPrioricions from "../hooks/resumen-priorizacion-api.hooks"
import useVotingItemApi from "../../voting-results/hooks/voting-items-api.hooks";
export const useResumenPriorizacionSearch = () => {
  const { setMessage } =
    useContext(AppContext);
  const navigate = useNavigate();
  const resolver = useYupValidationResolver(searchResumenPriorizacion);
  const tableComponentRef = useRef(null);
  const [sending, setSending] = useState(false);
  const { getProjectsList } = useVotingItemApi();
  const [projectList, setProjectsList] = useState([]);
  const [deparmetList, setDeparmentList] = useState<
    { name: string; value: string }[]
  >([]);
  const { getListByGroupers } = useGenericListService();
  const [valCommuneNeighborhood, setValCommuneNeighborhood] = useState();
  const { downloadFile } = useSumaryPrioricions();
  const onSubmitSearch = async () => {
    loadTableData({});
  };
  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm<IResumenPriorizacion>({
    resolver,
    defaultValues: {
      communeNeighborhood: null,
      numberProject: '',
      validity: '',
    }
  }
  );

  /*Functions*/
  const onSubmitSearchVoting = handleSubmit(async (data: IResumenPriorizacion) => {
    loadTableData({
      communeNeighborhood: data?.communeNeighborhood,
      numberProject: data?.numberProject,
      validity: data?.validity,
    });
  });

  

  function loadTableData(searchCriteria?: object): void {
    if (tableComponentRef.current) {
      tableComponentRef.current.loadData(searchCriteria);
    }
  }

  const confirmVotingCreation = async (data: IResumenPriorizacion) => {
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

  const downloadXLSX = async () => {
    const dataForm = getValues();
    await downloadFile(dataForm).then((resp : any) => {
          const buffer = new Uint8Array(resp.data.data); // Convierte el Array del búfer en Uint8Array
          const blob = new Blob([buffer]);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `ResumenPriorizacion.xls`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          setMessage({
            title: `Descargar excel`,
            description: `El archivo fue descargado con éxito`,
            show: true,
            OkTitle: "Aceptar",
            background: true,
          });
    })
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

  useEffect(() => { 
     getProjectsList().then((response) => {
       if (response && response?.operation?.code === EResponseCodes.OK) {
         setProjectsList(
           response.data.map((item) => {
            const { bpin, goal, project } = item
             const list = {
               value: bpin,
               name: `${bpin} - ${project}`,
               meta: goal,
             };
             return list;
           })
         );
       }
     });
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
    downloadXLSX,
    projectList
  };
};
