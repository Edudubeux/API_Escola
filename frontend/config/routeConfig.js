angular.module("escolinha").config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.when("/loginPage", {
    templateUrl: "views/loginPage.html",
    controller: "loginPageCtrl"
  })

  $routeProvider.otherwise({
    redirectTo: "/loginPage"
  })
})
