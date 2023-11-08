import * as yup from "yup";

export const createActaItems = (periodVigency:number) => {

  console.log(periodVigency)
  return yup.object({
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
      .string()
      .matches(/^[0-9]+$/, "Solo se permiten numeros")
      .required("Este campo es obligatorio")
      .test('no-all-zeros', 'No se permiten valores en cero', value => {
        const digitsOnly = value ? value.replace(/\./g, '') : null;
        return digitsOnly !== null && digitsOnly !== '0'.repeat(digitsOnly.length);
      }),
      quantityPeriod1: yup
      .number()
      .required("Completar información")
      .typeError("Completar información"),
    valuePeriod1: yup
      .number()
      .required("Completar información")
      .typeError("Completar información"),
    // Validación condicional basada en la variable periodVigency
    quantityPeriod2: periodVigency === 2
      ? yup.number().required("Completar información").typeError("Completar información")
      : yup.number().notRequired(),
    valuePeriod2: periodVigency === 2 
      ? yup.number().required("Completar información").typeError("Completar información")
      : yup.number().notRequired(),
    subtotalVigency: yup
      .number()
      .required()
      .typeError("Completar información"),

  });
}




