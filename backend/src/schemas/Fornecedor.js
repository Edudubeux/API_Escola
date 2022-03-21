import * as yup from 'yup' ;
import sanitize from '../config/sanitize';

export default {
    add: {
        body: yup.object().shape({
            nome: yup.string(255).transform(sanitize).required(),
            email: yup.string(255).transform(sanitize).email().required(),
            cnpj: yup.string().transform(sanitize).required(),
            cep: yup.string().transform(sanitize).required(),
            rua: yup.string(255).transform(sanitize).required(),
            bairro: yup.string(255).transform(sanitize).required(),
            cidade: yup.string(255).transform(sanitize).required(),
            uf: yup.string(255).transform(sanitize).min(2).max(2).required()
        }).noUnknown()
    },
    find: {
        params: yup.object().shape({
            id: yup.number().min(1).nullable()
        })
    },
    update: {
        body: yup.object().shape({
            nome: yup.string(255).transform(sanitize),
            email: yup.string(255).transform(sanitize).email(),
            cnpj: yup.string().transform(sanitize),
            cep: yup.string().transform(sanitize),
            bairro: yup.string(255).transform(sanitize),
            cidade: yup.string(255).transform(sanitize),
            uf: yup.string(255).transform(sanitize)
        }).noUnknown(),
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