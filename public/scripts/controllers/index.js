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
  .controller('PurchaseOrderCtrl', function ($scope, purchaseOrders, PurchaseOrder, Order) {
    
    $scope.purchaseOrder = {};
    $scope.purchaseOrders = purchaseOrders;

    // purchaseOrder items
    $scope.order = {};
    $scope.orders = [];

    // purchaseOrder supplier
    $scope.supplier = {};

    $scope.purchaseOrderCreate = function () {
      PurchaseOrder.save({}, $scope.purchaseOrder).$promise.then(function (purchaseOrder) {
        $scope.purchaseOrders.push(purchaseOrder);
      });
    };

    $scope.purchaseOrderIssue = function (id) {
      PurchaseOrder.get({id: id}).$promise.then(function (purchaseOrder){
        purchaseOrder.$issue();
      });
    };

    $scope.purchaseOrderDelete = function (index) {
      var po = $scope.purchaseOrders[index];
      po.$delete().$promise.then(function () {
        $scope.purchaseOrders.splice(index, 1);
      });
    };

    $scope.orderItemAdd = function () {
      $scope.order.poId = $scope.purchaseOrder.id;
      Order.save({}, $scope.order).$promise.then(function (order) {
        $scope.orders.push(order);
        $scope.order = {};
      })
    };

    $scope.orderItemRemove = function (index) {
      var order = $scope.orders[index];
      Order.delete({id: order.id}).$promise.then(function () {
        $scope.orders.splice(index, 1);
      });
    };


  });
