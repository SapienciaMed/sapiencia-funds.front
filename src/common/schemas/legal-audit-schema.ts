import * as yup from "yup";

export const editLegalAuditSchema = yup.object({
  communeFundId: yup.number().required("Selecciona fondo comuna"),
  fiducia: yup.number().optional(),
  update: yup.date().optional(),
  resource: yup.number().optional(),
  order: yup.number().optional(),
});
