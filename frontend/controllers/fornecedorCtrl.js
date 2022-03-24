angular.module('Ecommerce').controller('fornecedorCtrl', function ($scope, fornecedorService, cepService, $location, $routeParams) {
    $scope.app = 'Formulário FULL dos Fornecedores'
    $scope.cepField = false;
    $scope.cepMask = '99999-999';

    const isEdit = !!$routeParams.id;
    $scope.msg = isEdit ? 'Editar Fornecedor' : 'Adicionar Fornecedor';

    const redirectTo = (page, id = null) => {
        if (id) {
            $location.path(`/${page}/${id}`);
            return;
        }
        $location.path(`/${page}`)
    };

    const getFornecedor = id => {
        if ($routeParams.id) {
            $scope.cepField = true;
            fornecedorService.findFornecedor(id)
                .then(resp => {
                    $scope.$apply($scope.fornecedor = resp);
                }).catch(error => {
                    $scope.error = error;
                })
        }
    };

    const consultCep = cep => {
        if (!$scope.fornecedor.cep || 8 > $scope.fornecedor.cep.length > 9) {
            $scope.error = 'Digite um CEP válido'
            return;
        }

        cep = cep.replace('-', '');
        cepService.get(cep)
            .then(resp => {
                    $scope.cepField = true;
                    $scope.$apply(
                        $scope.fornecedor.rua = resp.data.street,
                        $scope.fornecedor.bairro = resp.data.neighborhood,
                        $scope.fornecedor.cidade = resp.data.city,
                        $scope.fornecedor.uf = resp.data.state
                    );
            })
            .catch(error => {
                $scope.error = error.data.error;
            });
    };

    const submit = data => {
        $scope.loading = true;
        const action = isEdit ? fornecedorService.updateFornecedores(data, $routeParams.id) : fornecedorService.addFornecedor(data);
        const msg = isEdit ? 'editado.' : 'adicionado';

        action.then(() => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `Fornecedor ${msg}`,
                showConfirmButton: false,
                timer: 1500
              }).then(() => redirectTo('menu'))
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

    getFornecedor($routeParams.id);
    $scope.submit = submit;
    $scope.consultCep = consultCep;
    $scope.redirectTo = redirectTo;
});