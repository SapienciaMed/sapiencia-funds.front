import { Control, FieldErrors, UseFormGetValues, UseFormSetValue } from "react-hook-form";


export interface IRegulationSearch extends IRegulation  {
  programId: string;
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


export interface IPeriodSapiencia {
  id: number;
  name: string;
  nameComplementary?: string;
  minimumSalary: number;
  status: string;
}


export interface IRegulation {
  id?: number;
  idProgram?: number;
  programName?: string

  //Para Periodo/Convocatoria
  initialPeriod?: string;
  isOpenPeriod?: number;
  endPeriod?: string;

  //Porcentaje teórico
  applyTheoreticalSemiannualPercent?: number; //?Nuevo (Aplica porcentaje teórico)
  theoreticalSemiannualPercent?: number; //?Nuevo (Porcentaje teórico)

  //Rendimiento Académico
  applyAcademicPerformancePercent?: number; //?Nuevo (Aplica porcentaje rendimiento académico)
  academicPerformancePercent?: string; //?Nuevo (Aplica porcentaje rendimiento académico)

  //Porcentaje Requisitos
  applyRequirementsPercent?: number; //?Nuevo (Aplica porcentaje de requisitos)
  requirementsPercent?: string; //?Nuevo (Aplica porcentaje de requisitos)

  //Aplica Servicio Social
  applySocialService?: number;
  socialServicePercent?: string;
  socialServiceHours?: number;
  socialServiceCondonationType?: string; //?Nuevo (Servicio social condonación)
  socialServiceCondonationPercent?: ICondonationPercent[]; //?Nuevo (Servicio social condonación)

  //Aplica Transferencia de Conocimiento
  applyKnowledgeTransfer?: number;
  knowledgeTransferPercent?: string;
  knowledgeTransferHours?: number;
  knowledgeTransferCondonationType?: string; //?Nuevo (Transferencia de Conocimiento condonación)
  knowledgeTransferCondonationPercent?: ICondonationPercent[]; //?Nuevo (Transferencia de Conocimiento condonación)

  //Aplica Periodo de Gracia
  applyGracePeriod?: number;
  gracePeriodMonths?: number;
  graceDateApplication?: string;

  //Aplica Suspenciones Continuas
  applyContinuousSuspension?: number;
  continuosSuspencionQuantity?: number;

  //Aplica Suspenciones Discontinuas
  applyDiscontinuousSuspension?: number;
  discontinuousSuspensionQuantity?: number;

  //Aplica Suspenciones Especiales
  applySpecialSuspensions?: number;
  specialSuspensionsQuantity?: number;

  //Aplica Prorroga
  applyExtension?: number;
  extensionQuantity?: number;

  //Tab siguiente, Aplica Condonación por Rendimiento Periodo
  applyCondonationPerformancePeriod?: number;
  performancePeriodStructure?: IPerformanceStructure 

  //Tab siguiente, Aplica Condonación por Rendimiento Acumulado
  applyAccomulatedIncomeCondonation?: number;
  accumulatedPerformanceDataTable?: IPerformanceStructure; 

  //Información adicional de registro
  modifyUser?: string;
  modifyDate?: string;
  createUser?: string;
  createDate?: string;

  //Tab final, Requisitos (Los agregamos en paralelo a su respectiva tabla)
  requirementsForReglament?: IRequirementsForReglament[];

}

export interface ICondonationPercent {
  maximumHourPercent: number;
  minimumHourPercent: number;
  condonationPercent: number;
}

export interface IPerformanceStructure {
  percentCondonation: string | number;
  dataTable: ITableMicroStructure[]
}

export interface ITableMicroStructure {
  initialAverage: string;
  endAverage: string;
  percent: string;
  id?: string;
}

export interface IRequirementsForReglament {
  id?: number;
  codReglament?: number;
  active: boolean;
  mandatoryFor?: string;
  description?: string;
  percent?: number
  state?: boolean
}

export interface IPropDetailReglament{
  detailData: IRegulation;
  listPrograms: any[];
  errors: FieldErrors<IRegulationSearch>;
  control: Control<IRegulationSearch, any>;
  setValue: UseFormSetValue<IRegulationSearch>
  getValues: UseFormGetValues<IRegulationSearch>
}