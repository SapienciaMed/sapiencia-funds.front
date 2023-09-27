
import * as yup from "yup";

export const createVotings = yup.object({
  names: yup.string().required("El nombre de usuario es obligatorio"),
  lastNames: yup.string().required("El apellido del usuario es obligatorio"),
  typeDocument: yup.string().required("El tipo de documento es obligatorio"),
  numberDocument: yup
    .string()
    .matches(/^[0-9]+$/, "Solo se permiten números")
    .required("El número de documento es obligatorio"),
  email: yup
    .string()
    .email("Correo no valido")
    .required("El correo es obligatorio"),

  gender: yup.string().required("El género es obligatorio"),
  deparmentCode: yup.string().required("El departamento es obligatorio"),
  townCode: yup.string().required("El municipio es obligatorio"),
  address: yup.string().required("La dirección es obligatoria"),
  neighborhood: yup.string().required("El barrio es obligatorio"),
});
