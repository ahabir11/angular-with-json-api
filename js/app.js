var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home',{
            url:'/home',
            templateUrl: 'pages/partial-home.html'            
        })

        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'pages/partial-home-list.html',
            controller: function($scope, $http) {
                /*$scope.dogs = [{'id':1, 'name':'Bernese'},{'id':2, 'name':'Husky'},{'id':3, 'name':'Bernese'},{'id':4, 'name':'Husky'}];
                $scope.title = "My pet dog names";*/

                $http({
                  method: 'GET',
                  url: 'https://api.edmunds.com/api/vehicle/v2/makes?state=new&fmt=json&api_key=cct5ksms2x6vt3gnry3ff6r9'
                }).then(function successCallback(response) {
                    $scope.datas = response.data;         
                    console.log(response);          
                  }, function errorCallback(response) {
                    console.log('error');
                  });



            }
        })

        // Details show
        .state('dogDescription', {
            url: '/dog/:dogId/:dogPlace',
            templateUrl: 'pages/partial-details.html',
            controller: function($scope, $stateParams) {

                $scope.id = $stateParams.dogId;
                $scope.location = $stateParams.dogPlace;  

                $scope.title = 'Dog Details at '+ $scope.location;

            }
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'pages/partial-about.html' },

                // the child views will be defined here (absolutely named)
                'columnOne@about': { template: 'Look I am a column!' },

                // for column two, we'll define a separate controller 
                'columnTwo@about': { 
                    templateUrl: 'pages/table-data.html',
                    controller: 'scotchController'
                }
            }
            
        })

        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'pages/form/form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.profile', {
            url: '/profile',
            templateUrl: 'pages/form/form-profile.html'
        })
        
        // url will be /form/interests
        .state('form.interests', {
            url: '/interests',
            templateUrl: 'pages/form/form-interests.html'
        })
        
        // url will be /form/payment
        .state('form.payment', {
            url: '/payment',
            templateUrl: 'pages/form/form-payment.html'
        });

        }); // closes $routerApp.config()


        // let's define the scotch controller that we call up in the about state
        routerApp.controller('scotchController', function($scope) {
            
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
            
        })
        .controller('formController', function($scope) {
    
            // we will store all of our form data in this object
            $scope.formData = {};
            
            // function to process the form
            $scope.processForm = function() {
                alert('awesome!');
            };
            
        });