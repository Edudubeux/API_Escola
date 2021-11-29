angular.module("escolinha").controller("loginPageCtrl", function ($scope, userServices) {
  $scope.app = 'LoginPage'
  $scope.users = []

  $scope.addUser = function (user) {
    userServices.addUsers(user).then(function (data) {
      console.log('cheguei aqui')
      console.log(data.data);
    })
  }
})

