app.factory('fornecedorService', function($http, config) {
    const addFornecedor = fornecedor => {
        return $http.post(config.baseUrl + '/fornecedor', fornecedor);
    };

    const findFornecedor = id => {
        return $http.get(config.baseUrl + `/fornecedor/${id}`)
    };

    const listFornecedores = () => {
        return $http.get(config.baseUrl + '/fornecedores')
    };

    const updateFornecedores = (changes, id) => {
        return $http.put(config.baseUrl + `/fornecedor/${id}`, changes);
    };

    const destroyFornecedor = id => {
        return $http.delete(config.baseUrl + `/fornecedores/${id}`);
    };

    return {
        addFornecedor,
        findFornecedor,
        listFornecedores,
        updateFornecedores,
        destroyFornecedor
    };
});