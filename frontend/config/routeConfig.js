angular.module('Ecommerce').config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.when("/menu", {
    templateUrl: "views/menuPage.html",
    controller: "menuCtrl",
  });

  $routeProvider.when("/addFornecedor", {
    templateUrl: "views/addFornecedorPage.html",
    controller: "fornecedorCtrl",
  });
});
