import * as yup from "yup";

const MESSAGE_REQUIRED = "Completar información";
const lessThan = (number: number) =>
  `El número debe de ser menor o igual a ${number}`;
const greaterThan = (number: number) =>
  `El número debe de ser mayor o igual a ${number}`;

export const createRequeriment = yup.object().shape({
  status: yup.boolean().optional().nullable(),
  mandatoryFor: yup
    .string()
    .required(MESSAGE_REQUIRED),
  description: yup
    .string()
    .required()
    .typeError(MESSAGE_REQUIRED)
    .required(MESSAGE_REQUIRED)
    .max(200, "Solo se permiten 200 caracteres"),
});
