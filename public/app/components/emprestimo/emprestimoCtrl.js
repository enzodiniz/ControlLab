angular
  .module("ControlLab")
  .controller('empCtrl', function($scope, $location, authSvc, empSvc, matSvc) {

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
      empSvc.emprestar(self.mat, self.resp, self.dt)
        .then((res) => {
          self.obterEmprestimos();
        })
    }

    // TODO: implementar função de erro.
    //recuperar todos os empréstimos.
    self.obterEmprestimos = () => {
      empSvc.getEmprestimos()
        .then(function (res) {
          //recuperar pelo matCtrl o nome dos materiais
          self.emprestimos = res.data.result;

          //varrer os empréstimos
          for (var e = 0; e < self.emprestimos.length; e++) {
            self.materiais = self.emprestimos[e].materiais;
            //iterar sobre os materiais de cada empréstimo
            for (var m = 0; m < self.materiais.length; m++) {
              let i = m;
              matSvc.obterMaterial(self.materiais[m])
                .then((res) => {
                  console.log("m: "+ i);
                  self.materiais[i] = res.data.result.descricao;
                  console.log("materiais: " + self.materiais);
                }, (err) => {
                  
                })

            }
            //console.log("materiais: " + self.materiais);
            console.log("e: " + e);
            self.emprestimos[e].materiais = self.materiais; 
          }
        }, function (err) {
      
        })
    }

    self.refreshMaterials = function (query) {
      matSvc.getMaterials(query)
        .then((res) => {
          console.log(res);
          self.mats = res.data.result;
        })
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
