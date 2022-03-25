angular.module('Ecommerce').factory('pedidoService', function ($http, config) {
	const createPedido = async pedido => {
		const data = await $http.post(config.baseUrl + '/pedido', pedido);
		return data;
	};

	const getPedido = async id => {
		const data = await $http.get(config.baseUrl + `/pedido/${id}`);
		return data;
	};

	const listPedidos = async () => {
		const data = await $http.get(config.baseUrl + '/pedido');
		return data;
	};

	const updatePedido = async (pedido, id) => {
		const data = await $http.put(config.baseUrl + `/pedido/${id}`, pedido);
		return data;
	};

	const destroyPedido = async id => {
		const data = await $http.delete(config.baseUrl + `/pedido/${id}`);
		return data;
	};

	return {
		createPedido,
		getPedido,
		listPedidos,
		updatePedido,
		destroyPedido
	};
});