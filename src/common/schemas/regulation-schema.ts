import * as yup from "yup";

const MESSAGE_REQUIRED = "Completar información";
const lessThan = (number: number) =>
  `El número debe de ser menor o igual a ${number}`;
const greaterThan = (number: number) =>
  `El número debe de ser mayor o igual a ${number}`;

export const shemaFormRegulation = yup.object().shape({
  program: yup
    .string()
    .typeError(MESSAGE_REQUIRED)
    .required(MESSAGE_REQUIRED)
    .max(50, "Solo se permiten 50 caracteres"),
  initialPeriod: yup
    .string()
    .typeError(MESSAGE_REQUIRED)
    .required(MESSAGE_REQUIRED)
    .max(50, "Solo se permiten 50 caracteres"),
  isOpenPeriod: yup.boolean().optional().nullable(),
  endPeriod: yup
    .string()
    .typeError(MESSAGE_REQUIRED)
    .when("isOpenPeriod", (isOpenPeriod, schema) => {
      if (!isOpenPeriod[0]) return schema.required(MESSAGE_REQUIRED);
      return schema;
    }),
  // theoreticalPercentage: yup
  //   .number()
  //   .typeError(MESSAGE_REQUIRED)
  //   .required(MESSAGE_REQUIRED)
  //   .min(1, greaterThan(1))
  //   .max(100, lessThan(100))
  //   .typeError(MESSAGE_REQUIRED)
  //   .test("decimal-places", "Ingresa un número con dos decimales", (value) =>
  //     /^-?\d+(\.\d{1,2})?$/.test(value.toString())
  //   ),
  applyTheoreticalSemester: yup.boolean().optional().nullable(),
  theoreticalPercentage: yup
  .number()
  .nullable()
    .min(1, greaterThan(1))
    .max(100, lessThan(100))
    .when("applyTheoreticalSemester",(applyTheoreticalSemester, schema) => {
      if (applyTheoreticalSemester[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .typeError(MESSAGE_REQUIRED)
          .min(1, greaterThan(1))
          .max(100, lessThan(100))
          .typeError(MESSAGE_REQUIRED)
          .test(
            "decimal-places",
            "Ingresa un número con dos decimales",
            (value) => /^-?\d+(\.\d{1,2})?$/.test(value.toString())
          );
      return schema;
    }),
    

  applySocialService: yup.boolean().optional().nullable(),
  socialServicePercentage: yup
    .number()
    .nullable()
    .when("applySocialService", (applySocialService, schema) => {
      if (applySocialService[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .typeError(MESSAGE_REQUIRED)
          .min(1, greaterThan(1))
          .max(100, lessThan(100))
          .typeError(MESSAGE_REQUIRED)
          .test(
            "decimal-places",
            "Ingresa un número con dos decimales",
            (value) => /^-?\d+(\.\d{1,2})?$/.test(value.toString())
          );
      return schema;
    }),
  socialServiceHours: yup
    .number()
    .nullable()
    .when("applySocialService", (applySocialService, schema) => {
      if (applySocialService[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(1, greaterThan(1))
          .max(999, lessThan(999))
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
  knowledgeTransferApply: yup.boolean().optional().nullable(),
  knowledgeTransferPercentage: yup
    .number()
    .nullable()
    .when("knowledgeTransferApply", (knowledgeTransferApply, schema) => {
      if (knowledgeTransferApply[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(1, greaterThan(1))
          .max(100, lessThan(100))
          .typeError(MESSAGE_REQUIRED)
          .test(
            "decimal-places",
            "Ingresa un número con dos decimales",
            (value) => /^-?\d+(\.\d{1,2})?$/.test(value.toString())
          );
      return schema;
    }),
  knowledgeTransferHours: yup
    .number()
    .nullable()
    .when("knowledgeTransferApply", (knowledgeTransferApply, schema) => {
      if (knowledgeTransferApply[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(1, greaterThan(1))
          .max(999, lessThan(999))
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
  gracePeriodApply: yup.boolean().optional().nullable(),
  gracePeriodMonths: yup
    .number()
    .nullable()
    .when("gracePeriodApply", (gracePeriodApply, schema) => {
      if (gracePeriodApply[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(1, greaterThan(1))
          .max(99, lessThan(99))
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
  gracePeriodApplication: yup
    .string()
    .nullable()
    .when("gracePeriodApply", (gracePeriodApply, schema) => {
      if (gracePeriodApply[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .typeError(MESSAGE_REQUIRED)
          .max(50, "Solo se permiten 50 caracteres");
      return schema;
    }),
  continuousSuspensionApplies: yup.boolean().optional().nullable(),
  continuosSuspencionQuantity: yup
    .number()
    .nullable()
    .when(
      "continuousSuspensionApplies",
      (continuousSuspensionApplies, schema) => {
        if (continuousSuspensionApplies[0])
          return schema
            .required(MESSAGE_REQUIRED)
            .min(1, greaterThan(1))
            .max(9, lessThan(9))
            .typeError(MESSAGE_REQUIRED);
        return schema;
      }
    ),
  applyDiscontinuousSuspension: yup.boolean().optional().nullable(),
  discontinuousSuspensionQuantity: yup
    .number()
    .nullable()
    .when(
      "applyDiscontinuousSuspension",
      (applyDiscontinuousSuspension, schema) => {
        if (applyDiscontinuousSuspension[0])
          return schema
            .required(MESSAGE_REQUIRED)
            .min(1, greaterThan(1))
            .max(9, lessThan(9))
            .typeError(MESSAGE_REQUIRED);
        return schema;
      }
    ),
  applySpecialSuspensions: yup.boolean().optional().nullable(),
  applySpecialSuspensionsQuantity: yup
    .number()
    .nullable()
    .when("applySpecialSuspensions", (applySpecialSuspensions, schema) => {
      if (applySpecialSuspensions[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(1, greaterThan(1))
          .max(9, lessThan(9))
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
  extensionApply: yup.boolean().optional().nullable(),
  extensionApplyQuantity: yup
    .number()
    .nullable()
    .when("extensionApply", (extensionApply, schema) => {
      if (extensionApply[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(1, greaterThan(1))
          .max(9, lessThan(9))
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
});

export const searchRegulation = yup.object({
  program: yup.string().optional(),
  initialPeriod: yup.string().optional(),
  endPeriod: yup.string().optional(),
});
