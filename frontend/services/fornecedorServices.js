angular.module('Ecommerce').factory('fornecedorService', function($http, config) {
    const addFornecedor = async fornecedor => {
        const { data } = await $http.post(config.baseUrl + '/fornecedor', fornecedor);
        return data;
    };

    const findFornecedor = async id => {
        const { data } = await $http.get(config.baseUrl + `/fornecedor/${id}`);
        return data;
    };

    const listFornecedores = async () => {
        const { data } = await $http.get(config.baseUrl + '/fornecedor');
        return data;
    };

    const updateFornecedores = async (changes, id) => {
        const { data } = await $http.put(config.baseUrl + `/fornecedor/${id}`, changes);
        return data;
    };

    const destroyFornecedor = async id => {
        const { data } = await $http.delete(config.baseUrl + `/fornecedor/${id}`);
        return data;
    };

    return {
        addFornecedor,
        findFornecedor,
        listFornecedores,
        updateFornecedores,
        destroyFornecedor
    };
});