import * as yup from "yup";

const MESSAGE_REQUIRED = "Completar información";

export const cutSchema = yup.object().shape({
  name: yup
    .string()
    .typeError(MESSAGE_REQUIRED)
    .required(MESSAGE_REQUIRED)
    .max(50, "Solo se permiten 50 caracteres"),
  from: yup.string().typeError(MESSAGE_REQUIRED).required(MESSAGE_REQUIRED),
  until: yup.string().typeError(MESSAGE_REQUIRED).required(MESSAGE_REQUIRED),
});

export const searchCutSchema = yup.object({
  name: yup.string().optional(),
  from: yup.string().optional(),
  until: yup.string().optional(),
});
