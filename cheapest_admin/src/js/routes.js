'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
         .state('produits', {
                url: '/produits',
                templateUrl: 'templates/produits.html'
            })
        
        .state('addProduct', {
                url: '/addProduct',
                templateUrl: 'templates/addProduct.html'
            })
        
        
         .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html'
            })
        
        .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html'
            })
        .state('Demandeproduits', {
                url: '/Demandeproduits',
                templateUrl: 'templates/Demandeproduits.html'
            })
        ;
    }
]);