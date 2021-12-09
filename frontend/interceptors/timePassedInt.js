angular.module("escolinha").factory("timePassedInt", function (localStorage) {
    return {
        request: function (config) {
            const timePassed = new Date().getTime() - localStorage.time();
            console.log(config.headers);

            if (localStorage.token && timePassed > 604800000) {
                localStorage.removeToken();
            };
        }
    }
});