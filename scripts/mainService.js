

var jwtServices = angular.module('jwtServices');


/**
 * JWT service
 */
jwtServices.constant('API', 'http://test-routes.herokuapp.com');

jwtServices.config(function($httpProvider)
{

    $httpProvider.interceptors.push('jwtInterceptor');
});

/**
 * Capture jwt token and check authenticity during login jwtServices
 */
jwtServices.factory('jwtInterceptor', function($window){
    return {
        request: function(config)
        {
            var token = $window.localStorage.getItem('token');;


            config.headers.Authorization = 'Bearer ' + token;
            return config;

        }

    };
});


/**
 * Sessions Service: JWT for register, login, logout
 */

jwtServices.factory('auth', function($http, API, $window){
    var auth = {};

    auth.register = function (username, password)
    {
        $http.post(API+'/auth/register', {username: username, password: password})
            .then(function($state){

                alert('Registered successfully. Please proceed to login');

            }, function(response)
            {
                alert('PLease use a different username/password combination');
            });
    };

    auth.getToken = function()
    {
        return $window.localStorage.getItem('token');
    };

    auth.login = function(username, password)
    {
        $http.post(API+'/auth/login', {username: username, password: password})
            .then(function(response){
                $window.localStorage.setItem('token', response.data.token);

                $state.go("home.list");

            }, function(response)
            {
                alert('Plese use correct username/password combination');
            });
    };

    auth.logout = function()
    {
        $window.localStorage.removeItem('token');
        alert('Successfully logged out');
    };

    return auth;
});