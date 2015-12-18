angular.module('starter.services')

.factory('SearchService', function($http) {
    return {
        searchBestBuy: function(productName) {
            var bestBuyServiceURL = 'http://api.bestbuy.com/v1/products((search=searchPhase))?show=name,sku,salePrice,image&apiKey=aj74mwtaz5mrruf5j2d3nq7z&format=json';
            return $http.get(bestBuyServiceURL.replace('searchPhase', productName));
        }
    };
});
