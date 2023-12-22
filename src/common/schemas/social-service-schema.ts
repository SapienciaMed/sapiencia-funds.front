import * as yup from "yup";

export const updateSocialServiceSchema = yup.object({
  editable: yup.boolean(),
  state: yup.string().when("editable", (value, schema) => {
    if (!value[0]) {
      return schema.nullable().notRequired();
    }

    return schema.required("El campo es obligatorio");
  }),
  observation: yup
    .string()
    .nullable()
    .max(150, "Solo se permiten 150 caracterres"),
});
