angular.module("escolinha", []).controller('loginPageCtrl', function ($scope, usersServices) {
  $scope.app = 'LoginPage'
  $scope.users = []

  const addUsers = (user) => {
    usersServices.addUsers(user).then((data) => {
      console.log('cheguei aqui')
      console.log(data.data);
    })
  }
})
