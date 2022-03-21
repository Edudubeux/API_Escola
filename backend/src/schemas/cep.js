import * as yup from 'yup' ;

export default {
    index: {
        params: yup.object().shape({
            cep: yup.string().length(8).required()
        }).noUnknown()
    }
};