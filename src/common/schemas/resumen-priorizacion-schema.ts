import * as yup from "yup";


export const searchResumenPriorizacion = yup.object({
  communeNeighborhood: yup.string().required("El nombre de la comuna es obligatorio"),
  numberProject: yup .string()
    .required("El campo proyecto es obligatorio")
    .test('len', 'Solo se permiten 30 caracteres', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
  validity: yup.string().required("La vigencia es obligatoria"),
});