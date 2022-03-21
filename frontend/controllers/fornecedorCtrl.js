angular.module('Ecommerce').controller('fornecedorCtrl', function ($scope, fornecedorService, cepService, $location, $routeParams) {
    $scope.app = 'Formulário FULL'
    $scope.cepField = false;

    const isEdit = !!$routeParams.id;
    $scope.msg = isEdit ? 'Editar Fornecedor' : 'Adicionar Fornecedor';

    $scope.redirectTo = page => {
        $location.path(`/${page}`)
    }

    const consultCep = cep => {
        if (!$scope.fornecedor.cep || $scope.fornecedor.cep.length !== 8) {
            return;
        }
        cepService.get(cep)
            .then(resp => {
                console.log(resp);
                // $scope.fornecedor.rua = resp.rua
                // $scope.cepField = true;
            })
            .catch(error => {
                console.log(error.data);
            });
    };

    const submit = data => {
        $scope.loading = true;
        const action = isEdit ? fornecedorService.updateFornecedores(data) : fornecedorService.addFornecedor(data, $routeParams.id);

        action.then(resp => {
            console.log(resp);
        }).catch(error => {
            if (error.data && error.data.error && error.data.error === "REQUIRED_FIELDS") {
                $scope.error = "Please, fill the fields.";
                return;
            };
        }).finally(() => $scope.loading = false)

    };

    $scope.submit = submit;
    $scope.consultCep = consultCep;
});