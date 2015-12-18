angular.module('starter.services')

.factory('StoreService', function($http) {
    return {
        searchBestBuy: function(cityName) {
            var bestBuyStoreURL = 'http://api.bestbuy.com/v1/stores(city=searchCity)?apiKey=aj74mwtaz5mrruf5j2d3nq7z&format=json';
            return $http.get(bestBuyStoreURL.replace('searchCity', cityName));
        },
        searchClosestBestBuy: function(latitude, longitude) {

            var bestBuyStoreURL = 'http://api.bestbuy.com/v1/stores(area(latitude,longitude,300))?format=json&apiKey=aj74mwtaz5mrruf5j2d3nq7z';
            return $http.get(bestBuyStoreURL.replace('latitude', latitude).replace('longitude', longitude));
        }
    };
});
