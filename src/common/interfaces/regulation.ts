export interface IRegulation {
  id?: number;
  program: string;
  initialPeriod: string;
  openPeriod: boolean;
  endPeriod?: string;
  theoreticalPercentage: number;
  applySocialService: boolean;
  socialServicePercentage?: number;
  socialServiceHours?: number;
  knowledgeTransferApply: boolean;
  knowledgeTransferPercentage?: number;
  knowledgeTransferHours?: number;
  gracePeriodApply: boolean;
  gracePeriodMonths?: number;
  gracePeriodApplication?: string;
  continuousSuspensionApplies: boolean;
  continuosSuspencionQuantity?: number;
  applyDiscontinuousSuspension: boolean;
  discontinuousSuspensionQuantity?: number;
  applySpecialSuspensions: boolean;
  applySpecialSuspensionsQuantity?: number;
  extensionApply: boolean;
  extensionApplyQuantity?: number;
  applyCondonationPerformancePeriod: boolean;
  performancePeriod?: string;
  accomulatedIncomeCondonationApplies: boolean;
  accumulatedPerformance?: string;
  modifyUser?: string;
  modifyDate?: string;
  createUser: string;
  createDate: string;
}

export interface IRegulationSearch {
  program: string;
  initialPeriod: string;
  endPeriod: string;
}

export interface IRequeriments {
  id?: number;
  active?: boolean;
  active_update?: boolean;
  percent?: number;
  description: string;
}
