import { useEffect, useState } from "react";
import useCrudService from "../../../common/hooks/crud-service.hook";
import { ApiResponse } from "../../../common/utils/api-response";
import { urlApiFunds } from "../../../common/utils/base-url";
import { ICallLegalResfilters } from "../../../common/interfaces/LegalAuditFunds";

export const useGetCommuneFundByIdLegalHook = () => {
  const { get } = useCrudService(urlApiFunds);
  const [legalAuditData, setLegalAuditData] = useState<any>(null);

  const getLegalAuditByAnnouncement = async (announcementId) => {
    try {
      const endpoint = `/api/v1/legalized/get-all?announcementId=${announcementId}`;
      const resp: ApiResponse<ICallLegalResfilters[]> = await get(endpoint);
      const adaptedData = resp.data;
      setLegalAuditData(adaptedData);
    } catch (err) {
      console.error(err);
      console.log("Error response:", err.response);
    }
  };

  return { legalAuditData, getLegalAuditByAnnouncement };
};
