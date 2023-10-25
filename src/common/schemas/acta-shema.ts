import * as yup from "yup";

/* export const filterMaster = yup.object({
    codtlmo: yup
    .string()
    .required("Cargar información"),
  }); */

export const createActas = yup.object({    
   numberProject: yup
        .number()
        .required("Completar información"),              
        periodVigency: yup
        .number()
        .required()
        .typeError("Completar información"),       
        announcementInitial: yup
        .number()
        .required()
        .typeError("Completar información"),  
        costsExpenses: yup
        .number()
        .required()
        .typeError("Completar información"),       
        OperatorCommission: yup
        .number()
        .required()
        .typeError("Completar información"),       
        financialOperation: yup
        .number()
        .required()
        .typeError("Completar información"),       

        //vigency1: yup.number(),
        
    vigency2: yup.number(),
       
    
   
        
});





