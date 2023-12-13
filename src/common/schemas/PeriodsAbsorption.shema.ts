import * as yup from "yup";

export const createPeriodsAbsorptionSchema = yup.object({
  communeFundId: yup.number().required("Selecciona fondo comuna"),
  //   resource: yup.number().required("Escribe un recurso"),
  //   sceneryPercentage1: yup.number().min(1).required("Escribe escenario"),
  //   sceneryPercentage2: yup.number().min(1).required("Escribe escenario"),
  //   sceneryPercentage3: yup.number().min(1).required("Escribe escenario"),
});

export const filtersPeriodsAbsorptionSchema = yup.object({
  announcementId: yup
    .number()
    .required("Selecciona una convocatoria para buscar"),
});
