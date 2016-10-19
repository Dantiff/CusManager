var jwt = angular.module('jwt', ['ui.router']);

jwt.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
    
        .state('home', {
            url: '/home',
            templateUrl: 'partials/home.html'
        })
        
        .state('home.list', {
        url: '/list',
        templateUrl: 'partials/list.html',
        controller: function($scope) {
            $scope.laptops = ['Acer Aspire Series', 'Apple MacBook', 'HP ElliteBook', 'Lenovo X Series', 'Samsung', 'Chrome Book'];
        }
        })

  
        .state('home.paragraph', {
            url: '/paragraph',
            template: '<h3> <strong> Simple Angular Text </strong> </h3> </br> Angular has become soo interesting to learn and use. The situation is this, I am trying to use a PHP connection to connect my MySQL Database which is on phpmyadmin.'
        })

        .state('home.form', {
            url: '/form',
            templateUrl: 'partials/form.html'
        })
        .state('home.register', {
            url: '/register',
            templateUrl: 'partials/register.html'
        })
        .state('home.login', {
            url: '/login',
            templateUrl: 'partials/login.html'
        })

        .state('about', {
        url: '/about',
        views: {

            
            '': { templateUrl: 'partials/about.html' },

           
            'columnOne@about': { template: 'The first column in the footer!' },

           
            'columnTwo@about': { 
                templateUrl: 'table-data.html',
                controller: 'scotchController'
            }
        }
        
    });

}); 



jwt.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});

// Associate the $state variable with $rootScope in order to use it with any controller
jwt.run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});


jwt.controller('indexController', function ($scope, $log) {

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

angular.module('jwt').controller('formCtrl', function($scope) {
  $scope.master = {};

  $scope.update = function(user) {
  $scope.master = angular.copy(user);
                        };
$scope.reset = function() {
$scope.user = angular.copy($scope.master);
};
$scope.reset();
});


//The login/register controller
jwt.constant('API', 'http://test-routes.herokuapp.com');

jwt.config(function($httpProvider)
{
    
    $httpProvider.interceptors.push('jwtInterceptor');
});

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

jwt.factory('auth', function($http, API, $window){
    var auth = {};

    auth.register = function (username, password)
    {
        $http.post(API+'/auth/register', {username: username, password: password})
        .then(function(response){
            alert('user registered, Proceed to login');

        }, function(response)
        {
            alert('PLease use a different username/password combination');
        });
    };

    auth.getToken = function()
    {
        return $window.localStorage.getItem('token');
    };

    auth.login = function(username, password)
    {
        $http.post(API+'/auth/login', {username: username, password: password})
        .then(function(response){
            $window.localStorage.setItem('token', response.data.token);

            $state.go("home.list");

        }, function(response)
        {
            alert('Plese use correct username/password combination');
        });
    };

     auth.logout = function()
     {
         $window.localStorage.removeItem('token');
         alert('Successfully logged out');
     };

    return auth;    
});


jwt.controller('MainCtrl', function($scope, auth, API, $http, $log){


    $scope.login = function(){
        auth.login($scope.username, $scope.password);

        // $scope.$state.go("home.paragraph");
    };

    $scope.register = function()
    {
        auth.register($scope.username, $scope.password);

        $scope.$state.go("home.login");
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






