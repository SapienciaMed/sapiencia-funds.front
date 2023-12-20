import * as yup from "yup";

export const updateSocialServiceSchema = yup.object({
  state: yup.string().required("El campo es obligatorio"),
  observation: yup
    .string()
    .max(150, "Solo se permiten 150 caracterres")
    .required("El campo proyecto es obligatorio"),
});
