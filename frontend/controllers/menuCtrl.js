angular.module('Ecommerce').controller("menuCtrl", function ($scope, $location, fornecedorService, $timeout) {
    $scope.app = "Base de fornecedores FULL";
    $scope.title = "Fornecedores:";

    const redirectTo = (page, id = null) => {
        if (id) {
            $location.path(`/${page}/${id}`);
            return;
        }
        $location.path(`/${page}`)
    };

    const showFornecedores = () => {
        $scope.loading = true;
        fornecedorService.listFornecedores()
            .then(resp => {
                $scope.$apply($scope.fornecedores = resp.data);
            })
            .catch(error => {
                if (error && error.data) {
                    $scope.error = error.data.error;
                    return;
                }
            })
            .finally(() => $scope.$apply($scope.loading = false));
    };

    const removeFornecedor = id => {
        Swal.fire({
            title: 'Você tem certeza que deseja deletar esse fornecedor?',
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
                    'Fornecedor deletado.',
                    'success'
                ).then(() => {
                    fornecedorService.destroyFornecedor(id);
                })
            }
        }).finally(() => showFornecedores());
    };

    showFornecedores();

    $scope.removeFornecedor = removeFornecedor;
    $scope.redirectTo = redirectTo;
});