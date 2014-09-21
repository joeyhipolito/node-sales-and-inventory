angular.module('bensethApp')
  .controller('AuthCtrl', function ($scope, authService, $location) {
    
    $scope.user = null;

    $scope.login = function() {
      authService.login($scope.user).success(function(){
        $scope.user = null;
        $location.path('/admin');
      });
    };

    $scope.logout = function() {
      authService.logout();
    };
    
  })
  .controller('SupplierCtrl', function ($scope, suppliers, Supplier) {

    $scope.suppliers = suppliers;

    $scope.create = function () {
      Supplier.save({}, $scope.supplier).$promise.then(function (supplier) {
        $scope.suppliers.splice(0, 0, supplier);
        $scope.supplier = {};
      });
    };

  })
  .controller('SupplierDetailCtrl', function ($scope, supplier) {

    var temp = null;
    $scope.supplier = supplier;


    $scope.update = function () {
      $scope.supplier.$save();
      $scope.toggle();
    };

    $scope.cancel = function() {
      $scope.supplier = angular.copy(temp);
      $scope.toggle();
    };

    $scope.toggle = function() {
      temp = angular.copy($scope.supplier);
      $scope.toUpdate = !$scope.toUpdate;
    };

  })
  .controller('ProductCtrl', function ($scope, products, Product) {

    $scope.products = products;

  })
  .controller('PurchaseOrderCreateCtrl', function ($scope, $stateParams, suppliers, Supplier, Product, PurchaseOrder) {
    $scope.order = {};
    $scope.purchaseOrder = {};
    $scope.purchaseOrders = [];
    $scope.supplier = {};
    $scope.suppliers = suppliers;

    if ($stateParams.supplier_id) {
      Supplier.get({id: $stateParams.supplier_id}).$promise.then(function (supplier) {
        $scope.supplier = supplier;
      });
    };

    Product.query().$promise.then(function (products) {
      $scope.products = products;
    });


    $scope.orderCreate = function() {
      $scope.purchaseOrder.orders.push($scope.order);
      $scope.order = {};
    };

    $scope.orderDelete = function(index) {
      $scope.purchaseOrder.orders.splice(index, 1);

    };

    $scope.purchaseOrderIssue = function () {
      $scope.purchaseOrder.$save().then(function () {
        $scope.purchaseOrder = {};
      });
    };

    $scope.purchaseOrderCreate = function () {
      $scope.purchaseOrder = new PurchaseOrder();
      $scope.purchaseOrder.supplier = $scope.supplier._id;
      $scope.purchaseOrder.$save();
    };

  })
  .controller('PurchaseOrderCtrl', function ($scope, PurchaseOrder) {
    $scope.purchaseOrders = [];
    PurchaseOrder.query().$promise.then(function (purchaseOrders) {
      $scope.purchaseOrders = purchaseOrders;
    });
    
  });
