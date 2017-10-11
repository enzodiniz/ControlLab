angular
  .module("ControlLab")
  .controller('empCtrl', function($scope, $location, $rootScope, authSvc, empSvc, matSvc, userSvc, gpSvc) {

    var self = this;

    self.emprestimos = [];
    self.mats = [];
    self.adicionando = false;

    self.mostrarForm = function () {
      if (self.adicionando)
        self.adicionando = false;
      else
        self.adicionando = true;
    }

    self.emprestar = function () {
      empSvc.emprestar(self.mat, self.resp[0]._id, self.dt)
        .then((res) => {
          console.log(self.resp[0]._id);
          self.getEmprestimos();
          $rootScope.$broadcast('evento', {
            alerta: 'success',
            mensagem: 'Material emprestado com sucesso.'
          })
          self.resp = []; 
          self.mat = undefined;
          self.mostrarForm();
        }, (err) => {
          $rootScope.$broadcast('evento', {
            alerta: 'erro',
            mensagem: 'Erro ao emprestar o material.'
          })
        })
    }

    self.removerEmp = function () {
      empSvc.removerEmp(self.id)
        .then((res) => {
          self.getEmprestimos();
          self.excluindo = false;
          $rootScope.$broadcast('evento', {
            alerta: 'success',
            mensagem: 'Emprestimo removido com sucesso.'
          })
          self.obterEmprestimos();
        }, (err) => {
          $rootScope.$broadcast('evento', {
            alerta: 'erro',
            mensagem: 'Falha ao remover empréstimo.'
          })
        })
    }

    self.mostrarExcluir = function (id) {
      self.setId(id);
      if (self.excluindo) {
        self.excluindo = false;
      } else {
        self.excluindo = true;
      }
    }

    //recuperar todos os empréstimos
    self.getEmprestimos = function () {
      empSvc.getEmprestimos()
        .then((res) => {
          self.emprestimos = res.data.result;
          console.log(self.emprestimos);
        }, (err) => {
          $rootScope.$broadcast('evento', {
            alerta: 'erro',
            mensagem: 'Falha ao obter os empréstimos.'
          })
        })
    }

    self.refreshMaterials = function (query) {
      matSvc.getMaterials(query)
        .then((res) => {
          self.mats = res.data.result;
        })
    }

    self.refreshResponsible = function (query) {
      userSvc.getUsers(query)
        .then((res) => {
          self.users = res.data.result;
        })

      // gpSvc.getGroups(query)
      //   .then((res) => {
      //     self.users += res.data.result;
      //   })  
    }

    self.setId = function (id) {
      self.id = id;
    }

    //ação do botão 'sair' da barra de navegação.
    self.sair = function () {
      authSvc.logout();
    }

    //ação do botão 'início' da barra de navegação.
    self.redirHome = function () {
      $location.path('/home');
    }

    if (!authSvc.isAuthed()){
      $location.path('/login');
    }
  })
