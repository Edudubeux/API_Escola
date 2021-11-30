angular.module("escolinha").config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.when("/loginPage", {
    templateUrl: "views/loginPage.html",
    controller: "loginPageCtrl"
  })

  $routeProvider.when("/menu", {
    templateUrl: "views/menuPage.html",
    controller: "menuPageCtrl"
  })

  $routeProvider.otherwise({
    redirectTo: "/loginPage"
  })
})
