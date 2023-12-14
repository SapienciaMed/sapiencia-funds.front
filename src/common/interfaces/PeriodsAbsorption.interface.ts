import { DateTime } from "luxon";

export interface ICallPeriodsRes {
  id: number;
  name: string;
  minimumSalary: number;
}
export interface ICallPeriodsResfilters {
  value: number;
  name: string;
  announcementId: number;
}

export interface ICreatePeriodsAbsorption {
  sceneryPercentage1: number;
  sceneryPercentage2: number;
  sceneryPercentage3: number;
}

export interface IPeriodsAbsorption {
  id?: number; // PAB_CODIGO
  announcementId: string; // PAB_CONVOCATORIA
  communeFundId: number; // PAB_FONDO_COMUNA
  resource: string; // PAB_RECURSO
  sceneryPercentage1: string; // PAB_PORCENTAJE_ESCENARIO_1
  sceneryPercentage2: string; // PAB_PORCENTAJE_ESCENARIO_2
  sceneryPercentage3: string; // PAB_PORCENTAJE_ESCENARIO_3
  sceneryValue1: string; // PAB_VALOR_ESCENARIO_1
  sceneryValue2: string; // PAB_VALOR_ESCENARIO_2
  sceneryValue3: string; // PAB_VALOR_ESCENARIO_3
  userModified: string; // PAB_USUARIO_MODIFICO
  updatedAt: DateTime; // PAB_FECHA_MODIFICO
  userCreated: string; // PAB_USUARIO_CREO
  createdAt: DateTime; // PAB_FECHA_CREO
}
