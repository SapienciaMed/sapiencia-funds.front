import * as yup from "yup";

function validateTotalValue(value) {
  const isNumeric = /^\d+$/.test(value);
  return isNumeric && value.length <= 10;
}

export const filtermasterActivity = yup.object({
    name: yup
    .string()
    .required("Seleccionar actividad es obligatorio"),
  });

export const createmasterActivity = yup.object({
      name: yup
        .string()
        .required("Completar información")
        .max(150, "Solo se permiten 150 caracteres"),
      totalValue: yup
        .string()
        .test("is-valid-total-value", "debe tener 10 dígitos numéricos", validateTotalValue)
        .required("Completar información")
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