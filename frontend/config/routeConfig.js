app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.when("/menu", {
    templateUrl: "views/menuPage.html",
    controller: "menuCtrl",
  });
});
