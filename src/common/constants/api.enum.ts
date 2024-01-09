export enum EResponseCodes {
  OK = "OK",
  WARN = "WARN",
  FAIL = "FAIL",
}

export enum EStatePac{
  Unconsolidated = 1,
  CertifyValues = 2,
  SocialService = 3,
  TecnhicianStepCashing = 4,
  ProfessionalTechnician = 5,
  Coordinator = 6,
  Juridical = 7,
  ProjectManager = 8,
  Committee = 9,
  Consolidated = 10 ,
  AdministrativeAct = 11 
}

export enum ERegulation{
  requirement = 1,
  socialService = 2,
  knowledgeTransfer = 3,
  cumulativeAcademicPeriod = 4,
  cumulativeAcademicPerformance = 5
}