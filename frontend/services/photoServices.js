angular.module("escolinha").factory("photoServices", function ($http, config) {

    const addPhoto = (formData, id) => {
        return $http.post(config.baseUrl + `/photos/${id}`, formData, {
            headers: {"Content-Type": undefined },
        });
    }

    const findPhoto = id => {
        return $http.get(config.baseUrl + `/photos/${id}`) 
    };

    const updatePhoto = (formData, id) => {
        return $http.put(config.baseUrl + `/photos/${id}`, formData, {
            headers: {"Content-Type": undefined },
        });
    }

    const deletePhoto = id => {
        return $http.delete(config.baseUrl + `/photos/${id}`)
    }

    return {
        addPhoto,
        findPhoto,
        updatePhoto,
        deletePhoto
    }
});