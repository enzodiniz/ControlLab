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
          self.obterEmprestimos();
          $rootScope.$broadcast('evento', {
            alerta: 'success',
            mensagem: 'Material emprestado com sucesso.'
          })
          self.resp = undefined;
          self.mat = undefined;
          self.adicionando = false;
        }, (err) => {
          $rootScope.$broadcast('evento', {
            alerta: 'erro',
            mensagem: 'Erro ao emprestar o material.'
          })
        })
    }

    self.removerEmp = function (id) {
      empSvc.removerEmp(id)
        .then((res) => {
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

    //recuperar todos os empréstimos.
    self.obterEmprestimos = () => {
      empSvc.getEmprestimos()
        .then(function (res) {
          self.emprestimos = res.data.result;
          console.log(self.emprestimos);

          //varrer os empréstimos
          for (var e = 0; e < self.emprestimos.length; e++) {
            self.materiais = self.emprestimos[e].materiais;
            //iterar sobre os materiais de cada empréstimo
            for (var m = 0; m < self.materiais.length; m++) {
              let i = m;
              matSvc.obterMaterial(self.materiais[i])
                .then((res) => {
                  console.log("m: "+ i);
                  self.materiais[i] = res.data.result.descricao;
                  console.log("descricao: " + res.data.result.descricao);
                  console.log("materiais: " + self.materiais);
                }, (err) => {
                  
                })

            }
            console.log("materiais: " + self.materiais);
            self.emprestimos[e].materiais = self.materiais; 
          }
        }, function (err) {
      
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
