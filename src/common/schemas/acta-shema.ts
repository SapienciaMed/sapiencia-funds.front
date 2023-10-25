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

       
    
    /* techo: yup.number()        
        .test(
            'is-greater',
            'Vigency1 y/o Vigency2 no deben ser mayores que Techo',
            function (value) {
                const { vigency1, vigency2 } = this.parent;
                return vigency1 <= value && vigency2 <= value;
            }
        ), */

       
    
   
        
});





