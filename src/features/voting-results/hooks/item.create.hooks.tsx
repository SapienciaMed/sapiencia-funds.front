import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createItems } from "../../../common/schemas/voting-schema";
import { IItemCreate, IItemCreateRegTable, IVotingCreate } from "../../../common/interfaces/voting.interfaces";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useVotingService } from "../../../common/hooks/voting-service.hook";
import { useGenericListService } from "../../../common/hooks/generic-list-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { IGenericList } from "../../../common/interfaces/global.interface";
import useVotingItemApi from "./voting-items-api.hooks";
import { useVotingResults } from "./voting-create.hooks";



export const useItemResults = (action, dataVoting) => {

    const [sending, setSending] = useState(false);
    const { setMessage, authorization, setDataGrid, dataGrid } = useContext(AppContext);

    const resolver = useYupValidationResolver(createItems);
    const { getListByParent } = useGenericListService();
    const [deparmetList, setDeparmentList] = useState([])
    const [typeProgram, setTypeProgram] = useState([]);
    const [programSelected, setProgramSelected] = useState();
    const [activity, setActivity] = useState([]);




    const { createVoting } = useVotingService();

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<IVotingCreate>({ resolver });


    const { 
        getActivityProgram,
        getProgramTypes
    } = useVotingItemApi();

    
    const CancelFunction = () => {
        setMessage({
            show: true,
            title: "Cancelar",
            description: "¿Estás segur@ de cancelar esta acción en el sistema?",
            OkTitle: "Aceptar",
            cancelTitle: "Cancelar",
            onOk() {
                setMessage((prev) => ({ ...prev, show: false }));
            },
            background: true,
        });
    };


    /*Functions*/
  const onSubmitCreateItem = handleSubmit((data: IItemCreateRegTable) => {
      if (data) {
                dataGrid.push({
                  porcentaje456: data.porcentaje456,
                  porcentaje123: data.porcentaje123,
                  totalCost: data.totalCost,
                  amount: data.amount,
                  activityValue: data.activityValue,
                  directObject: data.directObject,
                  productCatalog: data.productCatalog,
                  productCode: data.productCode,
                  program: data.program,
                  activity: data.activity,
                });
                setMessage({
                  OkTitle: "Aceptar",
                  description:
                    "Se ha agregado el item exitosamente",
                  title: "Agregar Item",
                  show: true,
                  type: EResponseCodes.OK,
                  background: true,
                  onOk() {
                    reset();
                    setMessage({});
                  },
                  onClose() {
                    reset();
                    setMessage({});
                  },
                });
      }
    });

    const confirmVotingCreation = async (data: IItemCreateRegTable) => {
      setSending(true);

      const user = {
        // communeNeighborhood: data.communeNeighborhood,
        // numberProject: data.numberProject,
        // validity: data.validity,
        // ideaProject: data.ideaProject,
      };

      const res = await createVoting(user);

      if (res && res?.operation?.code === EResponseCodes.OK) {
        setMessage({
          OkTitle: "Aceptar",
          description: "Se ha creado la votación en el sistema exitosamente",
          title: "Crear Votación",
          show: true,
          type: EResponseCodes.OK,
          background: true,
          onOk() {
            reset();
            setMessage({});
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
        const aux = async ()=> {
            
            //listado de departamentos
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
            
            //listado de programas
            const { data, operation } = await getProgramTypes();
            if (operation.code === EResponseCodes.OK) {
            const programList = data.map((item) => {
                return {
                name: item.name,
                value: item.id,
                };
            });
                setTypeProgram(programList);
            } else {
                setTypeProgram([]);
            }
            
        }

        aux()
        
    }, []);


    //se cargan el listado de las actividades asociadas al programa
    useEffect(() => {

        const aux = async () => {
            if (programSelected) {
                //listado de actividades
                const { data, operation } = await getActivityProgram(programSelected);
                if (operation.code === EResponseCodes.OK) {
                const programList = data.map((item) => {
                    return {
                    name: item.name,
                    value: item.id,
                    };
                });
                    setActivity(programList);
                } else {
                    setActivity([]);
                }   
           }
        }

        aux();
    },[programSelected])


    return {
      CancelFunction,
      onSubmitCreateItem,
      confirmVotingCreation,
      register,
      errors,
      sending,
      deparmetList,
      typeProgram,
      programSelected,
      setProgramSelected,
      activity,
      setActivity,
      setDataGrid,
      dataGrid,
    };
};


