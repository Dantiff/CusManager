

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

    var customers = [];

    /**
     * Get exitsing from local storage
     *
     * @param key
     * @returns {*}
     */
    var get = function(key){
        return localStorage.getItem(key);
    };

    /**
     * Create a new Customer
     *
     * @param names
     * @param emailAddress
     * @param address
     * @param phone
     * @returns {{}}
     */

    customersService.create = function (names, emailAddress, address, phone) {


        var id = customers.length + 1;


        customers.push({
            id: id,
            names: names,
            emailAddress: emailAddress,
            address: address,
            phone: phone
        });

        alert('New customer registered');
        console.log(customers);

        return customers;
    };

    customersService.showAll = function () {

        return customers;

    };


    customersService.update = function ( customerId, names, emailAddress, address, phone) {

       for (var i=0; i<=customers.length; i++){

           var customer = get(customers);

           console.log(customer);

           if (customer['id'] === customerId){

               localStorage.removeItem(customers[i])
           }

       }

        console.log(customers);

        customers.push({
            id: customerId,
            names: names,
            emailAddress: emailAddress,
            address: address,
            phone: phone
        });

        alert('Customer details successfully updated');

        console.log(customers);

        return customers;
    };

    customersService.remove = function (customer) {

        var index = customers.indexOf(customer);

        customers.splice(index, 1);

        alert('Customer successfully removed');

    };




    return customersService;
}]);




/**
 * Orders Service
 */

jwt.factory('ordersService', ['auth', '$localStorage', function(auth, $localStorage){

    var ordersService = {};

    var orders = [];

    ordersService.create = function (title, auth_name, description, amount) {

        var id = orders.length + 1;

        orders.push(
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

        return orders;

    };


    ordersService.update = function (orderId, title, auth_name, description, amount) {

        for (var i=0; i<=orders.length; i++){

            var order = get(orders);

            console.log(order);

            if (order['id'] === customerId){

                localStorage.removeItem(orders[i])
            }

        }

        console.log(customers);


        orders.push(
            {
                id: id,
                title: title,
                auth_name: auth_name,
                description: description,
                amount: amount
            }
        );

        alert('Order details successfully updated');

        return orders;
    };

    ordersService.remove = function (order) {

       localStorage.removeItem(order);

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