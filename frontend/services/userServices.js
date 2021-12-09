angular.module("escolinha").factory("userServices", ($http, config) => {
  // const request = ({ params, headers = {}, data, qs, method }) => {
  //   $http[method]({
  //     params,
  //     headers: {
  //       ...headers,
  //       authroization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   })
  // }
  // localStorage.setItem
  // localStorage.getItem
  // localStorage.clear

  const getUser = () => {
    return $http.get(config.baseUrl + '/users')
  };
  
  const addUsers = user => {
    return $http.post(config.baseUrl + '/users', user)
  };

  const updateUser = user => {
    return $http.put(config.baseUrl + '/users', user)
  };

  return{
    getUser,
    addUsers,
    updateUser
  }
});
