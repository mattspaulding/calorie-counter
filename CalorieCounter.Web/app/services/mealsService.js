'use strict';
app.factory('mealsService', ['$http', 'ngAuthSettings', function ($http, ngAuthSettings) {
   
    var serviceBase = ngAuthSettings.apiServiceBaseUri;

    var mealsServiceFactory = {};
  
    // GET
    // Get all meals
    var _getMyMeals = function () {
        return $http.get(serviceBase + 'api/meals/group')
           .then(function (response) {
               return response;
           }, function (response) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
           });
    };
    mealsServiceFactory.getMyMeals = _getMyMeals;

    // GET
    // Get all meals
    var _getMeals = function () {
        return $http.get(serviceBase + 'api/meals')
           .then(function (response) {
               return response;
           }, function (response) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
           });
    };
    mealsServiceFactory.getMeals = _getMeals;

    // POST
    // Get filtered meals
    var _getFilteredMeals = function (mealFilter) {
        mealFilter.startDate = new Date(mealFilter.startDate - mealFilter.startDate.getTimezoneOffset() * 60 * 1000);
        mealFilter.endDate = new Date(mealFilter.endDate - mealFilter.endDate.getTimezoneOffset() * 60 * 1000);

        return $http.post(serviceBase + 'api/meals/filter', mealFilter)
            .then(function (response) {
                return response;
            }, function (response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };
    mealsServiceFactory.getFilteredMeals = _getFilteredMeals;

    // GET
    // Get a meal by id
    var _getMeal = function (id) {
        return $http.get(serviceBase + 'api/meals/' + id)
           .then(function (response) {
               return response;
           }, function (response) {
               // called asynchronously if an error occurs
               // or server returns response with an error status.
           });
    };
    mealsServiceFactory.getMeal = _getMeal;

    // POST
    // Create a meal
    var _createMeal = function (meal) {
        // Account for time zone
        meal.dateTime = new Date(meal.dateTime - meal.dateTime.getTimezoneOffset() * 60 * 1000);
        return $http.post(serviceBase + 'api/meals/', meal)
          .then(function (response) {
              return response.data;
          }, function (response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
    };
    mealsServiceFactory.createMeal = _createMeal;

    // DELETE
    // Delete a meal
    var _deleteMeal = function (id) {
        return $http.delete(serviceBase + 'api/meals/' + id)
          .then(function (response) {
              return response.data;
          }, function (response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
    };
    mealsServiceFactory.deleteMeal = _deleteMeal;

    // DELETE
    // Delete a meal
    var _deleteMealAdmin = function (id) {
        return $http.delete(serviceBase + 'api/meals/admin/' + id)
          .then(function (response) {
              return response.data;
          }, function (response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
    };
    mealsServiceFactory.deleteMealAdmin = _deleteMealAdmin;

    // PUT
    // Edit a meal
    var _editMeal = function (meal) {
        // Account for time zone
        meal.dateTime = new Date(meal.dateTime - meal.dateTime.getTimezoneOffset() * 60 * 1000);
        return $http.put(serviceBase + 'api/meals/' + meal.mealId, meal)
          .then(function (response) {
              return response.data;
          }, function (response) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
    };
    mealsServiceFactory.editMeal = _editMeal;

    return mealsServiceFactory;

}]);