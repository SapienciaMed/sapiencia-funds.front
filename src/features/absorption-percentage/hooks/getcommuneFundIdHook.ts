import { useEffect, useState } from "react";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiFunds } from "../../../common/utils/base-url";
import { ICallPeriodsResfilters } from "../../../common/interfaces/PeriodsAbsorption.interface";

export const useGetcommuneFundIdHook = () => {
  const { get } = useCrudService(urlApiFunds);
  const [communeFund, setCommuneFund] = useState<any>(null);

  const searchCommuneFundByValue = (communeFundId) => {
    if (!communeFund) return;
    const resourceFound = communeFund?.find((el) => el.value === communeFundId);
    return resourceFound;
  };

  const getPeriods = async () => {
    try {
      const endpoint = "/api/v1/absorption-percentage/get-commune-resources";
      const resp: ApiResponse<ICallPeriodsResfilters[]> = await get(endpoint);
      const adaptedData = resp.data.map(({ value, name }) => {
        return {
          value: value,
          name: name,
        };
      });
      setCommuneFund(adaptedData);
    } catch (err) {
      console.error(err);
      console.log("Error response:", err.response);
    }
  };
  useEffect(() => {
    getPeriods();
  }, []);

  return { communeFund, searchCommuneFundByValue };
};
