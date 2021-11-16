angular.module("listaTelefonica").provider("serialGenerator", function () {
    this.$get = function () {
        return {
            generate: function () {
                var serial = ""
                while (serial.length < 20) {
                    serial += String.fromCharCode(Math.floor(Math.random() * 64) + 32)
                }
                return serial 
            }
        }
    }
});