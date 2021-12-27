angular.module("escolinha").factory("photoServices", function ($http, config) {

    const addPhoto = (formData, id) => {
        console.log(formData.get('file'), "OLA FORMDATA");
        console.log(id, "OLA ID");
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

        return $http.post( `${config.baseUrl}/photos/${id}`, formData, {
            headers: {"Content-Type": undefined },
        });
    }
    return {
        addPhoto,
    }
});