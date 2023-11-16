
import * as yup from "yup";

export const createVotings = yup.object({
  communeNeighborhood: yup.string().required("El nombre de la comuna es obligatorio"),
  numberProject: yup .string()
    .required("El campo número de proyecto es obligatorio")
    .test('len', 'Solo se permiten 30 caracteres', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
  validity: yup
      ?.number()
      ?.required("La vigencia es obligatoria")
    ?.max(3000, "Año invalido")
  ?.min(2000, 'Año invalido'),
  ideaProject: yup.string().required("La idea de proyecto es obligatoria").test('len', 'Solo se permiten 500 caracteres', (val) => { if (val && val.toString().length > 500) return val.toString().length < 30; else return true}),
});


export const createItems = yup.object({
  directObject: yup.string().required("El campo objetivo es obligatorio").test('len', 'Solo se permiten 500 caracteres', (val) => { if (val && val.toString().length > 500) return val.toString().length < 500; else return true}),
  productCatalog:yup .string()
    .required("El campo producto catalogo dnp es obligatorio")
    .test('len', 'Solo se permiten 20 caracteres', (val) => { if (val && val.toString().length > 20) return val.toString().length < 20; else return true}),
  productCode: yup.string().required("El Código producto dnp es obligatorio").test('len', 'Solo se permiten 20 caracteres', (val) => { if (val && val.toString().length > 20) return val.toString().length < 20; else return true}),
  program: yup.string().required("El campo programa es obligatorio"),
  activity: yup.string().required("El campo actividad del item es obligatorio"),
  activityValue: yup.string()
    .required("El campo valor actividad es obligatorio")
    .test('len', 'Solo se permiten 30 inidades', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
  amount: yup.number()
    .required("El campo cantidad es obligatorio"),
  totalCost: yup.number()
    .required("El campo costo total es obligatorio"),
  porcentaje123: yup.number()
    .required("El campo porcentaje 123 es obligatorio")
    .max(100, "El porcentaje debe ser inferior a 100").min(0, 'El porcentaje debe ser superior a 0'),
  porcentaje456: yup.number()
    .required("El campo porcentaje 456 es obligatorio").max(100, "El porcentaje debe ser inferior a 100").min(0, 'El porcentaje debe ser superior a 0'),
});



export const searchVotings = yup.object({
  communeNeighborhood: yup.string().required("El nombre de la comuna es obligatorio"),
  numberProject: yup .string()
    .required("El campo número de proyecto es obligatorio")
    .test('len', 'Solo se permiten 30 caracteres', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
  validity: yup
      ?.number()
      ?.required("La vigencia es obligatoria")
    ?.max(3000, "Año invalido")
  ?.min(2000, 'Año invalido'),
  ideaProject: yup.string().required("La idea de proyecto es obligatoria").test('len', 'Solo se permiten 500 caracteres', (val) => { if (val && val.toString().length > 500) return val.toString().length < 500; else return true}),
});




export const ResourcePrioritizationSearch = yup.object({
  projectNumber: yup.number().max(999999999999999, 'valor invalido').required("Requerido!"),
  programId: yup.number().required("Requerido!"),
  validity: yup.number().min(2000,'Año invalido').max(3000, 'Año invalido').required("Requerido!"),
  generalRate: yup.number().min(0, 'El porcentaje debe ser superior a 0').max(100, 'El porcentaje debe ser inferior a 100').required("Requerido!"),
  operatorCommissionAct: yup.number().min(0, 'El porcentaje debe ser superior a 0').max(100, 'El porcentaje debe ser inferior a 100').required("Requerido!"),
  operatorCommissionBalance: yup.number().min(0, 'El porcentaje debe ser superior a 0').max(100, 'El porcentaje debe ser inferior a 100').required("Requerido!"),
  operatorCommission: yup.number().min(0, 'El porcentaje debe ser superior a 0').max(100, 'El porcentaje debe ser inferior a 100').required("Requerido!"),
});



export const  ResourcePrioritizationSchema = yup.object({
  financialPerformances: yup.number().max(999999999999999, 'valor invalido').required("Requerido!"),
  generalRate: yup.number().min(0, 'El porcentaje debe ser superior a 0').max(100, 'El porcentaje debe ser inferior a 100').required("Requerido!"),
  averageCost: yup.number().max(999999999999999, 'valor invalido').required("Requerido!"),
  balanceResources: yup.number().max(999999999999999, 'valor invalido').required("Requerido!"),
 });

