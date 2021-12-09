angular.module("escolinha").config(function ($httpProvider) {
    $httpProvider.interceptors.push("getTokenInt")
    // console.log($httpProvider);
})