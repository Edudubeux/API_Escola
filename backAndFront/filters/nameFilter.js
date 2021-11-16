angular.module("listaTelefonica").filter("name", function () {
    return function(input) {
        var listName = input.split(" ")
        var listFormat = listName.map( function (name){
            if(/(da|de)/.test(name)) return name
            return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
        })

        console.log(listFormat.join(" "));
        return listFormat.join(" "); 
    }
})