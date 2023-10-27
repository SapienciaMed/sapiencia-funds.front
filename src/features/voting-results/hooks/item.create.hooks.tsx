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
// import { useVotingResultsSearch } from "./voting-search.hooks";



export const useItemResults = (action, dataVoting) => {

  const [sending, setSending] = useState(false);
  const { setMessage, authorization, setDataGrid, dataGrid } = useContext(AppContext);

  const resolver = useYupValidationResolver(createItems);
  const { getListByParent } = useGenericListService();
  const [deparmetList, setDeparmentList] = useState([])
  const [typeProgram, setTypeProgram] = useState([]);
  const [programSelected, setProgramSelected] = useState(0);
  const [activitySelected, setActivitySelected] = useState(0);
  const [activity, setActivity] = useState([]);
  const [idItemEdit, setIdItemEdit] = useState(0);
  const { createVoting } = useVotingService();
  const { updateItemsVotingResults } = useVotingItemApi();
  const [idVoting, setIdVoting] = useState('');
  const [disabledCantidad, setDisabledCantidad] = useState(true)
  const [valueActivity, setValueActivity] = useState(0);

  // const { onSubmitSearch } = useVotingResultsSearch();
  
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    control,
    watch
  } = useForm<IItemCreateForm>({
    resolver,
    defaultValues: {
      porcentaje456: action == "edit" ? dataVoting.porcentaje456 : null,
      porcentaje123: action == "edit" ? dataVoting.porcentaje123 : null,
      totalCost: action == "edit" ? dataVoting.totalCost : null,
      amount: action == "edit" ? dataVoting.amount : null,
      activityValue: action == "edit" ? dataVoting.activityValue : null,
      productCode: action == "edit" ? dataVoting.productCode : null,
      productCatalog: action == "edit" ? dataVoting.productCatalog : null,
      directObject: action == "edit" ? dataVoting.directObject : null,
    },
  });

  const selectedProgram = watch("program");
  const selectedActivity = watch("activity");
  const ingresAmount = watch("amount");


  
  useEffect(() => {
    setProgramSelected(Number(selectedProgram));
    setActivitySelected(Number(selectedActivity));
  }, [selectedProgram, selectedActivity])

  useEffect(() => {
    if (ingresAmount != null && ingresAmount != undefined) {
      changeAmountSum(ingresAmount);
    }
  }, [ingresAmount]);
  
// useEffect(() => {
//   const subscription = watch((value: IItemCreateForm) => {
//     console.log(value);
//     // console.log(type);
//     if (value.amount != null) {
//       changeAmountSum({ target: { value: value.amount } });
//     }
//   });
//   return () => subscription.unsubscribe();
// }, [watch]);

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

  const changeAmountSum = (e) => {
    if (e) {
      if (Number(e)) {
        const suma = (Number(e) * Number(valueActivity));
        setValue("totalCost", suma);
      }
    } else {
      
    }
  };
    /*Functions*/
  const onSubmitCreateItem = handleSubmit( async(data: IItemCreateRegTable)  => {
    
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
            program: typeProgram.find(obj => obj.value == data.program).name ? typeProgram.find(obj => obj.value == data.program).name : '' ,
            activity: activity.find( obj => obj.value == data.activity).name ? activity.find( obj => obj.value == data.activity).name : '',
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

        setMessage({
          OkTitle: "Aceptar",
          cancelTitle: "Cancelar",
          description: "Estás segur@ de editar este registro?",
          title: "Editar registro",
          show: true,
          type: EResponseCodes.OK,
          background: true,
          async onOk() {
            (dataGrid.find((obj) => obj.ident == idItemEdit).porcentaje456 =
              data.porcentaje456),
              (dataGrid.find((obj) => obj.ident == idItemEdit).porcentaje123 =
                data.porcentaje123),
              (dataGrid.find((obj) => obj.ident == idItemEdit).totalCost =
                data.totalCost),
              (dataGrid.find((obj) => obj.ident == idItemEdit).amount =
                data.amount),
              (dataGrid.find((obj) => obj.ident == idItemEdit).activityValue =
                data.activityValue),
              (dataGrid.find((obj) => obj.ident == idItemEdit).directObject =
                data.directObject),
              (dataGrid.find((obj) => obj.ident == idItemEdit).productCatalog =
                data.productCatalog),
              (dataGrid.find((obj) => obj.ident == idItemEdit).productCode =
                data.productCode),
              (dataGrid.find((obj) => obj.ident == idItemEdit).program =
                typeProgram.find((obj) => obj.value == data.program).name
                  ? typeProgram.find((obj) => obj.value == data.program).name
                  : ""),
              (dataGrid.find((obj) => obj.ident == idItemEdit).activity =
                activity.find((obj) => obj.value == data.activity).name
                  ? activity.find((obj) => obj.value == data.activity).name
                  : "");
            setMessage({
              OkTitle: "Aceptar",
              description: "Se ha editado el item exitosamente",
              title: "Editar registro",
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
          },
          onClose() {
            reset();
            setMessage({});
          },
        });
      }
    }
    if (action == "editVoting") {
        await setMessage({
          OkTitle: "Aceptar",
          cancelTitle: "Cancelar",
          description: "Estás segur@ de editar este registro?",
          title: "Editar registro",
          show: true,
          type: EResponseCodes.OK,
          background: true,
          async onOk() {
            const votingItesData = {
              aimStraight: String(data.directObject),
              productCatalogueDnp: Number(data.productCatalog),
              codProductgueDnp: Number(data.productCode),
              codPmaProgram: Number(programSelected),
              codMtaTeacherActivity: Number(activitySelected),
              amount: String(data.amount),
              costTotal: String(data.totalCost),
              percentage123: String(data.porcentaje123),
              percentage456: String(data.porcentaje456),
              codRtVotingResult: String(dataVoting.codRtVotingResult),
            };

            const res = await updateItemsVotingResults(
              idItemEdit,
              votingItesData
            );

            if (res && res?.operation?.code === EResponseCodes.OK) {
              setMessage({
                OkTitle: "Aceptar",
                description: "Registro actualizado correctamente",
                title: "Editar registro",
                show: true,
                type: EResponseCodes.OK,
                background: true,
                onOk() {
                  setMessage({});
                },
                onClose() {
                  //reset();
                  setMessage({});
                },
              });
            } else {
              setMessage({
                type: EResponseCodes.FAIL,
                title: "Editar registro",
                description: "Ocurrió un error en el sistema",
                show: true,
                OkTitle: "Aceptar",
                background: true,
              });
            }
          },
          onClose() {
            reset();
            setMessage({});
          },
        });
    }
    });


  useEffect(() => {
    if (activitySelected && activity.length> 1) {
      setValue(
        "activityValue",
        activity.find((obj) => obj.value == activitySelected).total
      );
      setDisabledCantidad(false);
      setValueActivity(
        activity.find((obj) => obj.value == activitySelected).total
      );
        setValue(
          "amount", null
        );
        setValue("totalCost", null);
      
    }
  }, [activitySelected]);

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
      
      if (action == 'editVoting') {
          setValue(
            "porcentaje456", action == "edit" ? dataVoting.porcentaje456 : action == "editVoting" ? dataVoting.percentage456 : null
          );
          setValue(
            "program", action == "edit" ? dataVoting.idProgram : action == "editVoting" ? Number(dataVoting.activiti.typesProgram.id) : null
          );
          setProgramSelected(Number(dataVoting.activiti.typesProgram.id));
          setActivitySelected(Number(dataVoting.activiti.id));
          setValue(
            "activity", action == "edit" ? dataVoting.idActivity : action == "editVoting" ? Number(dataVoting.activiti.id) : null
          );
          setValue(
            "porcentaje123", action == "edit" ? dataVoting.porcentaje123 : action == "editVoting" ? Number(dataVoting.percentage123) : null
          );
          setValue(
            "totalCost", action == "edit" ? dataVoting.totalCost : action == "editVoting" ? Number(dataVoting.costTotal) : null
          );
          setValue(
            "amount", action == "edit" ? dataVoting.amount : action == "editVoting" ? Number(dataVoting.amount) : null
          );
          setValue(
            "activityValue", action == "edit" ? dataVoting.activityValue : action == "editVoting" ? Number(dataVoting.activiti.totalValue) : null
          );
          setValue(
            "productCode", action == "edit" ? dataVoting.productCode : action == "editVoting" ? Number(dataVoting.codProductgueDnp) : null
          );
          setValue(
            "productCatalog", action == "edit" ? dataVoting.productCatalog : action == "editVoting" ? Number(dataVoting.productCatalogueDnp) : null
          );
          setValue(
            "directObject", action == "edit" ? dataVoting.directObject : action == "editVoting" ? Number(dataVoting.aimStraight) : null
        );
        setIdItemEdit(dataVoting.id);
        setIdVoting(dataVoting.codRtVotingResult);
      }
      
      if (action == 'new') {
        setValue("porcentaje456", null);
        setValue("program", '');
        setValue("activity", '');
        setValue("porcentaje123", null);
        setValue("totalCost", null);
        setValue("amount", null);
        setValue("activityValue", null);
        setValue("productCode", null);
        setValue("productCatalog", null);
        setValue("directObject", null);
        reset();
      }
      if (action == 'edit') {
         setValue(
            "program", dataVoting.idProgram 
          );
          setProgramSelected(Number(dataVoting.idProgram));
          setActivitySelected(Number(dataVoting.idActivity));
          setValue("activity", dataVoting.idActivity);
      }
    };
    aux();
  }, []);


    //se cargan el listado de las actividades asociadas al programa
    useEffect(() => {

        const aux = async () => {
            if (programSelected) {
                //listado de actividades
                const { data, operation } = await getActivityProgram(programSelected);
                if (operation.code === EResponseCodes.OK) {
                const activityList = data.map((item) => {
                    return {
                      name: item.name,
                      value: item.id,
                      total: item.totalValue,
                    };
                });
                  setActivity(activityList);
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
      control,
      disabledCantidad,
      setDisabledCantidad,
      changeAmountSum,
    };
};


