import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createVotings } from "../../../common/schemas/voting-schema";
import {
  IVotingCreate,
  IItemSave,
} from "../../../common/interfaces/voting.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useVotingService } from "../../../common/hooks/voting-service.hook";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IGenericList } from "../../../common/interfaces/global.interface";
import ItemResultsPage from "../pages/item.create.page";
import { useItemResults } from "./item.create.hooks";
import useVotingItemApi from "./voting-items-api.hooks";
import { number } from "yup";


export const useVotingResults = () => {

    const [sending, setSending] = useState(false);
    const { setMessage, authorization, setDataGrid, dataGrid } =
      useContext(AppContext);
    const navigate = useNavigate();
    const resolver = useYupValidationResolver(createVotings);
    const { getListByParent } = useGenericListService();
    const [deparmetList, setDeparmentList] = useState([]);
    const tableComponentRef = useRef(null);
    const [itemSave, setItemSave] = useState(Array<IItemSave>);
    const [valCommuneNeighborhood, setValCommuneNeighborhood] = useState();

    const { createVotingResults } = useVotingItemApi();

    const { createVoting } = useVotingService();

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        reset,
    } = useForm<IVotingCreate>({ resolver });
    
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


    const addItem = handleSubmit((data: IVotingCreate) => { 
        console.log("data en agregar item ", data)
        if (data.communeNeighborhood && data.numberProject && data.ideaProject && data.validity) {
            setMessage({
              show: true,
              title: "Agregar item",
              // OkTitle: "Aceptar",
              // cancelTitle: "Cancelar",
              onOk() {
                setMessage({});
              },
              background: true,
              description: <ItemResultsPage dataVoting={data} action={"new"} />,
              size: "large",
              style: "mdl-agregarItem-voting",
            });
          onSubmitSearch();
        } else {
            setMessage({
              show: true,
              title: "Error",
              description: "Debe llenar todos los campos",
              OkTitle: "Aceptar",
              cancelTitle: "Cancelar",
              onOk() {
                setMessage({});
              },
              background: true,
            });
            }

    })

    /*Functions*/
    const onSubmitCreateVoting = handleSubmit((data: IVotingCreate) => {    
        setMessage({
          show: true,
          title: "Crear usuario",
          description: "¿Estás segur@ de crear un nuevo usuario en el sistema?",
          OkTitle: "Crear",
          cancelTitle: "Cancelar",
          onOk() {
            confirmVotingCreation(data);
          },
          background: true,
        });
    });
  
    const onSubmitSearch = async () => {
      loadTableData({});
    };

    function loadTableData(searchCriteria?: object): void {
      if (tableComponentRef.current) {
        tableComponentRef.current.loadData(searchCriteria);
      }
    }


    const confirmVotingCreation = async (data: IVotingCreate) => { 


         setSending(true);
      
          dataGrid.map((e) => {
            itemSave.push({
              aimStraight: e.directObject,
              productCatalogueDnp: e.productCatalog,
              codProductgueDnp: e.productCode,
              codPmaProgram: 1,
              codMtaTeacherActivity: 1,
              amount: e.amount,
              costTotal: e.totalCost,
              percentage123: e.porcentaje123,
              percentage456: e.porcentaje456,
            });
          })

        const votingData = {
          communeNeighborhood: valCommuneNeighborhood,
          numberProject: data.numberProject,
          validity: data.validity,
          ideaProject: data.ideaProject,
          items: itemSave,
        };

        const res = await createVotingResults(votingData);

        if (res && res?.operation?.code === EResponseCodes.OK) {
            setMessage({
              OkTitle: "Aceptar",
              description:
                "Se ha creado la votación en el sistema exitosamente",
              title: "Crear Votación",
              show: true,
              type: EResponseCodes.OK,
              background: true,
              onOk() {
                reset();
                setMessage({});
                navigate("/core/usuarios/consultar");
              },
              onClose() {
                reset();
                setMessage({});
              },
            });
            setSending(false);
        } else {
            setMessage({
              type: EResponseCodes.FAIL,
              title: "Crear Votación",
              description: "Ocurrió un error en el sistema",
              show: true,
              OkTitle: "Aceptar",
              background: true,
            });
            setSending(false);
        } 
    };

      useEffect(() => {
        getListByParent({ grouper: "DEPARTAMENTOS", parentItemCode: "COL" })
        .then((response: ApiResponse<IGenericList[]>) => {       
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
        })
        
    }, []);


    return {
      CancelFunction,
      onSubmitCreateVoting,
      confirmVotingCreation,
      register,
      errors,
      sending,
      deparmetList,
      addItem,
      tableComponentRef,
      onSubmitSearch,
      setDataGrid,
      dataGrid,
      valCommuneNeighborhood,
      setValCommuneNeighborhood,
    };
};


