import * as yup from 'yup' ;
import sanitize from '../config/sanitize';

export default {
    add: {
        body: yup.object().shape({
            nome: yup.string(255).transform(sanitize).required(),
            preço: yup.number().required(),
        }),
    },
    index: {
        params: yup.object().shape({
            id: yup.number().min(1).required()
        })
    },
    update: {
        body: yup.object().shape({
            nome: yup.string(255).transform(sanitize),
            preço: yup.number(),
        }),
        params: yup.object().shape({
            id: yup.number().required()
        })
    },
    destroy: {
        params: yup.object().shape({
            id: yup.number().required()
        })
    }
};