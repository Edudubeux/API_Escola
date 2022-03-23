angular.module('Ecommerce').config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.otherwise({
    redirectTo: "/menu"
  });

  $routeProvider.when("/menu", {
    templateUrl: "views/menuPage.html",
    controller: "menuCtrl",
  });

  $routeProvider.when("/addFornecedor", {
    templateUrl: "views/fornecedorFormPage.html",
    controller: "fornecedorCtrl",
  });

  $routeProvider.when("/editFornecedor/:id", {
    templateUrl: "views/fornecedorFormPage.html",
    controller: "fornecedorCtrl",
  });

  $routeProvider.when("/produtos", {
    templateUrl: "views/produtosPage.html",
    controller: "produtoCtrl",
  });
});
