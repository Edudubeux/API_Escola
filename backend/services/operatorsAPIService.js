angular.module("listaTelefonica").factory("operatorsAPI", $http => {
  var _getOps = () => {
    return $http.get("http://localhost:3412/operadoras");
  }

  return {
    getOps: _getOps,
  }
})