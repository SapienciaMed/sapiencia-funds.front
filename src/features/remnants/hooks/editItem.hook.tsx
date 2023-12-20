import { useForm } from "react-hook-form";
import useRemnantsApi from './remnants-api.hook';
import { useContext, useEffect, useRef, useState } from "react";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { ITableAction, ITableElement } from "../../../common/interfaces";
import { AppContext } from "../../../common/contexts/app.context";
import EditItemsPage from "../pages/editItems.page";
import { useNavigate } from "react-router-dom";

export default function useEditItem(item, loadTableData: (value?: object) => void) {

  console.log('item', item)

  //service
  const { editRemnant } = useRemnantsApi();

  //states
  const [announcementList, setAnnouncementList] = useState([]);
  const [fundList, setFundList] = useState([]);
  const [fiduciaList, setFiduciaList] = useState([]);
  const [showTable, setShowTable] = useState(false);




  const { setMessage } = useContext(AppContext);

  //form
  const {
    handleSubmit,
    register,
    control: control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<any>({});


  const remaining = watch('remaining') || 0
  const averageCost = watch('averageCost')
  const quotaResource = watch('quotaResource')

  console.log(quotaResource)

  useEffect(() => {
    if (remaining && averageCost) {
      const quotas = remaining / averageCost;
      setValue('quotas', quotas);
    }

    if (averageCost) {
      const quotaResource = item.quotas * averageCost
      setValue('quotaResource', quotaResource);
    }

    if (quotaResource) {
      const residual = quotaResource - remaining
      setValue('residual', residual);
    }
  }, [remaining, averageCost, setValue, item, quotaResource]);



  //useEffects
  useEffect(() => {
    setValue("communityFund", item.communityFund)
    setValue("remaining", item.remaining)
    setValue("averageCost", item.averageCost)
    setValue("quotaResource", item.quotaResource)
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
      averageCost: data.averageCost
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

    showTable
  }
}
