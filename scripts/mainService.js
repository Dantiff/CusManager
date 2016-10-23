

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
            var token = $window.localStorage.getItem('token');


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


//
// var customersService = {};
//
// customersService = [];
//
// customersService.create = function (data) {
//
//     var id = (customersService.length)+1;
//
//     data['id'] = id++;
//
//     $localStorage.orders = [data];
//
//     var showCustomers = $localStorage.orders;
//
//     alert('New customer registered');
//
//     return showCustomers;
// };

/**
 * Customers Service
 */

jwt.factory('customersService', ['auth', '$localStorage', function(auth, $localStorage){


    var customersService = {};

    customersService = [];

    customersService.create = function (names, emailAddress, address, phone) {


        var id = customersService.length + 1;


        customersService.push({
            id: id,
            names: names,
            emailAddress: emailAddress,
            address: address,
            phone: phone
        });

        alert('New customer registered');

        return customersService;
    };

    customersService.showAll = function () {

        return customersService;

    };


    customersService.update = function ( customerId, data) {

        data['id'] = customerId;

        $localStorage.orders = [data];

        var showCustomers = $localStorage.orders;

        alert('Customer details successfully updated');

        return showCustomers;
    };

    customersService.remove = function (customerId) {

        $localStorage.$reset('customers');

        alert('Customer successfully removed');

    };




    return customersService;
}]);




/**
 * Orders Service
 */

jwt.factory('ordersService', ['auth', '$localStorage', function(auth, $localStorage){

    var ordersService = {};

    ordersService = [];

    ordersService.create = function (title, auth_name, description, amount) {

        var id = ordersService.length + 1;

        ordersService.push(
            {
                id: id,
                title: title,
                auth_name: auth_name,
                description: description,
                amount: amount
            }
        );

        alert('New customer registered');

        return ordersService;
    };

    ordersService.showAll = function () {

        return ordersService;

    };


    ordersService.update = function (orderId, data) {

        data['id'] = orderId;

        $localStorage.orders = [data];

        var showOrders = $localStorage.orders;

        alert('Order details successfully updated');

        return showOrders;
    };

    ordersService.remove = function (orderId) {

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