import * as yup from 'yup' ;

export default {
    add: {
        body: yup.object().shape({
            fornecedor_id: yup.number().min(1).required(),
            produto_id: yup.array().required()
        }),
    },
    index: {
        body: yup.object().shape({
            fornecedor_id: yup.number().min(1).required()
        })
    },
    find: {
        params: yup.object().shape({
            id: yup.number().required()
        })
    },
    update: {
        body: yup.object().shape({
            fornecedor_id: yup.number().min(1).required(),
            situation: yup.string().oneOf([ 'OPEN', 'DONE', 'CANCELED' ])
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