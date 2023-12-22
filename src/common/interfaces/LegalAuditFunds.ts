import { DateTime } from "luxon";

export interface IEditLegalAuditFunds {
  updatedAt: Date; // PAB_FECHA_MODIFICO
}
export interface ICallLegalResfilters {
  communeFundId: number;
  resource: string;
  order: string;
  announcementId?: number;
  fiduciaryId: string;
  fiduciaryName?: string;
}

export interface ILegalAuditFunds {
  id?: number; // PAB_CODIGO
  announcementId?: string; // PAB_CONVOCATORIA
  communeFundId?: number; // PAB_FONDO_COMUNA
  resource?: string; // PAB_RECURSO
  order?: string; // PAB_ORDEN
  updatedAt?: DateTime; // PAB_FECHA_MODIFICO
  fiduciaryName?: string;
  fiduciaryId: string;
}
