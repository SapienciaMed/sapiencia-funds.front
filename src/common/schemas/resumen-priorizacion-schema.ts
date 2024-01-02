import * as yup from "yup";

export const searchResumenPriorizacion = yup.object({
  communeNeighborhood: yup
    .array()
    .of(yup.number().min(1))
    .required("El nombre de la comuna es obligatorio"),
  numberProject: yup
    .number()
    .required("El campo proyecto es obligatorio")
    .typeError("El campo proyecto es obligatorio"),
  validity: yup.string().required("La vigencia es obligatoria"),
});
