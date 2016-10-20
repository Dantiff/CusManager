//
//
// var jwt = angular.module('jwt');
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
// jwt.controller('MainCtrl', function($scope, auth, API, $http, $log){
//
//
//     $scope.login = function(){
//         auth.login($scope.username, $scope.password);
//
//         // $scope.$state.go("home.paragraph");
//     };
//
//     $scope.register = function()
//     {
//         auth.register($scope.username, $scope.password);
//
//         // $scope.$state.go("home.login");
//     }
//
//     $scope.logout = function()
//     {
//         auth.logout();
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
//     }
//
// });
