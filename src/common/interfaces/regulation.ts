export interface IRegulation {
  id?: number;
  program?: string;
  initialPeriod?: string;
  openPeriod?: boolean;
  endPeriod?: string;
  isOpenPeriod?: boolean;
  percentageSemiannualPayment?: number;
  applySocialService?: boolean;
  discountPercentagePerPeriod?: string;
  hoursPerPeriod?: string;
  doesKnowledgeTransferApply?: boolean;
  compliancePercentage?: string;
  totalHoursPerCredit?: string;
  doesGracePeriodApply?: boolean;
  months?: string;
  applyDate?: string;
  doApplyContinuousSuspensions?: boolean;
  ApplyServiceAmount?: string;
  doApplyDiscontinuousSuspensions?: boolean;
  ApplyDiscontinuousSuspensionsAmount?: string;
  doApplySpecialSuspensions?: boolean;
  ApplySpecialSuspensionsAmount?: string;
  doesExtensionApply?: boolean;
  doesExtensionApplyAmount?: string;
}
