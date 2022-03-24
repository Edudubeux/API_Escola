angular.module('Ecommerce').factory('produtoService', function($http, config) {
    const addProduto = async produto => {
        const data = await $http.post(config.baseUrl + '/produto', produto);
        return data;
    };

    const findProduto = async id => {
        const data = await $http.get(config.baseUrl + `/produto/${id}`);
        return data;
    };

    const getProdutos = async () => {
        const data = await $http.get(config.baseUrl + '/produto');
        return data;
    };

    const updateProduto = async (changes, id) => {
        const data = await $http.put(config.baseUrl + `/produto/${id}`, changes);
        return data;
    };

    const destroyProduto = async id => {
        const data = await $http.delete(config.baseUrl + `/produto/${id}`);
        return data;
    };

    return {
        addProduto,
        findProduto,
        getProdutos,
        updateProduto,
        destroyProduto
    };
});