import * as yup from "yup";

export const filtermasterActivity = yup.object({
    name: yup
    .string()
    .required("Seleccionar actividad es obligatorio"),
  });

  export const createmasterActivity = yup.object({
    name: yup
      .string()
      .required("Completar información")
      .max(20, "Solo se permiten 20 caracteres"),
    totalValue: yup
      .number()
      .required("Completar información")
      .integer()
      .max(13, "Solo se permiten 13 caracteres")
      .typeError("Completar información"),
    codProgramCode: yup
    .number()
    .required("Completar información"),
    description: yup
      .string()
      .optional()
      .nullable()
      .max(500, "Solo se permiten 500 caracteres"),
});