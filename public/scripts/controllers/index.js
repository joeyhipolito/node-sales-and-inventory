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
  .controller('DashboardCtrl', function ($scope, accessLogs, poLogs) {

    $scope.log = {};
    $scope.log.user = accessLogs;
    $scope.log.purchase = poLogs;

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
  .controller('PurchaseOrderCtrl', function ($scope, PurchaseOrder) {
    $scope.purchaseOrders = [];
    PurchaseOrder.query().$promise.then(function (purchaseOrders) {
      $scope.purchaseOrders = purchaseOrders;
    }); 
  })
  .controller('PurchaseOrderCreateCtrl', function ($scope, $stateParams, suppliers, Supplier, Product, PurchaseOrder, Order) {
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
      var order = new Order();
      order.purchase_order_id = $scope.purchaseOrder._id;
      order.product_id = $scope.order.product_id;
      order.product_name = $scope.order.product_name;
      order.quantity_ordered = $scope.order.quantity_ordered;
      order.$save().then(function (purchaseOrder) {
        $scope.purchaseOrder = purchaseOrder;
      });
      
    };

    $scope.orderDelete = function(index) {
      var order = $scope.purchaseOrder.orders[index];
      console.log(order);
      Order.delete({id: order.order_id}).$promise.then(function (res) {
        $scope.purchaseOrder.orders.splice(index, 1);
      });
      
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
  .controller('ReceiveOrderCtrl', function ($scope, purchaseOrders, Order) {
    $scope.purchaseOrder = null;
    $scope.purchaseOrders = purchaseOrders;
    
    $scope.today = new Date().toISOString().split('T')[0];

    $scope.receive = {};
    

    $scope.setSelectedPurchaseOrder = function (po) {
      $scope.purchaseOrder = po;
    };

    $scope.receiveOrder = function(index) {

      $scope.purchaseOrder.orders[index].quantity_received += $scope.receive.quantity_received;
      $scope.purchaseOrder.orders[index].expiration_date = $scope.receive.expiration_date;
      $scope.purchaseOrder.orders[index].unit_cost = $scope.unit_cost;
      $scope.receive = {};

      $scope.purchaseOrder.$save();
    };
  });