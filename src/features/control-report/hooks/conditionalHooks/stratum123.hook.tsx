import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../../common/contexts/app.context";
import useStratum123Api from "../../pages/conditionalPages/stratum123-api.hooks";
import { EResponseCodes } from "../../../../common/constants/api.enum";
import { useGenericListService } from "../../../../common/hooks/generic-list-service.hook";
import { IGenericList } from "../../../../common/interfaces/global.interface";
import { ApiResponse } from "../../../../common/utils/api-response";
import { formaterNumberToCurrency } from "../../../../common/utils/helpers";


export const stratum123Hook = (data, objSet) => {
  const tableComponentRef = useRef(null);
  const { setMessage } = useContext(AppContext);
  const { getListByGroupers } = useGenericListService();
  const [comunaList, setComunaList] = useState([]);

  const {
    setTotalNoLegalizados,
    setTotalPorParticipacion,
    setTotalDisponible,
    setTotalRecursoDisponible,
    setTotalOtorgado,
    dataGridStratum,
    setDataGridStratum
  } = objSet;

  const { getEstratum123 } = useStratum123Api();

  useEffect(() => {
    const aux = async () => {
      if (data) {
        const res: any = await getEstratum123(data);
        if (res && res?.operation?.code === EResponseCodes.OK) {
          setDataGridStratum(res.data.array);
          const recursosdisponibles = res.data.array.reduce((sum, i) => sum + Number(i.resourceAvailable), 0);
          const legalizados = res.data.array.reduce((sum, i) => sum + Number(i.legalized), 0 );
          const disponibles = res.data.array.reduce((sum, i) => sum + Number(i.granted - i.resourceAvailable), 0 );
          const participacion = res.data.array.reduce((sum, i) => sum + ((Number(i.granted) / Number(i.resourceAvailable))* 100), 0 );
          const otorgado = res.data.array.reduce((sum, i) => sum + Number(i.granted), 0 );
          setTotalNoLegalizados(legalizados);
          setTotalPorParticipacion(participacion.toFixed(2));
          setTotalDisponible(disponibles);
          setTotalRecursoDisponible(recursosdisponibles);
          setTotalOtorgado(otorgado);
        }
      }
    };
    aux();
  }, [data]);

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
    // dataGridConsolidate,
    // setGridConsolidate,
    tableComponentRef,
    comunaList,
  };
};
