
var app = angular.module('App', ['ngRoute', 'LocalStorageModule', 'ngMaterial', 'ngMessages', 'ngMdIcons', 'ui.bootstrap.datetimepicker', 'ui.bootstrap.timepicker', 'angular.filter']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });

    $routeProvider.when("/user", {
        controller: "userController",
        templateUrl: "/app/views/user.html"
    });

    $routeProvider.when("/user-edit/:userId", {
        controller: "userController",
        templateUrl: "/app/views/user-edit.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/meal", {
        controller: "mealsController",
        templateUrl: "/app/views/meal.html"
    });

    $routeProvider.when("/my-meals", {
        controller: "mealsController",
        templateUrl: "/app/views/my-meals.html"
    });

    $routeProvider.when("/meals-add", {
        controller: "mealsController",
        templateUrl: "/app/views/meals-add.html"
    });

    $routeProvider.when("/meals-edit/:editId", {
        controller: "mealsController",
        templateUrl: "/app/views/meals-edit.html"
    });

    $routeProvider.otherwise({ redirectTo: "/home" });

});

var serviceBase = 'http://localhost:49512/';
var clientId = 'consoleApp';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: clientId
});

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
});

app.run(['authService', function (authService) {
    authService.fillAuthData();
}]);


