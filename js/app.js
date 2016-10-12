'use strict';

/* App Module
*
* controlling routing
* Author: Fei Wu
*
* */

var app = angular.module('myApp', ['ngRoute', 'pascalprecht.translate', 'mgcrea.ngStrap', 'angular-loading-bar', 'ngAnimate']);

app.config(function(
    $routeProvider,
    LanguageProvider,
    $locationProvider
) {
    $routeProvider
        .when('/',{
            controller: 'QuestionController',
            templateUrl: 'templates/create-mailing.html'
        })
        .when('/login',{
            controller: 'LoginController',
            templateUrl: 'templates/login.html'
        })
        .otherwise({
            redirectTo: '/'
        });

    // translation
    LanguageProvider.setLang();

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

});