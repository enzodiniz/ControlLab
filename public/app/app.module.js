angular.module("ControlLab", ['ngRoute']) //ui-select
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        // templateUrl: 'app/routes/home.html'
        templateUrl: 'app/routes/Telaincial.html'
      })

      .when('/login', {
        templateUrl: 'app/routes/login.html'
      })

      .otherwise({
        redirectTo: '/home'
      })
  })
