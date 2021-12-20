angular.module("escolinha").factory("photoServices", function ($http, config) {

    const addPhoto = id => {
        return $http.post(config.baseUrl + `/photos/${id}`, {params : {
            id,
        }});
    }

    return {
        addPhoto,
    }
});