// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'LocalStorageModule', 'satellizer', 'ngCordova'])
    //auth token for the factory

.constant('authKey', 'myAuthToken')
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })


.run(function($rootScope, $location, $state, AuthFactory) {


    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        var isLogin = (toState.name === "app.login_embed");
        if (isLogin) {
            return; // no need to redirect 
        }

        if (AuthFactory.isLogged() === false) {
            e.preventDefault(); // stop current execution
            $state.go('app.login_embed'); // go to login
        }
    });
})


.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('shoppping-assistant')
        .setStorageType('localStorage')
        .setNotify(true, true);

    $stateProvider

        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.login_embed', {
        url: '/login_embed',
        views: {
            'menuContent': {
                templateUrl: 'templates/embed_login.html',
                controller: 'AppCtrl'
            }
        }
    })

    .state('app.search', {
        url: '/search',
        views: {
            'menuContent': {
                templateUrl: 'templates/search.html',
                controller: 'SearchCtrl'
            }
        }
    })

    .state('app.mystore', {
            url: '/mystore',
            views: {
                'menuContent': {
                    templateUrl: 'templates/mystore.html',
                    controller: 'StoreCtrl'
                }
            }
        })
        .state('app.logs', {
            url: '/logs',
            views: {
                'menuContent': {
                    templateUrl: 'templates/logs.html',
                    controller: 'LogCtrl'
                }
            }
        });

    // .state('app.single', {
    //   url: '/playlists/:playlistId',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'templates/playlist.html',
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login_embed');
})

.config(["$provide", function($provide) {
    // Use the `decorator` solution to substitute or attach behaviors to
    // original service instance; @see angular-mocks for more examples....

    $provide.decorator('$log', ["$delegate", function($delegate) {
        // Save the original $log.debug()
        var debugFn = $delegate.debug;

        $delegate.debug = function() {
            var args = [].slice.call(arguments),
                
            now = (new Date()).toISOString();

            //prepend current user
            var userLoginned = "";

            if (localStorage.getItem("shoppping-assistant.myAuthToken") != null) {
                userLoginned = JSON.parse(localStorage.getItem("shoppping-assistant.myAuthToken")).user;
            }


            var existingLogs = JSON.parse(localStorage.getItem("shoppping-assistant" + "." + "log"));
            if (existingLogs === null) {
                existingLogs = [];
            }
            var newLog = {
                timestamp: now,
                user: userLoginned,
                detail_info: args[0]
            };

            existingLogs.push(newLog);

            localStorage.setItem("shoppping-assistant" + "." + "log", JSON.stringify(existingLogs));
            // Call the original with the output prepended with formatted timestamp
            debugFn.apply(null, args);
        };

        return $delegate;
    }]);
}])

.config(function($authProvider) {

    $authProvider.httpInterceptor = function() {
            return true;
        },
        /* jshint expr: true */
    $authProvider.withCredentials = true;
    $authProvider.tokenRoot = null;
    $authProvider.cordova = false;
    $authProvider.baseUrl = '/';
    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';
    $authProvider.unlinkUrl = '/auth/unlink/';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'satellizer';
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';

    $authProvider.facebook({
        clientId: '842317509223173',
        responseType: 'token'
    });


    // No additional setup required for Twitter

    $authProvider.oauth2({
        name: null,
        url: null,
        clientId: null,
        redirectUri: null,
        authorizationEndpoint: null,
        defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
        requiredUrlParams: null,
        optionalUrlParams: null,
        scope: null,
        scopePrefix: null,
        scopeDelimiter: null,
        state: null,
        type: null,
        popupOptions: null,
        responseType: 'code',
        responseParams: {
            code: 'code',
            clientId: 'clientId',
            redirectUri: 'redirectUri'
        }
    });

});
