angular.module('Ecommerce').controller('pedidoCtrl', function($scope, $location, pedidoService, $routeParams, produtoService) {
    $scope.app = 'Pedidos';
    $scope.msg = 'Adicionar Pedido';

    const showProdutos = () => {
        $scope.loading = true;
        produtoService.getProdutos()
        .then(resp => {
            $scope.produtos = resp.data;
        }).catch(error => {
            $scope.error = error;
        }).finally(() => $scope.$apply($scope.loading = false));
    };
    
    if ($routeParams.id) {
        showProdutos();
        $scope.fornecedor_id = $routeParams.id;
    };

    const redirectTo = (page, id = null) => {
        if (id) {
            $location.path(`/${page}/${id}`);
            return;
        }
        $location.path(`/${page}`)
    };

    const showPedidos = () => {
        $scope.loading = true;
        pedidoService.listPedidos()
        .then(resp => {
            $scope.pedidos = resp.data;
        }).catch(error => $scope.error = error)
        .finally(() => $scope.$apply($scope.loading = false));
    };

    const changeSituation = situation => {

    };

    const createPedido = produtos => {
        $scope.loading = true;

        const produtosSelected = produtos.reduce((acc, produto) => { 
            if (produto.selected) {
                acc.push(produto.id);
            }

            return acc;
         }, []);

        const pedido = {
            fornecedor_id: $routeParams.id,
            produto_id: produtosSelected
        };

        pedidoService.createPedido(pedido).then(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Pedido criado.',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                  $timeout(() => redirectTo('menu'));
                });
        }).catch(error => {
            if (error.data && error.data.error && error.data.error === "REQUIRED_FIELDS") {
                $scope.error = "Please, fill the fields.";
                return;
            }

            if (error.data && error.data.error && error.data.error === "Validation failed") {
                $scope.error = error.data.error;
                return;
            }
        }).finally(() => $scope.$apply($scope.loading = false));
    };

    showPedidos();
    $scope.createPedido = createPedido;
    $scope.redirectTo = redirectTo;
});