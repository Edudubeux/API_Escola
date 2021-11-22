angular.module("listaTelefonica").directive("uiDate", function () {
    return {
        require: "ngModel",
        link: function (scope, element, atributes, controller) {
                function _formatDate (date) {

                    date = date.replace(/ˆ0-9+/gi, ""); 

                    if(date.length > 2){
                        date = date.substring(0,2) + "/" + date.substring(2);
                    }

                    // if(date.length > 5){
                    //     date = date.substring(0,5) + "/" + date.substring(5)
                    // }
                    return date;
                }
            element.bind("keyup", function () {
                controller.$setViewValue(_formatDate(controller.$viewValue));
                controller.$render();
            })
        }
    };
});