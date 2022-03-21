angular.module('Ecommerce').factory('cepService', function($http, config) {
    const get = async cep => {
        const result = await $http.get(config.baseUrl + `/cep?cep=${cep}`);
        return result;
    };

    return {
        get
    };
});