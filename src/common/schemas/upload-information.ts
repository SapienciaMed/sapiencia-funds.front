import * as yup from "yup";

export const filterUploadInformationSchema = yup.object({
    commune: yup
    .number()
    .required("Completar información"),
    validity: yup
    .number()
    .required("Completar información"),
    information: yup
    .number()
    .required("Completar información"),
  });