import * as yup from "yup";

export const filterUploadInformationSchema = yup.object({
    commune: yup
    .string()
    .required("Completar información"),
    validity: yup
    .string()
    .required("Completar información"),
    information: yup
    .string()
    .required("Completar información"),
  });