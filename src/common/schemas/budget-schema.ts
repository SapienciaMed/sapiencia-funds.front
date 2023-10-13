import * as yup from "yup";

export const filterBudget = yup.object({
    fundCocommune: yup
    .number()
    .required("Cargar información"),
    convocation: yup
    .number()
    .required("Cargar información"),

  });
