app.factory('cepService', function($http, config) {
    const get = cep => {
        $http.get(config.baseUrl + '/cep', cep);
    }

    return get;
});