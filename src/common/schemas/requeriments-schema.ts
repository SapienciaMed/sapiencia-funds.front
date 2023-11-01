import * as yup from "yup";

const MESSAGE_REQUIRED = "Completar información";

export const createRequeriment = yup.object().shape({
  status: yup.boolean().optional().nullable(),
  percent: yup.number().min(0).max(100).typeError(MESSAGE_REQUIRED).required(),
  description: yup
    .string()
    .optional()
    .max(200, "Solo se permiten 200 caracteres"),
});
