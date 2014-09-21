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
        templateUrl: '/views/login.html',
        controller: 'AuthCtrl'
      });

    $stateProvider
      .state('dashboard', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('dashboard.admin', {
        url: '/admin',
        templateUrl: 'views/admin.html'
      });

    $stateProvider
      .state('purchase_order', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
        // resolve: {
        //   purchaseOrders: function(PurchaseOrder) {
        //     return PurchaseOrder.query();
        //   }
        // },
        // controller: 'PurchaseOrderCtrl'
      })
      .state('purchase_order.view', {
        url: '/purchase_order',
        templateUrl: 'views/purchase_order.html'
      })
      .state('purchase_order.create', {
        abstract: true,
        url: '/purchase_order/create?supplier_id',
        templateUrl: 'views/purchase_order.create.html'
      })
      .state('purchase_order.create.suppliers_list', {
        url: '',
        templateUrl: 'views/purchase_order.create.suppliers_list.html'
      })
      .state('purchase_order.create.verify', {
        url: '/verify_supplier',
        templateUrl: 'views/purchase_order.create.verify_supplier.html'
      })
      .state('purchase_order.create.order', {
        url: '/issue_order',
        templateUrl: 'views/purchase_order.create.issue_order.html'
      });

    $stateProvider
      .state('supplier', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('supplier.list', {
        url: '/supplier',
        templateUrl: 'views/supplier.html',
        resolve: {
          suppliers: function (Supplier) {
            return Supplier.query().$promise;
          }
        },
        controller: 'SupplierCtrl'
      })
      .state('supplier.detail', {
        url: '/supplier/:id',
        templateUrl: 'views/supplier.detail.html',
        resolve: {
          supplier: function ($stateParams, Supplier) {
            var id = $stateParams.id;
            return Supplier.get({id: id}).$promise;
          }
        },
        controller: 'SupplierDetailCtrl'
      });

    $stateProvider
      .state('supply', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('supply.control', {
        url: '/supply',
        templateUrl: 'views/supply.html'
      });

    $stateProvider
      .state('order', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('order.control', {
        url: '/order',
        templateUrl: 'views/order.html'
      })
      .state('order.receive', {
        url: '/order/receive',
        templateUrl: 'views/order.receive.html'
      });

    $stateProvider
      .state('product', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('product.control', {
        url: '/product',
        templateUrl: 'views/product.html',
        resolve: {
          products: function (Product) {
            return Product.query();
          }
        },
        controller: 'ProductCtrl'
      });

    $stateProvider
      .state('user', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('user.control', {
        url: '/user',
        templateUrl: 'views/user.html'
      })
      .state('user.detail', {
        url: '/user/:id',
        templateUrl: 'views/user.detail.html'
      });

  });