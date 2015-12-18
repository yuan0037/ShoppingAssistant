angular.module('starter.controllers')
    .controller('LogCtrl', function($scope, $http, LogService, $log) {
        $scope.logs = {};
        $scope.logs = LogService.getLogFromStorage();

        $scope.getLogs = function() {
            $scope.logs = LogService.getLogFromStorage();
        };
    });
