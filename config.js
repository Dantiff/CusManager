var jwt = angular.module('jwt', [
    'ui.router',
    'LocalStorageModule'
]);

jwt.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    'use strict';

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        /**
         * Home
         */
        .state('home', {
            url: '/home',
            templateUrl: 'app/partials/home.html'
        })

        .state('home.paragraph', {
            url: '/paragraph',
            template: '<h3> <strong> Simple Angular Text </strong> </h3> </br> Angular has become soo interesting to learn and use. The situation is this, I am trying to use a PHP connection to connect my MySQL Database which is on phpmyadmin.'
        })

        /**
         * Users
         */
        .state('home.profile', {
            url: '/profile',
            templateUrl: 'partials/profile.html'
        })

        .state('home.register', {
            url: '/register',
            templateUrl: 'app/partials/register.html'
        })
        .state('home.login', {
            url: '/login',
            templateUrl: 'app/partials/login.html'
        })


        /**
         * Customers
         */

        .state('customers', {
            url: '/customers',
            templateUrl: 'app/customers/allCustomers.html'
        })

        .state('customers.allCustomers', {
            url: '/allcustomers',
            templateUrl: 'app/customers/allCustomers.html'
        })

        .state('customers.addCustomer', {
            url: '/addcustomers',
            templateUrl: 'app/customers/addCustomer.html',
            controller: function($scope) {
                $scope.laptops = ['Acer Aspire Series', 'Apple MacBook', 'HP ElliteBook', 'Lenovo X Series', 'Samsung', 'Chrome Book'];
            }
        })

        .state('customers.viewCustomer', {
            url: '/customers',
            templateUrl: 'app/customers/view_customer.html'
        })


        /**
         * Orders
         */
        .state('orders', {
            url: '/orders',
            templateUrl: 'app/orders/allOrders.html'
        })


        .state('orders.allOrders', {
            url: '/allOrders',
            templateUrl: 'app/orders/allOrders.html'
        })


        .state('orders.addOrder', {
            url: '/addOrder',
            templateUrl: 'app/orders/addOrder.html'
        })

        /**
         * About Page
         */
        .state('home.about', {
            url: '/about',
            templateUrl: 'app/partials/about.html'
        });

    }])


    /**
     * Configure local storage module
     */
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('myApp')
            .setStorageType('sessionStorage')
            .setNotify(true, true)
    }]);


//
//
// /**
//  * JWT service
//  */
// jwt.constant('API', 'http://test-routes.herokuapp.com');
//
// jwt.config(function($httpProvider)
// {
//
//     $httpProvider.interceptors.push('jwtInterceptor');
// });
//
// /**
//  * Capture jwt token and check authenticity during login jwtServices
//  */
// jwt.factory('jwtInterceptor', function($window){
//     return {
//         request: function(config)
//         {
//             var token = $window.localStorage.getItem('token');;
//
//
//             config.headers.Authorization = 'Bearer ' + token;
//             return config;
//
//         }
//
//     };
// });
//
//
// /**
//  * Sessions Service: JWT for register, login, logout
//  */
//
// jwt.factory('auth', ['$http', 'API', '$window', function($http, API, $window){
//     var auth = {};
//
//
//     auth.register = function (username, password, onSuccess, onError)
//     {
//         $http.post(API+'/auth/register',
//             {
//                 username: username,
//                 password: password
//             })
//             .then(function(response) {
//
//                 $window.localStorage.setItem('token', response.data.token);
//                 onSuccess(response);
//
//             }, function(response) {
//
//                 onError(response);
//
//             });
//     };
//
//     auth.getCurrentToken = function()
//     {
//         return $window.localStorage.getItem('token');
//     };
//
//
//     auth.checkIfLoggedIn = function()
//     {
//         if($window.localStorage.getItem('token'))
//             return true;
//         else
//             return false;
//     };
//
//     auth.login = function(username, password, onSuccess, onError)
//     {
//         $http.post(API+'/auth/login',
//             {
//                 username: username,
//                 password: password
//             })
//             .then(function(response){
//
//                 $window.localStorage.setItem('token', response.data.token);
//                 onSuccess(response);
//
//             }, function(response) {
//
//                 onError(response);
//
//             });
//
//     };
//
//     auth.logout = function()
//     {
//         $window.localStorage.removeItem('token');
//     };
//
//     return auth;
// }]);
//
//
//
// /**
//  * Associate the $state variable with $rootScope in order to use it with any controller
//  */
// jwt.run(function ($rootScope, $state, $stateParams) {
//     $rootScope.$state = $state;
//     $rootScope.$stateParams = $stateParams;
// });
//
//
//
// /**
//  * Sessions controller: Check Login
//  */
// jwt.controller('indexCtrl', function ($scope, $log) {
//
//     /* Check if the user is logged prior to use the next code */
//
//     if (!isLoggedUser) {
//         $log.log("user not logged, redirecting to Login view");
//         // Redirect to Login view
//         $scope.$state.go("home.login");
//     } else {
//         // Redirect to dashboard view
//         $scope.$state.go("orders");
//     }
//
// });
//
// /**
//  * Sessions Controller: Register, login, logout
//  */
// jwt.controller('MainCtrl', ['$scope', 'auth', 'API', '$http', '$location', function($scope, auth, API, $http, $location){
//
//
//     $scope.login = function()
//     {
//         auth.login(
//             $scope.username, $scope.password,
//             function (response) {
//
//                 $location.path('/orders');
//             },
//             function(response){
//
//                 alert('Wrong username/password combination! Please check and try again.');
//             }
//         );
//     };
//
//     $scope.register = function()
//     {
//         auth.register(
//             $scope.username, $scope.password,
//             function (response) {
//
//                 alert('Great! You are now signed in! Welcome, ' + $scope.username + '!');
//
//                 $location.path('/home/login');
//             },
//             function(response){
//
//                 alert('Username already taken! Please use a different username/password combination');
//             }
//
//
//         );
//     };
//
//     $scope.logout = function()
//     {
//         auth.logout();
//
//         $location.path('/home/login');
//
//     };
//
//     $scope.getQuote = function()
//     {
//         $http.get(API + '/auth/quote')
//             .then(function(response){
//                 $scope.quote = response.data.message;
//             }, function(){
//
//             });
//     };
//
//
//     $scope.username = '';
//     $scope.password = '';
//
//     if(auth.checkIfLoggedIn())
//         $location.path('/home');
//
// }]);
//
//
// /**
//  * News Articles Controller
//  */
// jwt.controller('articleCtrl', function($scope, pageSize) {
//     $scope.articles = [
//         { title: "Arduino Tutorial" },
//         { title: "After Effects Tutorial" },
//         { title: "Django Tutorial" },
//         { title: "Angular Tutorial" },
//         { title: "Laravel Tutorial" }
//
//
//     ];
//
//     $scope.numArticles = pageSize;
// });
// jwt.value('pageSize', 4);
//
//
// /**
//  * Orders Controller
//  */
// jwt.controller('ordersCtrl', ['$scope', '$location', 'auth',  function ($scope, $location, auth) {
//
//     $scope.create = function (response)
//     {
//         alert('You have created a new order');
//     };
//
//     $scope.update = function(response)
//     {
//         alert('You have updated order details');
//     };
//
//     $scope.checkIfLoggedIn = function () {
//
//         auth.checkIfLoggedIn();
//     };
//
//
//     $scope.username = '';
//     $scope.password = '';
//
//     if(!auth.checkIfLoggedIn())
//     {
//         $location.path('/home');
//     }
//
//
// }]);
//


