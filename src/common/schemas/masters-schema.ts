import * as yup from "yup";

export const filterMaster = yup.object({
    codtlmo: yup
    .string()
    .required("Cargar información"),
  });

export const createMasters = yup.object({
    name: yup
        .string()
        .required("Cargar información")
        .max(100, "Solo se permiten 100 caracteres"),
        codtlmo: yup
        .number()
        .required("Cargar información")
        .typeError("Completar información"),     
        description: yup
        .string()
        .optional()
        .nullable()
        .max(500, "Solo se permiten 500 caracteres"),
});