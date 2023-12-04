import { useContext, useEffect, useState } from "react";
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { useGenericListService } from "../../../../common/hooks/generic-list-service.hook";
import { AppContext } from "../../../../common/contexts/app.context";
import { IItemCreateForm } from "../../../../common/interfaces/stratum123.interface";
import { IGenericList } from "../../../../common/interfaces/global.interface";
import { ApiResponse } from "../../../../common/utils/api-response";
import { createStratum123Items } from "../../../../common/schemas/item-stratus123-schema";
import useStratum123Api from "./stratum123-api.hooks";
import Item from "../../pages/item/item-stratum.page"

export const itemStratum123Hook = (action, data, collback) => {
  const { setMessage,} = useContext(AppContext);
  const { getListByGroupers } = useGenericListService();
  const resolver = useYupValidationResolver(createStratum123Items);
  const [comunaList, setComunaList] = useState([]);
  const { updateStratum123Item } = useStratum123Api();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm<IItemCreateForm>({
    resolver,
    defaultValues: {
      legalized: null,
      granted: null,
      availableResource: null
    },
  });

  const CancelFunction = () => {
    setMessage({
      show: true,
      title: "Cancelar",
      description: "¿Estás segur@ de cancelar?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        setMessage((prev) => ({ ...prev, show: false }));
      },
      onCancel() {
          setMessage({
            show: true,
            title: "Editar item",
            onOk() {
              setMessage({});
            },
            background: true,
            description: (
               <Item data={data} action={"edit"} collback={collback} />
            ),
            size: "large",
            style: "mdl-agregarItem-voting",
          });
      },
      background: true,
    });
  };

  /*Functions*/
  const onSubmitCreateItem = handleSubmit(async (dataForm: IItemCreateForm) => {

    if (dataForm) {
      dataForm.legalized = Number(dataForm.legalized);
      dataForm.granted = Number(dataForm.granted);
      dataForm.availableResource = Number(dataForm.availableResource);
      let objForm = {
      legalized : dataForm.legalized ,
      granted: dataForm.granted ,
      availableResource: dataForm.availableResource 
      }

      setMessage({
        show: true,
        title: "Guardar",
        description: "¿Estás segur@ de guardar la información?",
        OkTitle: "Aceptar",
        cancelTitle: "Cancelar",
        async onOk() {
          const res: any = await updateStratum123Item(Number(data.id), objForm);
          if (res && res?.operation?.code === EResponseCodes.OK) {
            collback();
                setMessage({
                  show: true,
                  title: "Guardar",
                  description: "¡Guardado exitosamente!",
                  OkTitle: "Aceptar",
                  onOk() {
                    setMessage((prev) => ({ ...prev, show: false }));
                  },
                  background: true,
                });
            
          }
        },
        background: true,
      });

    }
  });
    
    
  useEffect(() => {
    const aux = async() => {
      const groupers = ["COMUNA_CORREGIMIENTO"];
      let arrComunas = [];
      await getListByGroupers(groupers).then(
        async (response: ApiResponse<IGenericList[]>) => {
          if (response && response?.operation?.code === EResponseCodes.OK) {
            setComunaList(
              response.data.map(async(item) => {
                const list = {
                  name: item.itemDescription,
                  value: item.itemCode,
                };
                arrComunas.push(list)
                return list;
              })
            );
          }
        }
      );
      if (action == "edit") {
        setValue("comuna", arrComunas.find(obj=> obj.value == data.resourcePrioritization.communeId)?.name);
        setValue("availableResource", data.resourceAvailable);
        setValue("granted", data.granted);
        setValue("available", (Number(data.resourceAvailable) - Number(data.granted)));
        setValue("stake", Number(((Number(data.granted) / Number(data.resourceAvailable))* 100).toFixed(2)));
        setValue("legalized", data.legalized);
      }
    };
    aux();
  }, []);



    return {
      handleSubmit,
      onSubmitCreateItem,
      register,
      control,
      CancelFunction,
      errors,
      comunaList,
    };
};