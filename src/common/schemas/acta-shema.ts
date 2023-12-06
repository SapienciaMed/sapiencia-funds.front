import * as yup from "yup";

export const createActas = yup.object({
numberProject: yup
    .number()
    .required("Completar información"),
  periodVigency: yup
    .number()
    .required("Completar información"),   
  announcementInitial: yup
    .string()   
    .required("Completar información"),
  costsExpenses: yup
    .number()
    .required()
    .typeError("Completar información"),
  OperatorCommission: yup
    .number()
    .required()
    .typeError("Completar información"),
  financialOperation: yup
    .number()
    .required()
    .typeError("Completar información"), 

});

export const searchActas = yup.object({
  actaNro: yup
    .string()
    .required("Cargar información"),
})

export const editActas = yup.object({
  // projectNumber: yup
  //   .number()
  //   .required("Completar información"),
  // periodVigency: yup
  //   .number()
  //   .required("Completar información"),
  // initialCall: yup
  //   .string()
  //   .required("Completar información"),
  // costAndLogistics: yup
  //   .string()
  //   .required("Completar información"),
  // financialOperator: yup
  //   .number()
  //   .required("Completar información"),
  // financialTransactionMB: yup
  //   .number()
  //   .required("Completar información"),
  // dateCitation: yup
  //   .date()
  //   .required("Completar información")
  //   .typeError("Fecha invalida"),
  // timeCitation: yup
  //   .string()
  //   .required("Completar información"),
  // user: yup
  //   .string()
  //   .required("Completar información"),
  costsExpenses: yup
    .number()
    .required("Completar información"),
  OperatorCommission: yup
    .number()
    .required("Completar información"),
  financialOperation: yup
    .number()
    .required("Completar información"),
});

export const manageTransfer = yup.object({
  state: yup
    .string()
    .required("Completar información"),
  workedHours: yup
    .string()
    .required("Completar información"),
})





