export interface IRegulation {
  id?: number;
  program?: string;
  initialPeriod?: string;
  openPeriod?: boolean;
  endPeriod?: string;
  isOpenPeriod?: boolean;
  theoreticalPercentage?: number;
  applySocialService?: boolean;
  socialServicePercentage?: string;
  socialServiceHours?: number;
  knowledgeTransferApply?: boolean;
  knowledgeTransferPercentage?: number;
  knowledgeTransferHours?: number;
  gracePeriodApply?: boolean;
  gracePeriodMonths?: number;
  gracePeriodApplication?: string;
  continuousSuspensionApplies?: boolean;
  continuosSuspencionQuantity?: number;
  applyDiscontinuousSuspension?: boolean;
  discontinuousSuspensionQuantity?: number;
  applySpecialSuspensions?: boolean;
  applySpecialSuspensionsQuantity?: number;
  extensionApply?: boolean;
  extensionApplyQuantity?: number;
  applyCondonationPerformancePeriod?: boolean;
  periodPerformance?: string;
  accomulatedIncomeCondonationApplies?: boolean;

  //change
  active?: boolean;
  percent?: number;
  description?: string;
}
