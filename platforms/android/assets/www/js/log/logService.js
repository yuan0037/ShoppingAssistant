angular.module('starter.services')

.factory('LogService', function(localStorageService) {
    return {

        getLogFromStorage: function() { 
            return localStorageService.get("log");
        }
    };
});
