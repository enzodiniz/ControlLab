angular.module("ControlLab", ['ngRoute']) //ui-select
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/routes/home.html'
      })

      .when('/emprestimos', {
        templateUrl: 'app/routes/AddEmprestimo.html'
      })

      .when('/estoques', {
        templateUrl: 'app/routes/AddEstoque.html'
      })

      .when('/login', {
        templateUrl: 'app/routes/login.html'
      })

      .otherwise({
        redirectTo: '/home'
      })
  })
