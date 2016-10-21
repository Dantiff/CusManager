

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

                $location.path('/orders');
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

                $location.path('/home/login');
            },
            function(response){

                alert('Username already taken! Please use a different username/password combination');
            }


        );
    };

    $scope.logout = function()
    {
        auth.logout();

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
 * Orders Controller
 */
jwt.controller('ordersCtrl', ['$scope', '$location', 'auth',  function ($scope, $location, auth) {

    $scope.create = function (response)
    {
        alert('You have created a new order');
    };

    $scope.update = function(response)
    {
        alert('You have updated order details');
    };

    $scope.checkIfLoggedIn = function () {

        auth.checkIfLoggedIn();
    };


    $scope.username = '';
    $scope.password = '';


    if(!auth.checkIfLoggedIn())
    {
        $location.path('/home/login');
    }

}]);

