angular.module("escolinha").factory("photoServices", function ($http, config) {

    const addPhoto = (formData, id) => {

        return $http({
            url: config.baseUrl + `/photos/${id}`,
            headers: {"Content-Type": undefined },
            data: {
                formData
            },
            method: "POST"
        });
    }

    return {
        addPhoto,
    }
});