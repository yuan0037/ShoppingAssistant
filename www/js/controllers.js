angular.module('starter.controllers', []);

angular.module('starter.controllers')
    .controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, AuthFactory, $rootScope,
        $window, $auth, $ionicPopup, $http, $log) {

        $scope.loginData = {};
        $scope.userDisplayed = ""; //used to display the user loggined 

        $scope.isLoggedIn = function() {
            return AuthFactory.isLogged();
        };


        $scope.setDisplayedLogginUser = function(user_displayed) {
            $scope.userDisplayed = user_displayed;
        };

        $scope.logout = function() {
            // if authenticated using facebook, log out

            $scope.loginData = {};

            if ($auth.isAuthenticated()) {
                $auth.logout();
            }
            // logout local AuthFactory
            AuthFactory.logout();

            // clear login data and displayed user name
            $scope.setDisplayedLogginUser("");


            // redirect to login page
            $state.go('app.login_embed');

            $window.location.reload();
        };

        // initiate the facebook login 
        $scope.loginSocial = function(provider) {
            $scope.authenticateSocial(provider);
        };


        $scope.authenticateSocial = function(provider) {
            $auth.authenticate(provider)
                .then(function() {
                    console.log("success");
                    //

                    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
                    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
                    $http.get(graphApiUrl).then(function(response) {
                        AuthFactory.login(response.data.first_name + ' ' + response.data.last_name, "temppassword");
                        $scope.setDisplayedLogginUser(response.data.first_name + ' ' + response.data.last_name);
                        $ionicPopup.alert({
                            title: 'Success',
                            content: 'You have successfully logged in as ' + response.data.first_name + ' ' + response.data.last_name
                        }).then(function() {
                            //$window.location.reload();
                        });

                    });
                })
                .catch(function(response) {
                    $log.debug("cannot login using facebook authentication.");
                    $ionicPopup.alert({
                        title: 'Error',
                        content: response.data ? response.data || response.data.message : response
                    });
                    console.log('failed');

                });
        };




        // Perform the login action when the user submits the login using user/password form
        $scope.doLogin = function(loginData) {
            if ((loginData.username != null) && (loginData.username != "guest") && (loginData.password != null) && (loginData.password.length >= 5)) {
                AuthFactory.login(loginData.username, loginData.password);
                $scope.setDisplayedLogginUser(loginData.username);
                //$window.location.reload();
            } else {
                if (loginData.username == null) {
                    $log.debug("user name is null");
                    $ionicPopup.alert({
                        title: 'Error',
                        content: 'Please specify a username'
                    }).then(function() {

                    });
                } else {
                    if (loginData.username == 'guest') {
                        $log.debug("cannot login as guest");
                        $ionicPopup.alert({
                            title: 'Error',
                            content: 'You cannot login as a guest'
                        }).then(function() {

                        });
                    } else {
                        if ((loginData.password == null) || (loginData.password.length < 5)) {
                            $log.debug("password is too short (length<5)");
                            $ionicPopup.alert({
                                title: 'Error',
                                content: 'Password is too short (length<5)'
                            }).then(function() {

                            });
                        }
                    }
                }
                //$scope.$apply();
            }
        };



        // Perform the facebook login action when the user submits the login form
        $scope.doFacebookLogin = function() {
            console.log('Doing facebook login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };

    });
