angular.module("Ecommerce").controller('produtoCtrl', function($scope, produtoService, ) {
    $scope.app = "Produtos";

    const redirectTo = page => {
        getFornecedor($routeParams.id);
        $location.path(`/${page}`)
    };

    $scope.redirectTo = redirectTo;
});