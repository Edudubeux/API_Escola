angular.module("escolinha").factory("studentServices", function ($http, config) {
    
    const addStudents = student => {
        return $http.post(config.baseUrl + "/students", student)
    };

    const showStudents = () => {
        return $http.get(config.baseUrl + "/students/:id?")
    };

    const updateStudents = student => {
        return $http.put(config.baseUrl + "/students/:id", student)
    };

    return{
        addStudents,
        showStudents,
        updateStudents
    };
});