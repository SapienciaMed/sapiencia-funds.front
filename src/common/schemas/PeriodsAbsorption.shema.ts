import * as yup from "yup";

export const createPeriodsAbsorptionSchema = yup.object({
  communeFundId: yup.number().required("Selecciona fondo comuna"),
  resource: yup.string().required("Escribe un recurso"),
  sceneryPercentage1: yup
    .number()
    .min(0, "El porcentaje debe ser superior a 0")
    .max(100, "El porcentaje no debe ser mayor a 100")
    .required("Completar información"),
  sceneryPercentage2: yup
    .number()
    .min(0, "El porcentaje debe ser superior a 0")
    .max(100, "El porcentaje no debe ser mayor a 100")
    .required("Completar información"),
  sceneryPercentage3: yup
    .number()
    .min(0, "El porcentaje debe ser superior a 0")
    .max(100, "El porcentaje no debe ser mayor a 100")
    .required("Completar información"),
});

export const filtersPeriodsAbsorptionSchema = yup.object({
  announcementId: yup
    .number()
    .required("Selecciona una convocatoria para buscar"),
});
