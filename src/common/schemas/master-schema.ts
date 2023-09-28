import * as yup from "yup";

export const filtermasterActivity = yup.object({
    name: yup.number().required("Seleccionar actividad es obligatorio"),
  });

export const createmasterActivity = yup.object({
      name: yup
        .string()
        .required("El campo es obligatorio")
        .typeError("El campo debe ser obligatorio")
        .max(10, "Solo se permiten 20 caracteres"),
      totalValue: yup
      .number()
      .typeError("El campo debe ser obligatorio")
      .required("El campo es obligatorio"),
      codProgramCode: yup
      .number()
      .typeError("El campo debe ser obligatorio")
      .required("El campo es obligatorio"),
      description: yup
      .string()
      .optional()
      .nullable()
      .max(500, "Solo se permiten 500 caracteres"),
});
