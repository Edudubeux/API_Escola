angular.module("escolinha").factory("loginServices", function ($http, config) {

    const login = user => {
        return $http.post(config.baseUrl + "/tokens", user)
    }

    const getToken = token => {
        localStorage.setItem('token', token)
    }

    return {
        login,
        getToken,
    }
})