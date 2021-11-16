angular.module('escolinha').fatory('userServices', ($http, config) => {
  var _getUsers = () => {
    return $http.get(config.baseUrl + '/users')
  }

  var _addUsers = (user) => {
    return $http.post(config.baseUrl + '/users', user)
  }

  return{
    getUsers: _getUsers,
    addUsers: _addUsers
  }
});
