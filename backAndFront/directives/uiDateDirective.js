angular.module("listaTelefonica").directive("uiDate", function ($filter) {
    return {
        require: "ngModel",
        link: function (scope, element, atributes, controller) {
                function _formatDate (date) {

                    date = date.replace(/ˆ0-9+/gi, ""); 

                    if(date.length === 3){
                        date = date.substring(0,2) + "/" + date.substring(2);
                    }

                    else if(date.length === 6){
                        date = date.substring(0,5) + "/" + date.substring(5,9)
                    }

                    return date;
                }
            element.bind("keyup", function () {
                controller.$setViewValue(_formatDate(controller.$viewValue));
                controller.$render();
            });

            controller.$parsers.push(function (value) {
                if (value.length === 10) {
                    var dateArray = value.split("/");
                    console.log(dateArray);
                    return new Date(dateArray[2], dateArray[1]-1, dateArray[0]).getDay()
                }
            });

            controller.$formatters.push(function (value) {
                return $filter("date")(value, "dd/MM/yyyy");
            });
        }
    };
});