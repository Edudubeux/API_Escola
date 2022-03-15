const cep = require('cep-promise'); //ver onde eu vou usar

const cepValidator = CEP => {
    cep(CEP).then( value => {
        return value;
    }) .catch(error => {
        error.errors.filter(value => {
            if(value.message === 'CEP INVÁLIDO' || value.message === 'CEP informado possui mais do que 8 caracteres.') {
                throw { message: value.message };
            }
        })
    });
};

export default cepValidator;