angular.module('Ecommerce').controller('fornecedorCtrl', function ($scope, fornecedorService, cepService, $location) {
    const consultCep = () => {
        if (!$scope.forcedor.cep || $scope.forcedor.cep.length !== 8) {
            return;
        }

        cepService.get({ cep })
            .then(resp => {
            $scope.fornecedor.rua = resp.rya
        })  
            .catch()
    };

    $scope.consultCep = consultCep
});