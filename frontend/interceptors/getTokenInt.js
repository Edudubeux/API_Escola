angular.module("escolinha").factory("getTokenInt", function () {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            
            if (localStorage.token) {
                config.headers.authorization = 'Bearer ' + localStorage.token;
            };
            
            return config;
        }
    }
    
});
