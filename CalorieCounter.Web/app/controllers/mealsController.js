'use strict';
app.controller('mealsController', ['$scope', '$location', '$routeParams', '$mdToast','$route', 'mealsService', function ($scope, $location, $routeParams, $mdToast,$route, mealsService) {
    //Init
    $scope.savedSuccessfully = false;
    $scope.message = "";
    $scope.mealFilter = {};
    $scope.data = {
        calorieLimit: 1800,
        loading: true
    };

    $scope.meal = {
        name: "",
        numberOfCalories: "",
        dateTime: ""
    };



    $scope.calculateDailyCalories = function (meals) {
        var total = 0;
        meals.forEach(function (meal) {
            total += meal.numberOfCalories;
        });
        return total;
    }


    $scope.setColorByCalorieLimit = function (meals) {
        var daily = $scope.calculateDailyCalories(meals);
        var calorieLimit = $scope.data.calorieLimit;
        if (daily > calorieLimit)
            return "red";
        else
            return "green";
    }

    $scope.data.getFilteredMeals = function () {
        mealsService.getFilteredMeals($scope.mealFilter)
            .then(function (results) {
                $scope.meals = results.data;
            }, function (error) {
                //alert(error.data.message);
            });
    };

    $scope.getMyMeals = function () {
        mealsService.getMyMeals()
            .then(function (results) {
                $scope.meals = results.data;
                $scope.data.loading = false;
            }, function (error) {
                //alert(error.data.message);
            });
    };

    $scope.getMeals = function () {
        mealsService.getMeals()
           .then(function (results) {
               $scope.meals = results.data;
               $scope.data.loading = false;
           }, function (error) {
               //alert(error.data.message);
           });
    };

    $scope.createMeal = function () {
        mealsService.createMeal($scope.meal)
            .then(function (results) {
                $location.path('/my-meals');
                $mdToast.show(
            $mdToast.simple()
              .content(results.name + " Added!")
               .hideDelay(3000)
          );
            }, function (error) {
                //alert(error.data.message);
            });
    };

    $scope.deleteMeal = function (id) {
        mealsService.deleteMeal(id)
            .then(function (results) {
                 $route.reload();
                $mdToast.show(
            $mdToast.simple()
              .content("Deleted!")
               .hideDelay(3000)
          );
            }, function (error) {
                //alert(error.data.message);
            });
    };
 
    $scope.editMeal = function () {
        mealsService.editMeal($scope.meal)
            .then(function (results) {
                $location.path('/my-meals');
                $mdToast.show(
            $mdToast.simple()
              .content("Edited!")
               .hideDelay(3000)
          );
            }, function (error) {
                //alert(error.data.message);
            });
    };


    //Check params
    var editId = $routeParams.editId;
    if (editId != null) {
        mealsService.getMeal(editId)
            .then(function (results) {
                $scope.meal = results.data;
                $scope.meal.dateTime=new Date(results.data.dateTime);
            }, function (error) {
                //alert(error.data.message);
            });
    }

}]);