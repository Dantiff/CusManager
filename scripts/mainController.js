

/**
 * Associate the $state variable with $rootScope in order to use it with any controller
 */
jwt.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});



/**
 * Sessions controller: Check Login
 */
jwt.controller('indexCtrl', function ($scope, $log) {

    /* Check if the user is logged prior to use the next code */

    if (!isLoggedUser) {
        $log.log("user not logged, redirecting to Login view");
        // Redirect to Login view
        $scope.$state.go("home.login");
    } else {
        // Redirect to dashboard view
        $scope.$state.go("orders");
    }

});

/**
 * Sessions Controller: Register, login, logout
 */
jwt.controller('MainCtrl', ['$scope', 'auth', 'API', '$http', '$location', function($scope, auth, API, $http, $location){


    $scope.login = function()
    {
        auth.login(
            $scope.username, $scope.password,
            function (response) {

                $location.path('/allOrders');
            },
            function(response){

                alert('Wrong username/password combination! Please check and try again.');
            }
        );
    };

    $scope.register = function()
    {
        auth.register(
            $scope.username, $scope.password,
            function (response) {

                alert('Great! You are now signed in! Welcome, ' + $scope.username + '!');

                $location.path('allOrders');
            },
            function(response){

                alert('Username already taken! Please use a different username/password combination');
            }


        );
    };

    $scope.logout = function()
    {
        auth.logout();

        alert('Logout Successful');

        $location.path('/home/login');

    };

    $scope.getQuote = function()
    {
        $http.get(API + '/auth/quote')
            .then(function(response){
                $scope.quote = response.data.message;
            }, function(response){
                alert('You must be logged in to access this service');
            });
    };


    $scope.checkIfLoggedIn = function () {

        if (auth.checkIfLoggedIn()){
            return true;
        }
        else {
            return false;
        }
    };


    $scope.username = '';
    $scope.password = '';

    if(!auth.checkIfLoggedIn())
    {
        $location.path('/home/login');
    }

}]);


/**
 * News Articles Controller
 */
jwt.controller('articleCtrl', function($scope, pageSize) {
    $scope.articles = [
        { title: "Arduino Tutorial" },
        { title: "After Effects Tutorial" },
        { title: "Django Tutorial" },
        { title: "Angular Tutorial" },
        { title: "Laravel Tutorial" }


    ];

    $scope.numArticles = pageSize;
});
jwt.value('pageSize', 4);




/**
 * Customers Controllers: All Customers Page
 */
jwt.controller('allCustomersCtrl', ['$scope', '$location', 'auth', 'customersService',  function ($scope, $location, auth, customersService) {


    $scope.showAll = function () {

        $scope.customers = customersService.showAll();

    };

}]);


/**
 * Customers Controllers
 */
jwt.controller('customersCtrl', ['$scope', '$location', 'auth', 'customersService', '$stateParams', function ($scope, $location, auth, customersService, $stateParams) {


    $scope.create = function ()
    {
        $scope.customers = customersService.create(
            $scope.currentCustomerNames,
            $scope.currentCustomerEmail,
            $scope.currentCustomerAddress,
            $scope.currentCustomerPhone
        );

        $location.path('/allCustomers');

    };


    $scope.showAll = function () {

        $scope.customers = customersService.showAll();

    };

    $scope.update = function ()
    {
        $scope.customerId = $stateParams.customerId;

        $scope.customers = customersService.update(
            $scope.customerId,
            $scope.currentCustomerNames,
            $scope.currentCustomerEmail,
            $scope.currentCustomerAddress,
            $scope.currentCustomerPhone
        );

        $location.path('/allCustomers');

    };


    $scope.remove = function (customer) {

        if(confirm('Are you sure to remove this customer from the system?')){

            customersService.remove(customer);

            $scope.showAll();
        }
    };




}]);






/**
 * Orders Controller
 */
jwt.controller('ordersCtrl', ['$scope', '$location', 'auth', 'ordersService', function ($scope, $location, auth, ordersService) {

    $scope.required = true;

    $scope.create = function ()
    {
        $scope.orders  = ordersService.create(
            $scope.currentOrderTitle,
            $scope.currentOrderAuthName,
            $scope.currentOrderDescription,
            $scope.currentOrderAmount
        );

        $location.path('allOrders');

        $scope.showAll();

    };


    $scope.showAll = function () {

        $scope.orders  = ordersService.showAll();

    };


    $scope.update = function ()
        {
            $scope.orders  = ordersService.update($scope.currentOrderId, {
                title: $scope.currentOrderTitle,
                auth_name: $scope.currentOrderAuthName,
                description: $scope.currentOrderDescription,
                amount: $scope.currentOrderAmount
            });

            $location.path('allOrders');

        };


    $scope.remove = function (order) {

        if(confirm('Are you sure to remove this order from your list?')){

            ordersService.remove(order);

            $scope.showAll();
        }
    };




    //
    // $scope.load = function(orderId){
    //
    //     ordersService.getById(orderId, function(response){
    //
    //         $scope.currentOrderId = response.order.id;
    //         $scope.currentOrderTitle = response.order.title;
    //         $scope.currentOrderAuthName = response.order.auth_name;
    //         $scope.currentOrderDescription = response.order.description;
    //         $scope.currentOrderAmount = response.order.amount;
    //
    //     }, function(){
    //
    //         alert('Some errors occurred while communicating with the service. Please try again later.');
    //
    //     });
    //
    // };
    //
    //
    //
    // $scope.update = function()
    // {
    //     $scope.update(
    //         $scope.currentOrderId,
    //         {
    //             title: $scope.currentOrderTitle,
    //             auth_name: $scope.currentOrderAuthName,
    //             description: $scope.currentOrderDescription,
    //             Amount: $scope.currentOrderAmount
    //         }, function (response) {
    //
    //             $scope.currentOrderReset();
    //             $scope.refresh();
    //
    //         }, function(response){
    //
    //             alert('Some errors occurred while communicating with the service. Please try again later.');
    //         }
    //     );
    //
    //     alert('You have updated order details');
    // };
    //
    //
    // $scope.remove = function () {
    //
    //     if(confirm('Are you sure to remove this order from your list?')){
    //         ordersService.remove(orderId, function(){
    //
    //             alert('Order removed successfully.');
    //
    //         }, function(){
    //
    //             alert('Some errors occurred while communicating with the service. Please try again later.');
    //
    //         });
    //     }
    // };
    //
    //
    // $scope.currentOrderReset = function(){
    //     $scope.currentOrderTitle = '';
    //     $scope.currentOrderAuthName = '';
    //     $scope.currentOrderDescription = '';
    //     $scope.currentOrderAmount= '';
    // }
    //
    // if(!auth.checkIfLoggedIn())
    //     $location.path('/login');
    //
    // $scope.orders = [];
    //
    // $scope.currentOrderReset();
    // $scope.refresh();
    //

}]);

