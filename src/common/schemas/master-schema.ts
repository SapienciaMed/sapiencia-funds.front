import * as yup from "yup";

export const filtermasterActivity = yup.object({
    name: yup.string().required("Seleccionar actividad es obligatorio"),
  });

export const createmasterActivity = yup.object({
    activity: yup.object({
      name: yup
        .string()
        .required("El campo es obligatorio")
        .max(10, "Solo se permiten 20 caracteres"),
      totalValue: yup.string().required("El campo es obligatorio"),
      codProgramCode: yup.string().required("El campo es obligatorio"),
      description: yup
      .string()
      .optional()
      .nullable()
      .max(500, "Solo se permiten 500 caracteres"),
    }),
  });