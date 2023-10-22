import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../common/contexts/app.context";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createItems } from "../../../common/schemas/voting-schema";
import { IItemCreate, IItemCreateRegTable, IItemCreateForm } from "../../../common/interfaces/voting.interfaces";
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
    const [activitySelected, setActivitySelected] = useState();
    const [activity, setActivity] = useState([]);
    const [idItemEdit, setIdItemEdit] = useState(0);
  




  const { createVoting } = useVotingService();
  
  
    useEffect(() => {
      const aux = async () => {
        //listado de departamentos
        getListByParent({
          grouper: "DEPARTAMENTOS",
          parentItemCode: "COL",
        }).then((response: ApiResponse<IGenericList[]>) => {
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
        });

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

        setIdItemEdit(action == "edit" ? dataVoting.ident : 0);
      };

      aux();
    }, []);

    const {
      handleSubmit,
      register,
      formState: { errors },
      reset,
    } = useForm<IItemCreateForm>({
      resolver,
      defaultValues: {
        porcentaje456: action == "edit" ? dataVoting.porcentaje456 : null,
        porcentaje123: action == "edit" ? dataVoting.porcentaje123 : null,
        totalCost: action == "edit" ? dataVoting.totalCost : null,
        amount: action == "edit" ? dataVoting.amount : null,
        activityValue: action == "edit" ? dataVoting.activityValue : null,
        activity: action == "edit" ? dataVoting.idActivity : null,
        program: action == "edit" ? dataVoting.idProgram : null,
        productCode: action == "edit" ? dataVoting.productCode : null,
        productCatalog: action == "edit" ? dataVoting.productCatalog : null,
        directObject: action == "edit" ? dataVoting.directObject : null,
      },
    });

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
    
      if (action == 'new') {
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
            ident: Math.random(),
            idActivity: activitySelected,
            idProgram:  programSelected
          });
          setMessage({
            OkTitle: "Aceptar",
            description: "Se ha agregado el item exitosamente",
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
    }
    if (action == "edit") {
      
      if (dataGrid.find((obj) => obj.ident == idItemEdit)) {
        (dataGrid.find((obj) => obj.ident == idItemEdit).porcentaje456 =
          data.porcentaje456),
          (dataGrid.find(
            (obj) => obj.ident == idItemEdit
          ).porcentaje123 = data.porcentaje123),
          (dataGrid.find((obj) => obj.ident == idItemEdit).totalCost =
            data.totalCost),
          (dataGrid.find((obj) => obj.ident == idItemEdit).amount =
            data.amount),
          (dataGrid.find(
            (obj) => obj.ident == idItemEdit
          ).activityValue = data.activityValue),
          (dataGrid.find(
            (obj) => obj.ident == idItemEdit
          ).directObject = data.directObject),
          (dataGrid.find(
            (obj) => obj.ident == idItemEdit
          ).productCatalog = data.productCatalog),
          (dataGrid.find((obj) => obj.ident == idItemEdit).productCode =
            data.productCode),
          (dataGrid.find((obj) => obj.ident == idItemEdit).program =
            data.program),
          (dataGrid.find((obj) => obj.ident == idItemEdit).activity =
            data.activity);
                  setMessage({
                    OkTitle: "Aceptar",
                    description: "Se ha editado el item exitosamente",
                    title: "Editar Item",
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
      idItemEdit,
      setIdItemEdit,
      activitySelected,
      setActivitySelected,
    };
};


