angular.module("listaTelefonica").filter("name", function () {
    return function(input) {
        var listName = input.split(" ");
        var listFormat = listName.map( function (name){
            if(/(da|de)/gi.test(name)) { return name.toLowerCase(); }
            return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
        });

        console.log(listFormat);
        return listFormat.join(" "); 
    };
});