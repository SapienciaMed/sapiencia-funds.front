import { Dispatch, SetStateAction } from "react";
import { IRegulation } from "../../../common/interfaces/regulation";
import { ApiResponse } from "../../../common/utils/api-response";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { UseFormSetValue } from "react-hook-form";

export const controlToggle = (data: IRegulation, setToggleControl: Dispatch<SetStateAction<any>>) => {
  setToggleControl({
    applySocialService: data.applySocialService,
    applyKnowledgeTransfer: data.applyKnowledgeTransfer,
    applyGracePeriod: data.applyGracePeriod,
    applyContinuousSuspension: data.applyContinuousSuspension,
    applyDiscontinuousSuspension: data.applyDiscontinuousSuspension,
    applySpecialSuspensions: data.applySpecialSuspensions == 1,
    applyExtension: data.applyExtension == 1,
    applyCondonationPerformancePeriod: data.applyCondonationPerformancePeriod == 1,
    applyAccomulatedIncomeCondonation: data.applyAccomulatedIncomeCondonation == 1,
    applyTheoreticalSemiannualPercent: data.applyTheoreticalSemiannualPercent == 1,
    applyAcademicPerformancePercent: data.applyAcademicPerformancePercent == 1,
    applyRequirementsPercent: data.applyRequirementsPercent == 1
  });
};

export const setValuesRegulation = (response: ApiResponse<IRegulation>, setValue: UseFormSetValue<IRegulation>) => {
  setValue('idProgram', response.data?.idProgram)
  setValue('initialPeriod', response.data?.initialPeriod)
  setValue('endPeriod', response.data?.endPeriod)
  setValue('isOpenPeriod', response.data?.isOpenPeriod)
  setValue('applyTheoreticalSemiannualPercent', response.data?.applyTheoreticalSemiannualPercent)
  setValue('applyAcademicPerformancePercent', response.data?.applyAcademicPerformancePercent)
  setValue('applyRequirementsPercent', response.data.applyRequirementsPercent)
  setValue('applySocialService', response.data?.applySocialService)
  setValue('socialServiceCondonationType', response.data.socialServiceCondonationType)
  setValue('applyKnowledgeTransfer', response.data.applyKnowledgeTransfer)
  setValue('knowledgeTransferCondonationType', response.data.knowledgeTransferCondonationType)
  setValue('applyGracePeriod', response.data.applyGracePeriod)
  setValue('graceDateApplication', response.data.graceDateApplication)
  setValue('applyContinuousSuspension', response.data.applyContinuousSuspension)
  setValue('applyDiscontinuousSuspension', response.data.applyDiscontinuousSuspension)
  setValue('applySpecialSuspensions', response.data.applySpecialSuspensions)
  setValue('applyExtension', response.data.applyExtension)
  setValue('applyCondonationPerformancePeriod', response.data.applyCondonationPerformancePeriod)
  setValue('academicPerformancePercent', response.data.academicPerformancePercent)
  setValue('requirementsPercent', response.data.requirementsPercent)
  setValue('socialServicePercent', response.data.socialServicePercent)
  setValue('socialServiceHours', response.data.socialServiceHours)
  setValue('knowledgeTransferPercent', response.data.knowledgeTransferPercent )
  setValue('knowledgeTransferHours', response.data.knowledgeTransferHours)
  setValue('gracePeriodMonths', response.data.gracePeriodMonths)
  setValue('continuosSuspencionQuantity', response.data.continuosSuspencionQuantity)
  setValue('discontinuousSuspensionQuantity', response.data.discontinuousSuspensionQuantity)
  setValue('specialSuspensionsQuantity', response.data.specialSuspensionsQuantity)
  setValue('extensionQuantity', response.data.extensionQuantity)
  setValue('theoreticalSemiannualPercent', response.data.theoreticalSemiannualPercent)
};