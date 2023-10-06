import { useContext, useEffect, useState } from "react";
import { IGenericList } from "../../../common/interfaces/global.interface";
import { ApiResponse } from "../../../common/utils/api-response";
import useMasterApi from "./master-api.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useForm } from "react-hook-form";
import { IMaster } from "../../../common/interfaces/master.interface";
import { AppContext } from "../../../common/contexts/app.context";


export default function useMaster() {
    const { setMessage, authorization } = useContext(AppContext);

    const { TypeMasterList } = useMasterApi();
    const [typeMasterList, setTypeMasterList] = useState([]);

    const {
        handleSubmit,
        register,
        control: control,
        formState,
        watch,
        setValue,
        formState: { errors },
      } = useForm<IMaster>({       
       
      });


         useEffect(() => {
             TypeMasterList()
             .then((response) => {       
                 if (response && response?.operation?.code === EResponseCodes.OK) {
                    setTypeMasterList(
                     response.data.map((item) => {
                     const list = {
                         name: item.name,
                         value: item.id,
                     };
                     return list;
                     })
                 );
                 }
           })
         }, []); 

         const onsubmitCreate = handleSubmit((data: IMaster) => {    
            console.log('llego',data)
            setMessage({
              show: true,
              title: "Guardar información",
              description: "¿Estás segur@ de guardar la información?",
              OkTitle: "Aceptar",
              cancelTitle: "Cancelar",
              onOk() {
                //confirmVotingCreation(data);
              },
              background: true,
            }); 
        });
   

    console.log(typeMasterList)
    return {
        typeMasterList,
        control,
        errors,
        register,
        setValue,
        onsubmitCreate
    }
}



