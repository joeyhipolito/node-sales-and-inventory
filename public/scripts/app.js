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
        url: '/',
        templateUrl: '/views/splash.html'
      })
      .state('home.auth', {
        url: '/login',
        templateUrl: '/views/login.html'
      });

    $stateProvider
      .state('dashboard', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('dashboard.admin', {
        url: '/admin',
        templateUrl: 'views/admin.html'
      })

    $stateProvider
      .state('purchase_order', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('purchase_order.view', {
        url: '/purchase_order',
        templateUrl: 'views/purchase_order.html'
      })
      .state('purchase_order.create', {
        abstract: true,
        url: '/purchase_order/create?supplier_id',
        templateUrl: 'purchase_order.create.html'
      })
      .state('purchase_order.create.suppliers_list', {
        url: '',
        templateUrl: 'purchase_order.create.suppliers_list.html'
      })
      .state('purchase_order.create.verify', {
        url: '/verify_supplier',
        templateUrl: 'purchase_order.create.verify_supplier.html'
      })
      .state('purchase_order.create.order', {
        url: '/issue_order',
        templateUrl: 'purchase_order.create.issue_order.html'
      });

    $stateProvider
      .state('supplier', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('supplier.list', {
        url: '/supplier',
        templateUrl: 'views/supplier.html'
      })
      .state('supplier.detail', {
        url: '/supplier/:id',
        templateUrl: 'views/supplier.detail.html'
      });


  });