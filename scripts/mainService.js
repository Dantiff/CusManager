

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
 * Orders Service
 */

jwt.factory('ordersService', ['auth', '$localStorage', function(auth, $localStorage){

    var ordersService = {};

    ordersService = [];

    ordersService.create = function (data) {

        var id = (ordersService.length)+1;

        data['id'] = id++;

        $localStorage.orders = [data];

        var showOrders = $localStorage.orders;

        alert('New order registered');

        return showOrders;
    };

    ordersService.showAll = function () {

        var showOrders = $localStorage.orders;

        console.log($localStorage.orders);


        return showOrders;

    };


    ordersService.update = function (data) {

        var id = (ordersService.length)+1;

        data['id'] = id++;

        $localStorage.orders = data;

        var showOrders = $localStorage.orders;

        alert('Order details successfully updated');

        return showOrders;
    };

    ordersService.remove = function () {

       $localStorage.$reset('orders');

        alert('Order successfully removed');

    };




    return ordersService;
}]);




//
// /**
//  * Orders service
//  */
// jwt.factory('ordersService', ['auth', '$window', function (auth, $window) {
//
//
//     ordersService.create = function (data, onSuccess, onError) {
//
//         var orders = {};
//
//         orders.push(data);
//
//         $window.localStorage.setItem('orders', JSON.stringify(orders))
//
//             .then(function (response) {
//
//                 onSuccess(response);
//
//             }, function (response) {
//
//                 onError(response);
//
//             });
//     };

    // ordersService.getAll = function (onSuccess, onError) {
    //
    //     var result = JSON.parse($window.localStorage.getItem("orders")).getList()
    //
    //         .then(function (response) {
    //
    //             onSuccess(response);
    //
    //         }, function (response) {
    //
    //             onError(response);
    //         });
    //
    // };
    //
    // ordersService.getById = function (orderId, onSuccess, onError) {
    //
    //     $window.localStorage.getItem('orders').get()
    //
    //         .then(function (response) {
    //
    //             onSuccess(response);
    //
    //         }, function (response) {
    //
    //             onError(response);
    //
    //         });
    //
    // };
    //
    //
    // ordersService.update = function  (data, orderId, onSuccess, onError) {
    //
    //     var orders = {};
    //
    //     orders.push(data);
    //
    //     $window.localStorage.setItem('orders', JSON.stringify(orders)).custom(data, orderId)
    //
    //         .then(function (response) {
    //
    //             onSuccess(response);
    //
    //         }, function (response) {
    //
    //             onError(response);
    //
    //         });
    // };
    //
    // ordersService.remove = function (orderId, onSuccess, onError) {
    //
    //     window.localStorage.one('orders', orderId).remove()
    //
    //         .then(function (response) {
    //
    //             onSuccess(response);
    //
    //         }, function (response) {
    //
    //             onError(response);
    //
    //         });
    //
    // };
    //
    //
    // localStorageService.setDefaultHeaders({ 'Authorization' : 'Bearer ' + auth.getCurrentToken() });

// }]);