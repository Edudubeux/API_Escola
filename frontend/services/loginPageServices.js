angular.module("escolinha").factory("userServices", ($http, config) => {
  var _getUsers = function () {
    return $http.get(config.baseUrl + '/users')
  }
  
  var _addUsers = function (user) {
    return $http.post(config.baseUrl + '/users', user)
  }

  return{
    getUsers: _getUsers,
    addUsers: _addUsers
  }
});
