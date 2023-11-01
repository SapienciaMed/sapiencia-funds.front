import * as yup from "yup";

const MESSAGE_REQUIRED = "Completar información";

export const createRegulation = yup.object().shape({
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
  theoreticalPercentage: yup
    .number()
    .typeError(MESSAGE_REQUIRED)
    .required(MESSAGE_REQUIRED)
    .min(0)
    .max(100),
  applySocialService: yup.boolean().optional().nullable(),
  socialServicePercentage: yup
    .number()
    .min(0)
    .max(100)
    .typeError(MESSAGE_REQUIRED)
    .when("applySocialService", (applySocialService, schema) => {
      if (applySocialService[0]) return schema.required(MESSAGE_REQUIRED);
      return schema;
    }),
  socialServiceHours: yup
    .number()
    .min(1)
    .max(999)
    .typeError(MESSAGE_REQUIRED)
    .when("applySocialService", (applySocialService, schema) => {
      if (applySocialService[0]) return schema.required(MESSAGE_REQUIRED);
      return schema;
    }),
  knowledgeTransferApply: yup.boolean().optional().nullable(),
  knowledgeTransferPercentage: yup
    .number()
    .min(0)
    .max(100)
    .typeError(MESSAGE_REQUIRED)
    .when("knowledgeTransferApply", (knowledgeTransferApply, schema) => {
      if (knowledgeTransferApply[0]) return schema.required(MESSAGE_REQUIRED);
      return schema;
    }),
  knowledgeTransferHours: yup
    .number()
    .min(1)
    .max(999)
    .typeError(MESSAGE_REQUIRED)
    .when("knowledgeTransferApply", (knowledgeTransferApply, schema) => {
      if (knowledgeTransferApply[0]) return schema.required(MESSAGE_REQUIRED);
      return schema;
    }),
  gracePeriodApply: yup.boolean().optional().nullable(),
  gracePeriodMonths: yup
    .number()
    .min(0)
    .max(99)
    .typeError(MESSAGE_REQUIRED)
    .when("gracePeriodApply", (gracePeriodApply, schema) => {
      if (gracePeriodApply[0]) return schema.required(MESSAGE_REQUIRED);
      return schema;
    }),
  gracePeriodApplication: yup
    .string()
    .typeError(MESSAGE_REQUIRED)
    .max(50, "Solo se permiten 50 caracteres")
    .when("gracePeriodApply", (gracePeriodApply, schema) => {
      if (gracePeriodApply[0]) return schema.required(MESSAGE_REQUIRED);
      return schema;
    }),
  continuousSuspensionApplies: yup.boolean().optional().nullable(),
  continuosSuspencionQuantity: yup
    .number()
    .min(0)
    .max(9)
    .typeError(MESSAGE_REQUIRED)
    .when(
      "continuousSuspensionApplies",
      (continuousSuspensionApplies, schema) => {
        if (continuousSuspensionApplies[0])
          return schema.required(MESSAGE_REQUIRED);
        return schema;
      }
    ),
  applyDiscontinuousSuspension: yup.boolean().optional().nullable(),
  discontinuousSuspensionQuantity: yup
    .number()
    .min(0)
    .max(9)
    .typeError(MESSAGE_REQUIRED)
    .when(
      "applyDiscontinuousSuspension",
      (applyDiscontinuousSuspension, schema) => {
        if (applyDiscontinuousSuspension[0])
          return schema.required(MESSAGE_REQUIRED);
        return schema;
      }
    ),
  applySpecialSuspensions: yup.boolean().optional().nullable(),
  applySpecialSuspensionsQuantity: yup
    .number()
    .min(0)
    .max(9)
    .typeError(MESSAGE_REQUIRED)
    .when("applySpecialSuspensions", (applySpecialSuspensions, schema) => {
      if (applySpecialSuspensions[0]) return schema.required(MESSAGE_REQUIRED);
      return schema;
    }),
  extensionApply: yup.boolean().optional().nullable(),
  extensionApplyQuantity: yup
    .number()
    .min(0)
    .max(9)
    .typeError(MESSAGE_REQUIRED)
    .when("extensionApply", (extensionApply, schema) => {
      if (extensionApply[0]) return schema.required(MESSAGE_REQUIRED);
      return schema;
    }),
});
