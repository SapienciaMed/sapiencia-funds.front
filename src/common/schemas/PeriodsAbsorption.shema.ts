import * as yup from "yup";

export const createPeriodsAbsorptionSchema = yup.object({
  communeFundId: yup.number().required("Selecciona fondo comuna"),
  resource: yup.string().required("Escribe un recurso"),
  sceneryPercentage1: yup
    .string()
    .trim()
    .matches(/^\d{1,3}%$/, "Debe ser un procentaje")
    .required("Completar información"),
  sceneryPercentage2: yup
    .string()
    .trim()
    .matches(/^\d{1,3}%$/, "Debe ser un procentaje")
    .required(),
  sceneryPercentage3: yup
    .string()
    .trim()
    .matches(/^\d{1,3}%$/, "Debe ser un procentaje")
    .required("Completar información"),
});

export const filtersPeriodsAbsorptionSchema = yup.object({
  announcementId: yup
    .number()
    .required("Selecciona una convocatoria para buscar"),
});
