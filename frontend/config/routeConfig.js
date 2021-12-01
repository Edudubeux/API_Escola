angular.module("escolinha").config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.when("/registration", {
    templateUrl: "views/registrationPage.html",
    controller: "userCtrl"
  })

  $routeProvider.when("/menu", {
    templateUrl: "views/menuPage.html",
    controller: "menuCtrl"
  })

  $routeProvider.when("/login", {
    templateUrl: "views/loginPage.html",
    controller: "loginCtrl"
  })

  $routeProvider.otherwise({
    redirectTo: "/registration"
  })
})
