angular.module("ControlLab", ['ngRoute', 'ui.select']) //ui-select
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/routes/home.html'
      })

      .when('/emprestimos', {
        templateUrl: 'app/routes/AddEmprestimo.html'
      })

      .when('/addUsuario', {
        // templateUrl: 'app/routes/addUsuario.html'
        templateUrl: 'app/routes/addUsuario (Conflitos entre maiúsculas e minúsculas).html'
      })

      .when('/addGrupo', {
        templateUrl: 'app/routes/addGrupo.html'
      })

      .when('/addLoja', {
        templateUrl: 'app/routes/addLoja.html'
      })

      .when('/addLocal', {
        templateUrl: 'app/routes/addLocal.html'
      })

      .when('/recursos', {
        templateUrl: 'app/routes/recurso.html'
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
