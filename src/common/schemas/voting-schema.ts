
import * as yup from "yup";

export const createVotings = yup.object({
  communeNeighborhood: yup.string().required("El nombre de la comuna es obligatorio"),
  numberProject: yup .string()
    .required("El campo número de proyecto es obligatorio")
    .test('len', 'Solo se permiten 30 caracteres', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
  validity: yup.string().required("La vigencia es obligatoria").test('len', 'Solo se permiten 4 caracteres', (val) => { if (val && val.toString().length > 4) return val.toString().length < 30; else return true}),
  ideaProject: yup.string().required("La idea de proyecto es obligatoria"),
});


export const createItems = yup.object({
  directObject: yup.string().required("El campo objetivo es obligatorio"),
  productCatalog:yup .string()
    .required("El campo producto catalogo dnp es obligatorio")
    .test('len', 'Solo se permiten 30 inidades', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
  productCode: yup.string().required("El Código producto dnp es obligatorio"),
  program: yup.string().required("El campo programa es obligatorio"),
  activity: yup.string().required("El campo actividad del item es obligatorio"),
  activityValue: yup.string()
    .required("El campo valor actividad es obligatorio")
    .test('len', 'Solo se permiten 30 inidades', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
  amount: yup.string()
    .required("El campo cantidad es obligatorio")
    .test('len', 'Solo se permiten 30 inidades', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
  totalCost: yup.string()
    .required("El campo costo total es obligatorio")
    .test('len', 'Solo se permiten 30 inidades', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
  porcentaje123: yup.string()
    .required("El campo porcentaje 123 es obligatorio")
    .test('len', 'Solo se permiten 30 inidades', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
  porcentaje456: yup.string()
    .required("El campo porcentaje 456 es obligatorio")
    .test('len', 'Solo se permiten 30 inidades', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
});



export const searchVotings = yup.object({
  communeNeighborhood: yup.string().required("El nombre de la comuna es obligatorio"),
  numberProject: yup .string()
    .required("El campo número de proyecto es obligatorio")
    .test('len', 'Solo se permiten 30 caracteres', (val) => { if (val && val.toString().length > 30) return val.toString().length < 30; else return true}),
  validity: yup.string().required("La vigencia es obligatoria"),
  ideaProject: yup.string().required("La idea de proyecto es obligatoria"),
});




export const ResourcePrioritizationSearch = yup.object({
  projectNumber: yup.number().required("Requerido!"),
  programId: yup.number().required("Requerido!"),
  validity: yup.number().required("Requerido!"),
  generalRate: yup.number().required("Requerido!"),
  operatorCommissionAct: yup.number().required("Requerido!"),
  operatorCommissionBalance: yup.number().required("Requerido!"),
  operatorCommission: yup.number().required("Requerido!"),
});



export const  ResourcePrioritizationSchema = yup.object({
  financialPerformances: yup.number().required("Requerido!"),
  generalRate: yup.number().required("Requerido!"),
  averageCost: yup.number().required("Requerido!"),
  balanceResources: yup.number().required("Requerido!"),
 });

