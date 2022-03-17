import * as yup from 'yup' ;

export default {
    find: {
        query: yup.object().shape({
            cep: yup.string().length(8).required()
        }).noUnknown()
    }
};