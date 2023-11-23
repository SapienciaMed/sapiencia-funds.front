import * as yup from 'yup';

const generateDynamicSchema = (valor: any) => {
    const schemaShape = {};
    
    Object.keys(valor).forEach((campo) =>  schemaShape[campo] = yup.string().required(`Completar información`));

    return yup.object().shape(schemaShape);
};

export const editItemControl = generateDynamicSchema;