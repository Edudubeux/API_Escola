angular.module('Ecommerce').controller('fornecedorCtrl', function ($scope, fornecedorService, cepService, $location, $routeParams, $timeout) {
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
                $timeout(() => {
                    $scope.cepField = true;
                    $scope.fornecedor.rua = resp.data.street;
                    $scope.fornecedor.bairro = resp.data.neighborhood;
                    $scope.fornecedor.cidade = resp.data.city;
                    $scope.fornecedor.uf = resp.data.state;
                })
            })
            .catch(error => {
                console.log(error.data);
            });
    };

    const submit = data => {
        $scope.loading = true;
        const action = isEdit ? fornecedorService.updateFornecedores(data, $routeParams.id) : fornecedorService.addFornecedor(data);

        action.then(resp => {
            console.log(resp);
        }).catch(error => {
            if (error.data && error.data.error && error.data.error === "REQUIRED_FIELDS") {
                $scope.error = "Please, fill the fields.";
                return;
            };
        }).finally(() => {
            $timeout(() => $scope.loading = false);
        });
    };

    $scope.submit = submit;
    $scope.consultCep = consultCep;
});