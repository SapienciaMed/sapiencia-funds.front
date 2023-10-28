import * as yup from "yup";

const MESSAGE_REQUIRED = "Completar información";

export const createRegulation = yup.object({
  program: yup
    .string()
    .typeError(MESSAGE_REQUIRED)
    .required(MESSAGE_REQUIRED)
    .max(50, "Solo se permiten 50 caracteres"),
});
