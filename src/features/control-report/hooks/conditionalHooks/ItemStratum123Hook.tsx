import { useContext, useEffect, useState } from "react";
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { useForm } from "react-hook-form";
import useYupValidationResolver from "../../../../common/hooks/form-validator.hook";
import { useGenericListService } from "../../../../common/hooks/generic-list-service.hook";
import { AppContext } from "../../../../common/contexts/app.context";
import { createItems } from "../../../../common/schemas/voting-schema";
import { IItemCreateForm } from "../../../../common/interfaces/stratum123.interface";
import { IGenericList } from "../../../../common/interfaces/global.interface";
import { ApiResponse } from "../../../../common/utils/api-response";


export const itemStratum123Hook = (action, dataVoting, collback) => {
    
  const [sending, setSending] = useState(false);
  const { setMessage,} = useContext(AppContext);
   const { getListByGroupers } = useGenericListService();

  const resolver = useYupValidationResolver(createItems);
  const { getListByParent } = useGenericListService();
  const [comunaList, setComunaList] = useState([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    control,
    watch,
    
  } = useForm<IItemCreateForm>({
    resolver,
  });

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
    const onSubmitCreateItem = handleSubmit(async (data: IItemCreateForm) => { });
    
    
  useEffect(() => {
    const aux = () => {
      const groupers = ["COMUNA_CORREGIMIENTO"];
      getListByGroupers(groupers).then(
        (response: ApiResponse<IGenericList[]>) => {
          if (response && response?.operation?.code === EResponseCodes.OK) {
            setComunaList(
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