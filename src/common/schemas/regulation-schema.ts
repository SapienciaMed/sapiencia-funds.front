import * as yup from "yup";

const MESSAGE_REQUIRED = "Completar información";
const lessThan = (number: number) =>
  `El número debe de ser menor o igual a ${number}`;
const greaterThan = (number: number) =>
  `El número debe de ser mayor o igual a ${number}`;

export const shemaFormRegulation = yup.object().shape({
  idProgram: yup
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
  applyTheoreticalSemiannualPercent: yup.boolean().optional().nullable(),
  theoreticalSemiannualPercent: yup
  .number()
  .nullable()
    .when("applyTheoreticalSemiannualPercent",(applyTheoreticalSemiannualPercent, schema) => {
      if (applyTheoreticalSemiannualPercent[0])
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
  applyAcademicPerformancePercent: yup.boolean().optional().nullable(),
  academicPerformancePercent: yup
    .number()
    .nullable()
    .when("applyAcademicPerformancePercent", (applyAcademicPerformancePercent, schema) => {
      if (applyAcademicPerformancePercent[0])
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
  applyRequirementsPercent: yup.boolean().optional().nullable(),
  requirementsPercent: yup
    .number()
    .nullable()
    .when("applyRequirementsPercent", (applyRequirementsPercent, schema) => {
      if (applyRequirementsPercent[0])
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
  socialServicePercent: yup
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
      if (applySocialService[0]){
        return schema
          .required(MESSAGE_REQUIRED)
          .min(1, greaterThan(1))
          .max(999, lessThan(999))
          .typeError(MESSAGE_REQUIRED);
        }
      return schema;
    }),
  socialServiceCondonationType: yup
  .string()
  .nullable()
  .when("applySocialService", (applySocialService, schema) => {
    if (applySocialService[0]){
      return schema
        .required(MESSAGE_REQUIRED)
      }
    return schema;
  }),
  applyKnowledgeTransfer: yup.boolean().optional().nullable(),
  knowledgeTransferPercent: yup
    .number()
    .nullable()
    .when("applyKnowledgeTransfer", (applyKnowledgeTransfer, schema) => {
      if (applyKnowledgeTransfer[0])
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
    .when("applyKnowledgeTransfer", (applyKnowledgeTransfer, schema) => {
      if (applyKnowledgeTransfer[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(1, greaterThan(1))
          .max(999, lessThan(999))
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
  knowledgeTransferCondonationType: yup
  .string()
  .nullable()
  .when("applyKnowledgeTransfer", (applyKnowledgeTransfer, schema) => {
    if (applyKnowledgeTransfer[0]){
      return schema
        .required(MESSAGE_REQUIRED)
      }
    return schema;
  }),
  applyGracePeriod: yup.boolean().optional().nullable(),
  gracePeriodMonths: yup
    .number()
    .nullable()
    .when("applyGracePeriod", (applyGracePeriod, schema) => {
      if (applyGracePeriod[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(1, greaterThan(1))
          .max(99, lessThan(99))
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
  graceDateApplication: yup
    .string()
    .nullable()
    .when("applyGracePeriod", (applyGracePeriod, schema) => {
      if (applyGracePeriod[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .typeError(MESSAGE_REQUIRED)
          .max(50, "Solo se permiten 50 caracteres");
      return schema;
    }),
  applyContinuousSuspension: yup.boolean().optional().nullable(),
  continuosSuspencionQuantity: yup
    .number()
    .nullable()
    .when(
      "applyContinuousSuspension",
      (applyContinuousSuspension, schema) => {
        if (applyContinuousSuspension[0])
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
  specialSuspensionsQuantity: yup
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
  applyExtension: yup.boolean().optional().nullable(),
  extensionQuantity: yup
    .number()
    .nullable()
    .when("applyExtension", (applyExtension, schema) => {
      if (applyExtension[0])
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
