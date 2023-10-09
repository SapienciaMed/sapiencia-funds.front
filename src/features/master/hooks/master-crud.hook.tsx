import { useContext, useEffect, useState } from "react";
import useMasterApi from "./master-api.hook";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { useForm } from "react-hook-form";
import { IMaster } from "../../../common/interfaces/master.interface";
import { AppContext } from "../../../common/contexts/app.context";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { createMasters } from "../../../common/schemas/masters-schema";
import { useNavigate } from "react-router-dom";


export default function useMasterCrud() {

  const { setMessage, authorization } = useContext(AppContext);
  const { TypeMasterList, createMaster } = useMasterApi();
  const [typeMasterList, setTypeMasterList] = useState([]);
  const resolver = useYupValidationResolver(createMasters);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    control: control,   
    setValue,
    reset,
    formState: { errors },
  } = useForm<IMaster>({ resolver });


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
    console.log('llego', data)
    setMessage({
      show: true,
      title: "Guardar información",
      description: "¿Estás segur@ de guardar la información?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        confirmVotingCreation(data);
      },
      background: true,
    });
  });


  const confirmVotingCreation = async (data: IMaster) => {  

    const master = {
      codtlmo: data.codtlmo,
      name: data.name,
      description: data.description
    };

    const res = await createMaster(master);

    if (res && res?.operation?.code === EResponseCodes.OK) {
      setMessage({
        OkTitle: "Aceptar",
        description: "Guardado exitosamente",
        title: "Guardar información",
        show: true,
        type: EResponseCodes.OK,
        background: true,
        onOk() {
          reset();
          setMessage({});
          navigate("/fondos/maestros/consultar");
        },
        onClose() {
          reset();
          setMessage({});
        },
      });      
    } else {
      setMessage({
        type: EResponseCodes.FAIL,
        title: "Validación de datos",
        description: "¡El dato ya existe!",
        show: true,
        OkTitle: "Aceptar",
        background: true,
      });   
    }
  };

  const CancelFunction = () => {
    setMessage({
      show: true,
      title: "Cancelar",
      description: "¿Estás segur@ de cancelar esta acción en el sistema?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        navigate("/fondos/maestros/consultar");
        setMessage((prev) => ({ ...prev, show: false }));
      },
      background: true,
    });
  };
  
  return {
    typeMasterList,
    control,
    errors,
    register,
    setValue,
    onsubmitCreate,
    CancelFunction
  }
}



