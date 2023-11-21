import * as yup from "yup";

export const filterDating = yup.object({
    programa: yup
    .mixed()
    .test(
      'isNumberOrArray',
      'Cargar información',
      (value) => {
        return typeof value === 'number' || Array.isArray(value);
      }
    ),

  });
