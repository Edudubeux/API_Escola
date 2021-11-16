angular.module("listaTelefonica").factory("operatorsAPI", function ($http, config) {
  var _getOps = () => {
    return $http.get(config.baseURL + "/operadoras");
  }

  return {
    getOps: _getOps,
  }
})