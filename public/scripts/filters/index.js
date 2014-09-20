angular.module('bensethApp')
  .filter('dateToISO', function () {
    return function(input) {
      if (!input) {
        return 'n/a';
      } else {
        input = new Date(input).toISOString();
        return input;
      }
    }; 
  });
