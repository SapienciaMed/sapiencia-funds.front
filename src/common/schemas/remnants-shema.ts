import * as yup from "yup";

export const itemsValidatePrueba = yup.object({
  averageCost: yup
    .number()
    .required("Completar información")
});

export const remnantsFilter = yup.object({
  announcement: yup
    .number()
    .required("Completar información"),
  fund: yup
    .number()
    .required("Completar información"),
  trust: yup
    .number()
    .required("Completar información")
});






