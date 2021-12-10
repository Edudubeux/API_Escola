angular.module("escolinha").factory("studentServices", function ($http, config) {
    
    const addStudents = student => {
        return $http.post(config.baseUrl + "/students", student)
    }

    return{
        addStudents
    }
});