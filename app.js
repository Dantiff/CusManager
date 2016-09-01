var jwt = angular.module('jwt', ['ui.router']);

jwt.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
    
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        
        .state('home.list', {
        url: '/list',
        templateUrl: 'list.html',
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
            templateUrl: 'form.html'
        })
        .state('home.jwt', {
            url: '/jwt',
            templateUrl: 'jwt.html'
        })

        .state('about', {
        url: '/about',
        views: {

            
            '': { templateUrl: 'about.html' },

           
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
                auth.logout = function()
                    {
                        $window.localStorage.removeItem('token');
                    };

        }, function(response)
        {
            alert('Plese use correct username/password combination');
        });
    };



    return auth;    
});

jwt.controller('MainCtrl', function($scope, auth, API, $http){

    $scope.login = function(){
        auth.login($scope.username, $scope.password);
    };

    $scope.register = function()
    {
        auth.register($scope.username, $scope.password);
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






