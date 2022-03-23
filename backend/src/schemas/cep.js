import * as yup from 'yup' ;

export default {
    index: {
        params: yup.object().shape({
            cep: yup.string().min(8).max(9).required()
        }).noUnknown()
    }
};