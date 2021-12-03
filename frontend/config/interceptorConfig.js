angular.module("escolinha").config(function ($httpProvider) {
    console.log($httpProvider.interceptors.push("getTokenInt"));
    console.log($httpProvider);
})