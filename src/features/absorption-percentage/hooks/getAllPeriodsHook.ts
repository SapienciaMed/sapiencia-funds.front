import { useEffect, useState } from "react";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiFunds } from "../../../common/utils/base-url";
import { ICallPeriodsRes } from "../../../common/interfaces/PeriodsAbsorption.interface";

export const useGetAllPeriodsHook = () => {
  const { get } = useCrudService(urlApiFunds);
  const [periods, setPeriods] = useState<any>(null);

  const getPeriods = async () => {
    try {
      const endpoint = "/api/v1/sapiencia/call-periods/get-all";
      const resp: ApiResponse<ICallPeriodsRes[]> = await get(endpoint);
      const adaptedData = resp.data.map(({ id, name }) => {
        return {
          value: id,
          name: name,
        };
      });
      setPeriods(adaptedData);
    } catch (err) {
      console.error(err);
      console.log("Error response:", err.response);
    }
  };
  useEffect(() => {
    getPeriods();
  }, []);

  return { periods };
};
