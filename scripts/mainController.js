

var jwtControllers = angular.module('jwtControllers', [
    'jwtServices'
]);

/**
 * Associate the $state variable with $rootScope in order to use it with any controller
 */
jwtControllers.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

/**
 * Sessions controller: Check Login
 */
jwtControllers.controller('indexCtrl', function ($scope, $log) {

    /* Check if the user is logged prior to use the next code */

    if (!isLoggedUser) {
        $log.log("user not logged, redirecting to Login view");
        // Redirect to Login view
        $scope.$state.go("home.login");
    } else {
        // Redirect to dashboard view
        $scope.$state.go("home.list");
    }

});

/**
 * Sessions Controller: Register, login, logout
 */
jwtControllers.controller('MainCtrl', function($scope, auth, API, $http, $log){


    $scope.login = function(){
        auth.login($scope.username, $scope.password);

        // $scope.$state.go("home.paragraph");
    };

    $scope.register = function()
    {
        auth.register($scope.username, $scope.password);

        // $scope.$state.go("home.login");
    }

    $scope.logout = function()
    {
        auth.logout();
    };

    $scope.getQuote = function()
    {
        $http.get(API + '/auth/quote')
            .then(function(response){
                $scope.quote = response.data.message;
            }, function(){

            });
    }

});


/**
 * News Articles Controller
 */
jwtControllers.controller('articleCtrl', function($scope, pageSize) {
    $scope.articles = [
        { title: "Arduino Tutorial" },
        { title: "After Effects Tutorial" },
        { title: "Django Tutorial" },
        { title: "Angular Tutorial" },
        { title: "Laravel Tutorial" }


    ];

    $scope.numArticles = pageSize;
});
jwtControllers.value('pageSize', 4);


