angular.module('bensethApp')
  .factory('Resource', function ($resource) {
    // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
    return function (url, params, methods) {
      var defaults = {
        update: { method: 'put', isArray: false},
        create: { method: 'post'}
      };

      methods = angular.extend(defaults, methods);

      var resource = $resource(url, params, methods);

      resource.prototype.$save = function() {
        if (!this._id) {
          return this.$create();
        } else {
          return this.$update({id: this._id});
        }
      };

      return resource;
    };
  })
  .factory('Auth', function (UserService, $http) {
   
    return {
      login: function (user) {
        return $http.post('/login', user, function (user){
          UserService.setCurrentUser(user);
        });
      },
      logout: function () {
        return $http.delete('/logout', function (res) {
          UserService.setCurrentUser(null);
        });
      },
      currentUser: UserService.getCurrentUser()
    }

  })
  .service('UserService', function ($cookieStore) {

    var loggedIn = false;
    var currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');


    var isLoggedIn = function () {
      return loggedIn;
    };

    var setCurrentUser = function (user) {
      currentUser = user;
    };

    var getCurrentUser = function () {
      return currentUser;
    };

    return {
      isLoggedIn: isLoggedIn,
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser,
    }
  })
  .factory('PurchaseOrder', ['Resource', function ($resource) {
    return $resource('/purchase-order/:id',{id: '@id'},{});
  }])
  .factory('User', ['Resource', function ($resource) {
    return $resource('/user/:id',{id: '@id'},{});
  }])
  .factory('Product', ['Resource', function ($resource) {
    return $resource('/product/:id',{id: '@id'},{});
  }])
  .factory('Supply', ['Resource', function ($resource) {
    return $resource('/supply/:id',{id: '@id'},{});
  }])
  .factory('Supplier', ['Resource', function ($resource) {
    return $resource('/supplier/:id',{id: '@id'},{});
  }])
  .factory('Order', ['Resource', function ($resource) {
    return $resource('/order/:id',{id: '@id'},{});
  }])
  .factory('Log', ['Resource', function ($resource) {
    return $resource('/access/:id',{id: '@id'},{});
  }]);

