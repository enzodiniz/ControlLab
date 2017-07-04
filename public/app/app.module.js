angular.module("ControlLab", ['ngRoute']) //ui-select
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'routes/home.html'
      })

      .otherwise({
        redirectTo: '/home'
      })
  })
