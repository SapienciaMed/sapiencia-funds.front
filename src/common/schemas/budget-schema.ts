import * as yup from "yup";

export const filterBudget = yup.object({
  id_comuna: yup
    .mixed()
    .test(
      'isNumberOrArray',
      'Cargar información',
      (value) => {
        return typeof value === 'number' || Array.isArray(value);
      }
    ),
  periodo: yup
    .number()
    .required("Cargar información"),
});