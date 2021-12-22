angular.module("escolinha").factory("photoServices", function ($http, config) {

    const addPhoto = (formData, id) => {
        console.log(formData, 'form data');

        return $http({
            url: config.baseUrl + `/photos/${id}`,
            headers: {"Content-Type": undefined },
            data: {
                
            },
            method: "POST"
        });
    }

    return {
        addPhoto,
    }
});