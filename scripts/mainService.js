

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

        //Find the customer to edit
        var customer = {};

        customer = [];

        angular.forEach(customers, function (value)
        {
            if (value['id'] == customerId)
            {
                customer = value;
            }
        });

        //Remove Customer
        var index = customers.indexOf(customer);

        customers.splice(index, 1);

        //Replace Customer Data
        customers.push({
            id: customerId,
            names: names,
            emailAddress: emailAddress,
            address: address,
            phone: phone
        });

        alert('Customer details successfully updated');

        return customers;
    };


    customersService.getProfile = function ( customerId) {

        //Find the customer by id
        var customer = {};

        customer = [];

        angular.forEach(customers, function (value)
        {
            if (value['id'] == customerId)
            {
                customer = value;
            }
        });

        return customer;
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

    ordersService.create = function (customerId, title, auth_name, description, amount) {

        var id = orders.length + 1;

        orders.push(
            {
                id: id,
                customerId: customerId,
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


    ordersService.update = function (orderId, customerId, title, auth_name, description, amount) {

        //Find the Order to Edit
        var order = {};

        order = [];

        angular.forEach(orders, function (value)
        {
            if (value['id'] == orderId)
            {
                order = value;
            }
        });

        //Remove Order
        var index = orders.indexOf(order);

        orders.splice(index, 1);

        //Replace Order Data
        orders.push(
            {
                id: orderId,
                customerId: customerId,
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


        var index = orders.indexOf(order);

        orders.splice(index, 1);


        alert('Order successfully removed');

    };





    return ordersService;
}]);


