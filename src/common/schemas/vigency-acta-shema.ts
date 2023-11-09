import * as yup from "yup";

export const vigencyActas = yup.object({
   program: yup
    .number()
    .required("Completar información"),
    found: yup
    .number()
    .required("Completar información"),
    line: yup
    .number()
    .required("Completar información"),
    announcement: yup
    .number()
    .required("Completar información"),
    concept: yup
    .number()
    .required("Completar información"),
    costOperation: yup
    .number()
    .required()
    .typeError("Completar información"),
    quantityPeriod1: yup
    .number()
    .required()
    .typeError("Completar información"),
    valuePeriod1: yup
    .number()
    .required()
    .typeError("Completar información"),
   quantityPeriod2: yup
    .number()
    .required()
    .typeError("Completar información"),
    valuePeriod2: yup
    .number()
    .required()
    .typeError("Completar información"),
    subtotalVigency: yup
    .number()    
    .required("Completar información"), 

});





