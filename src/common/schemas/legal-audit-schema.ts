import * as yup from "yup";

export const editLegalAuditSchema = yup.object({
  fiduciaryId: yup.mixed().optional(),
  resource: yup.mixed().optional(),
  order: yup.mixed().optional(),
});
