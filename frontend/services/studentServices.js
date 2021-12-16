angular.module("escolinha").factory("studentServices", function ($http, config) {
    
    const addStudents = student => {
        return $http.post(config.baseUrl + "/students", student)
    };

    const showStudents = () => {
        return $http.get(config.baseUrl + "/students")
    };

    const findStudent = id => {
        return $http.get(config.baseUrl + `/students/${id}`, {params : {
            id,
        }});
    };

    const updateStudents = (id, student) => {
        return $http.put(config.baseUrl + `/students/${id}`, student, {params : {
            id,
        }})
    };

    const deleteStudent = id => {
        return $http.delete(config.baseUrl + `/students/${id}`, {params : {
            id,
        }});
    }

    return{
        addStudents,
        showStudents,
        updateStudents,
        deleteStudent,
        findStudent
    };
});