angular.module('Ecommerce').controller('produtoCtrl', function($scope, produtoService, $routeParams, $location, $timeout) {
    $scope.app = 'Produtos';

    const isEdit = !!$routeParams.id;
    $scope.msg = isEdit ? 'Editar Produto' : 'Adicionar Produto';

    const redirectTo = (page, id = null) => {
        if (id) {
            $location.path(`/${page}/${id}`);
            return;
        }
        $location.path(`/${page}`)
    };

    const showProdutos = () => {
        $scope.loading = true;
        produtoService.getProdutos()
        .then(resp => {
            $scope.produtos = resp.data;
        }).catch(error => {
            $scope.error = error;
        }).finally(() => $scope.$apply($scope.loading = false));
    };

    const getProduto = id  => {
        if($routeParams.id) {
            produtoService.findProduto(id)
            .then(resp => {
                $scope.$apply($scope.produto = resp.data);
            }).catch(error => {
                $scope.error = error;
            })
        }

    };

    const removeProduto = id => {
        Swal.fire({
            title: 'Você tem certeza que deseja deletar esse produto?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim'
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deletado!',
                    'Produto deletado.',
                    'success'
                ).then(() => {
                    produtoService.destroyProduto(id);
                })
            }
        }).finally(() => showProdutos());
    };

    const submit = data => {
        $scope.loading = true;
        const action = isEdit ? produtoService.updateProduto(data, $routeParams.id) : produtoService.addProduto(data);
        const msg = isEdit ? 'editado.' : 'adicionado.';

        action.then(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Produto ${msg}`,
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                  $timeout(() => redirectTo('produtos'));
                });
        }).catch(error => {
            if (error.data && error.data.error && error.data.error === "REQUIRED_FIELDS") {
                $scope.error = "Please, fill the fields.";
                return;
            };
        }).finally(() => $scope.$apply($scope.loading = false));
    };

    getProduto($routeParams.id);
    showProdutos();
    $scope.redirectTo = redirectTo;
    $scope.removeProduto = removeProduto;
    $scope.submit = submit;
});