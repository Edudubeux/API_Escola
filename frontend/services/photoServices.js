angular.module("escolinha").factory("photoServices", function ($http, config) {

    const addPhoto = (formData, id) => {
        // console.log(formData, "OLA FORMDATA");
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }

        return $http({
            url: `${config.baseUrl}/photos/${id}`,
            headers: {"Content-Type": undefined },
            data: {
                formData
            },
            method: "POST"
        }), { params : {
            id,
        }
    }
    }
    return {
        addPhoto,
    }
});