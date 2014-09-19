angular
  .module('bensethApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'http-auth-interceptor'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    // home

    $stateProvider
      .state('home', {
        abstract: true,
        templateUrl: '/views/home.html'
      })
      .state('home.splash', {
        url: '',
        templateUrl: '/views/splash.html'
      })
      .state('home.auth', {
        url: '/login',
        templateUrl: '/views/login.html'
      });

  });