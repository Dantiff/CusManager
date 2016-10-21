

/**
 * JWT service
 */
jwt.constant('API', 'http://test-routes.herokuapp.com');

jwt.config(function($httpProvider)
{

    $httpProvider.interceptors.push('jwtInterceptor');
});

/**
 * Capture jwt token and check authenticity during login jwtServices
 */
jwt.factory('jwtInterceptor', function($window){
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

jwt.factory('auth', ['$http', 'API', '$window', function($http, API, $window){
    var auth = {};


    auth.register = function (username, password, onSuccess, onError)
    {
        $http.post(API+'/auth/register',
            {
                username: username,
                password: password
            })
            .then(function(response) {

                $window.localStorage.setItem('token', response.data.token);
                onSuccess(response);

            }, function(response) {

                onError(response);

            });
    };

    auth.getCurrentToken = function()
    {
        return $window.localStorage.getItem('token');
    };


    auth.checkIfLoggedIn = function()
    {
        if($window.localStorage.getItem('token'))
            return true;
        else
            return false;
    };

    auth.login = function(username, password, onSuccess, onError)
    {
        $http.post(API+'/auth/login',
            {
                username: username,
                password: password
            })
            .then(function(response){

                $window.localStorage.setItem('token', response.data.token);
                onSuccess(response);

            }, function(response) {

                onError(response);

            });

    };

    auth.logout = function()
    {
        $window.localStorage.removeItem('token');
    };

    return auth;
}]);

