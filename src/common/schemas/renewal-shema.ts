import * as yup from "yup";

export const renewalSchma = yup.object({
    period: yup
    .string()
    .required("selecciona la convocatoria que desea filtrar"),
  });