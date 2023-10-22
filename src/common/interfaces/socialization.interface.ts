export interface ISocialization {
  id?: number;
  noProyect: number;
  communeCode: string;
  socializationDate: string;
  validity: number;
  valueGroup: string;
  financialPerformance: number;
  portfolioCollections: number;
  description?: string;
}

export interface ISocializationSearch {
  noProyect: number;
  communeCode: string;
  validity: number;
}
