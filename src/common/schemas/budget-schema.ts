import * as yup from "yup";

export const filterBudget = yup.object({
    // id_comuna: yup
    // .number()
    // .required("Cargar información"),
    periodo: yup
    .number()
    .required("Cargar información"),

  });
