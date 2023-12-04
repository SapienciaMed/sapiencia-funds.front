import * as yup from "yup";


export const createStratum123Items = yup.object({
    legalized: yup.string().required("Este campo es obligatorio").max(11,'Máximo 11 caracteres'),
    granted: yup.string().required("Este campo es obligatorio"),
    availableResource: yup.string().required("Este campo es obligatorio"),
});