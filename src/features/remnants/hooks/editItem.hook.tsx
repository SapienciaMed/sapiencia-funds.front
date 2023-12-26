import { useForm } from "react-hook-form";
import useRemnantsApi from './remnants-api.hook';
import { useContext, useEffect, useRef, useState } from "react";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ITableAction, ITableElement } from "../../../common/interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import EditItemsPage from "../pages/editItems.page";
import { useNavigate } from "react-router-dom";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { itemsValidatePrueba } from "../../../common/schemas/remnants-shema";
import { IRemnantsItems } from "../../../common/interfaces/remnants.interface";

export interface datoss {
  averageCost: number,
  remaining: number,
  quotaResource: number,
  quotas: number,
  residual: number,
  communityFund: number
}

export default function useEditItem(item, loadTableData: (value?: object) => void) {

  //service
  const { editRemnant } = useRemnantsApi();

  //states
  const [announcementList, setAnnouncementList] = useState([]);
  const [fundList, setFundList] = useState([]);
  const [fiduciaList, setFiduciaList] = useState([]);
  const [showTable, setShowTable] = useState(false);


  //contex
  const { setMessage } = useContext(AppContext);

  //validaciones
  const resolver = useYupValidationResolver(itemsValidatePrueba);

  //form
  const {
    handleSubmit,
    register,
    control: control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<IRemnantsItems>({ resolver });


  const remaining = watch('remaining') || 0
  const averageCost = watch('averageCost')
  const quotaResource = watch('quotaResource')
  const quotass = watch('quotas')




  useEffect(() => {

    
    if (remaining && averageCost) {      
      setValue('quotas', remaining / averageCost);
    }

    if (averageCost === item.averageCost) {
      setValue("quotaResource", item.quotaResource || 0)      
    }else{
      const quotaResource = quotass * averageCost
      setValue('quotaResource', quotaResource);
    }

    if (remaining ===  item.remaining) {
      setValue("residual", item.residual)
    }else{   
      const residual = remaining - (quotass*averageCost)
      setValue('residual', residual);      
    }
  }, [remaining, averageCost, item, quotaResource,quotass]);

  /* useEffect(() => {
    let calculatedQuotas, quotaResource, residual;

    // Calcular 'Cupos' si 'remaining' y 'averageCost' están disponibles
    if (remaining && averageCost) {
      calculatedQuotas = remaining / averageCost;
      setValue('quotas', calculatedQuotas);
    } else {
      calculatedQuotas = quotas; // Usar el valor observado si no se puede calcular
    }

    // Calcular 'Recurso con Cupos'
    if (averageCost === item.averageCost) {
      quotaResource = item.quotaResource || 0;
    } else {
      quotaResource = (calculatedQuotas !== undefined ? calculatedQuotas : item.quotas) * averageCost;
    }
    setValue('quotaResource', quotaResource);

    // Calcular 'Residual'
    if (remaining === item.remaining) {
      residual = item.residual;
    } else {
      residual = remaining - quotaResource;
    }
    setValue('residual', residual);

  }, [remaining, averageCost, item, quotas, setValue]); */



  //useEffects
  useEffect(() => {
    setValue("communityFund", item.communityFund)
    setValue("remaining", item.remaining)
    setValue("averageCost", item.averageCost)
    setValue("quotaResource", item.quotaResource || 0)
    setValue("residual", item.residual)
    setValue("quotas", item.quotas)
  }, [item])

  const onSubmit = handleSubmit(async (data) => {


    setMessage({
      show: true,
      title: "Guardar información",
      description: "¿Estás segur@ de guardar la información?",
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk() {
        confirmEdit(item.id, data);
      },
      background: true,
    });


  });

  const confirmEdit = async (id, data: any) => {
    const remnant = {
      remaining: data.remaining || 0,
      averageCost: data.averageCost,
      communityFund: data.communityFund,
      quotas: data.quotas,
      quotaResource: data.quotaResource,
      residual: data.residual
    };

    const res = await editRemnant(id, remnant);

    if (res && res?.operation?.code === EResponseCodes.OK) {
      setMessage({
        OkTitle: "Cerrar",
        description: "¡guardado exitosamente!",
        title: "Guardar",
        show: true,
        type: EResponseCodes.OK,
        background: true,
        onOk() {
          reset();
          setMessage({});
          loadTableData({
            announcement: item.announcement,
            fund: item.communityFund,
            trust: item.trust
          })
          //navigate("/fondos/remanentes/consultar");
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
    setMessage((prev) => ({ ...prev, show: false }));
  };





  return {
    control,
    errors,
    register,
    announcementList,
    fundList,
    fiduciaList,
    onSubmit,
    watch,
    CancelFunction,
    showTable,
    
  }
}
