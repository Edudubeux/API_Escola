angular.module("escolinha").factory("getTokenInt", function () {
    return {
        request: function (config) {
            
            config.headers = config.headers || {};
            
            if (localStorage.token) {
                config.headers.Authorization = 'Bearer ' + localStorage.token;
            };
            
            console.log(config);
            return config;
        }
    }
    
});
