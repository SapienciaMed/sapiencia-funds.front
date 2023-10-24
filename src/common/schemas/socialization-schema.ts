import * as yup from "yup";

const MESSAGE_REQUIRED = "Completar información";

export const createSocialization = yup.object({
  noProyect: yup
    .number()
    .typeError(MESSAGE_REQUIRED)
    .required(MESSAGE_REQUIRED),
  communeCode: yup
    .string()
    .required(MESSAGE_REQUIRED)
    .typeError(MESSAGE_REQUIRED)
    .max(50, "Solo se permiten 10 caracteres"),
  socializationDate: yup
    .string()
    .required(MESSAGE_REQUIRED)
    .typeError(MESSAGE_REQUIRED),
  validity: yup.number().typeError(MESSAGE_REQUIRED).required(MESSAGE_REQUIRED),
  valueGroup: yup
    .string()
    .typeError(MESSAGE_REQUIRED)
    .required(MESSAGE_REQUIRED)
    .max(50, "Solo se permiten 5 caracteres"),
  financialPerformance: yup
    .number()
    .typeError(MESSAGE_REQUIRED)
    .required(MESSAGE_REQUIRED),
  portfolioCollections: yup
    .number()
    .typeError(MESSAGE_REQUIRED)
    .required(MESSAGE_REQUIRED),
  description: yup
    .string()
    .optional()
    .nullable()
    .max(500, "Solo se permiten 500 caracteres"),
});

export const searchSocialization = yup.object({
  numberProyect: yup
    .number()
    .typeError(MESSAGE_REQUIRED)
    .required(MESSAGE_REQUIRED),
  communeCode: yup
    .string()
    .required(MESSAGE_REQUIRED)
    .typeError(MESSAGE_REQUIRED)
    .max(50, "Solo se permiten 10 caracteres"),
  validity: yup.number().typeError(MESSAGE_REQUIRED).required(MESSAGE_REQUIRED),
});
