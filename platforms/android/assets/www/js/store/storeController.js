angular.module('starter.controllers')
    .controller('StoreCtrl', function($scope, $http, StoreService,  $cordovaGeolocation, $log, $ionicPopup) {
        $scope.products = {};
        $scope.currentPosition = {};
        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };
        $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function(position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                $scope.currentPosition.latitude = lat;
                $scope.currentPosition.longitude = long;
                

            }, function(err) {
                // error
                $log.debug("cannot determine current position");
            });

        $scope.getNearestStore = function() {
            if (($scope.currentPosition.latitude == null) || ($scope.currentPosition.longitude == null)) {
                $log.debug("Your current position is not retrieved yet. Please try again later");
                $ionicPopup.alert({
                    title: 'Failed',
                    content: 'Your current position is not retrieved yet. Please try again later'
                }).then(function() {
                    //$window.location.reload();
                });
            } else {
                StoreService.searchClosestBestBuy($scope.currentPosition.latitude, $scope.currentPosition.longitude)
                    .then(function(results) {
                        $scope.stores = results.data.stores;

                        
                    });
            }
        };
        $scope.doSearch = function() {
            if (!this.search) {return;}

            StoreService.searchBestBuy(this.search).then(function(results) {
                $scope.stores = results.data.stores;

                
            });

        };
    });
