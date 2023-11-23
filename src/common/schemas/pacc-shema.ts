import * as yup from 'yup';

export const changeCuttingBeneficiary = yup.object({
    idCut: yup
    .number()
    .required("Completar información")
})