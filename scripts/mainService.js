

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


/**
 * Orders service
 */
jwt.factory('ordersService', ['auth', 'localStorageService', function (auth, localStorageService) {

    ordersService.getAll = function (onSuccess, onError) {

        localStorageService.all('orders').getList()
            .then(function (response) {

                onSuccess(response);

            }, function (response) {

                onError(response);
            });

    };

    ordersService.getById = function (orderId, onSuccess, onError) {

        localStorageService.one('orders').get()

            .then(function (response) {

                onSuccess(response);

            }, function (response) {

                onError(response);

            });

    };

    ordersService.create = function (data, onSuccess, onError) {

        localStorageService.all('orders').post(data)

            .then(function (response) {

                onSuccess(response);

            }, function (response) {

                onError(response);

            });
    };

    ordersService.update = function (orderId, data, onSuccess, onError) {

        localStorageService.one('orders').customPut(data, orderId)

            .then(function (response) {

                onSuccess(response);

            }, function (response) {

                onError(response);

            });
    };

    ordersService.remove = function (orderId, onSuccess, onError) {

        localStorageService.one('orders', orderId).remove()

            .then(function (response) {

                onSuccess(response);

            }, function (response) {

                onError(response);

            });

    };


    localStorageService.setDefaultHeaders({ 'Authorization' : 'Bearer ' + auth.getCurrentToken() });

}]);