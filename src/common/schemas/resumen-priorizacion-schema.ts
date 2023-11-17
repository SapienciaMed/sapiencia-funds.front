import * as yup from "yup";


export const searchResumenPriorizacion = yup.object({
  communeNeighborhood: yup.string().required("El nombre de la comuna es obligatorio"),
  numberProject: yup.number()
    .required("El campo proyecto es obligatorio"),
  validity: yup.string().required("La vigencia es obligatoria"),
});