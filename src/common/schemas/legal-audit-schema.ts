import * as yup from "yup";

export const editLegalAuditSchema = yup.object({
  //communeFundId: yup.number().required("Selecciona fondo comuna"),
  resource: yup.number().optional(),
});
