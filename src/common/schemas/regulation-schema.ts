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
    .when("applySocialService", (applySocialService, schema) => {
      if (applySocialService[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .typeError(MESSAGE_REQUIRED)
          .min(0)
          .max(100);
      return schema;
    }),
  socialServiceHours: yup
    .number()
    .when("applySocialService", (applySocialService, schema) => {
      if (applySocialService[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(1)
          .max(999)
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
  knowledgeTransferApply: yup.boolean().optional().nullable(),
  knowledgeTransferPercentage: yup
    .number()
    .when("knowledgeTransferApply", (knowledgeTransferApply, schema) => {
      if (knowledgeTransferApply[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(0)
          .max(100)
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
  knowledgeTransferHours: yup
    .number()
    .when("knowledgeTransferApply", (knowledgeTransferApply, schema) => {
      if (knowledgeTransferApply[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(1)
          .max(999)
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
  gracePeriodApply: yup.boolean().optional().nullable(),
  gracePeriodMonths: yup
    .number()
    .when("gracePeriodApply", (gracePeriodApply, schema) => {
      if (gracePeriodApply[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(0)
          .max(99)
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
  gracePeriodApplication: yup
    .string()
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
    .when(
      "continuousSuspensionApplies",
      (continuousSuspensionApplies, schema) => {
        if (continuousSuspensionApplies[0])
          return schema
            .required(MESSAGE_REQUIRED)
            .min(0)
            .max(9)
            .typeError(MESSAGE_REQUIRED);
        return schema;
      }
    ),
  applyDiscontinuousSuspension: yup.boolean().optional().nullable(),
  discontinuousSuspensionQuantity: yup
    .number()
    .when(
      "applyDiscontinuousSuspension",
      (applyDiscontinuousSuspension, schema) => {
        if (applyDiscontinuousSuspension[0])
          return schema
            .required(MESSAGE_REQUIRED)
            .min(0)
            .max(9)
            .typeError(MESSAGE_REQUIRED);
        return schema;
      }
    ),
  applySpecialSuspensions: yup.boolean().optional().nullable(),
  applySpecialSuspensionsQuantity: yup
    .number()
    .when("applySpecialSuspensions", (applySpecialSuspensions, schema) => {
      if (applySpecialSuspensions[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(0)
          .max(9)
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
  extensionApply: yup.boolean().optional().nullable(),
  extensionApplyQuantity: yup
    .number()
    .when("extensionApply", (extensionApply, schema) => {
      if (extensionApply[0])
        return schema
          .required(MESSAGE_REQUIRED)
          .min(0)
          .max(9)
          .typeError(MESSAGE_REQUIRED);
      return schema;
    }),
});

export const searchRegulation = yup.object({
  program: yup.string().typeError(MESSAGE_REQUIRED).required(MESSAGE_REQUIRED),
  initialPeriod: yup
    .string()
    .required(MESSAGE_REQUIRED)
    .typeError(MESSAGE_REQUIRED),
  endPeriod: yup
    .string()
    .required(MESSAGE_REQUIRED)
    .typeError(MESSAGE_REQUIRED),
});
