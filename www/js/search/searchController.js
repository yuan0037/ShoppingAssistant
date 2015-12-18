angular.module('starter.controllers')
    .controller('SearchCtrl', function($scope, $http, SearchService, $ionicSlideBoxDelegate, $log) {
        $scope.products = {};
        $scope.searchHint = "";

        $scope.setTimeout = function() {
            $ionicSlideBoxDelegate.slide(0);
            $ionicSlideBoxDelegate.update();
            //$scope.$apply();
        };

        $scope.doSearch = function() {
            if (!this.search) {
                return;
            }

            SearchService.searchBestBuy(this.search).then(function(results) {
                $scope.searchStarted = true;
                $scope.products = results.data.products;
                if ($scope.products.length === 0) {
                    $scope.searchHint = "Did not find anything";
                    $log.debug("Did not find anything by searching " + this.search);
                } else {
                    $scope.searchHint = "";
                }

                $scope.setTimeout();
            });

        };
    });
