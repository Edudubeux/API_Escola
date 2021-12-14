angular.module("escolinha").config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.when("/registration", {
    templateUrl: "views/registrationPage.html",
    controller: "userCtrl"
  });

  $routeProvider.when("/menu/:id?", {
    templateUrl: "views/menuPage.html",
    controller: "menuCtrl"
  });

  $routeProvider.when("/login", {
    templateUrl: "views/loginPage.html",
    controller: "loginCtrl"
  });

  $routeProvider.when("/updateUser", {
    templateUrl: "views/updateUsersPage.html",
    controller: "userCtrl"
  });
  
  $routeProvider.when("/addStudents", {
    templateUrl: "views/addStudentsPage.html",
    controller: "studentCtrl"
  });

  $routeProvider.when("/updateStudents/:id", {
    templateUrl: "views/updateStudentsPage.html",
    controller: "studentCtrl"
  });

  $routeProvider.when("/error", {
    templateUrl: "views/sorryPage.html",
  });

  $routeProvider.otherwise({
    redirectTo: "/error"
  });
});
