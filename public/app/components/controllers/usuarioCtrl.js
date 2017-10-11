  angular
  .module("ControlLab")
  .controller('usuarioCtrl', usuarioCtrl)

function usuarioCtrl($scope, $http, userSvc, authSvc, $rootScope) {
  var self = this;

  self.admin = false;
  self.opcao = "false";
  self.editados = [];

  self.addUser = function () {
    if (self.opcao == "true")
      self.adm = true;
    else if (self.opcao == "false")
      self.adm = false;

    userSvc.addUser(self.pri, self.ult, self.email, self.userName, self.senha, self.mat, self.adm)
      .then((res) => {

          self.obterUsuarios();
          self.adicionando = false;
          self.pri = "";
          self.ult = "";
          self.email = "";
          self.userName = "";
          self.senha = "";
          self.mat = "";
          self.adm = false
          self.opcao = "false";

         $rootScope.$broadcast('evento',{
           alerta:'success',
           mensagem: 'Usuario adicionado com sucesso.'
         })

      }, (err) => {
        $rootScope.$broadcast('evento',{
          alerta:'erro',
          mensagem: 'Falha ao adicionar o usuario.'
        })
      })
  }


  self.obterUsuarios = function () {
    userSvc.getUsers()
      .then((res) => {
        self.users = res.data.result;
        self.editados = [];
        for (u of self.users) {
          self.editados.push({
            editado: false,
            id: u._id
          })
        }
        console.log(self.editados);
      }, (err) => {

        $rootScope.$broadcast('evento',{
          alerta:'erro',
          mensagem: 'Falha ao obter o usuario.'
        })
      })
  }


  self.removerUsuario = function (id) {
    userSvc.removerUsuario(id)
      .then((res) => {
        self.obterUsuarios();
        $rootScope.$broadcast('evento',{
          alerta:'success',
          mensagem: 'Usuario removido com sucesso.'
        })

      }, (err) => {
        self.obterUsuario();

        $rootScope.$broadcast('evento',{
          alerta:'erro',
          mensagem: 'Falha ao remover usuario.'
        })
      })
  }

  self.mostrarEditar = function (id) {
    self.setId(id);
    console.log(self.editados);

    if (self.editando) {
      for (e of self.editados) {
        if (e.id == self.id)
          e.editado = false;
      }
      self.editando = false;
    } 
    else {
      for (e of self.editados) {
        if (e.id == self.id)
          e.editado = true;
      }
      self.editando = true;
    }
  }

  self.editUser = function () {
    userSvc.editUser(self.id, self.pri, self.ult, self.email, self.userName, 
      self.senha, self.mat, self.adm)
      .then((res) => {
        if (res.data.success) {
          self.obterUsuarios();
          $rootScope.$broadcast('evento',{
            alerta:'success',
            mensagem: 'Usuário alterado com sucesso.'
          })
        }
        console.log("res: ", res);
      })
  }

  self.setId = function (id) {
    self.id = id;
  }

  self.isAdmin = function () {
    if (self.opcao == "true") {
      return true;
    } else if (self.opcao == "false") {
      return false;
    }
  }

  self.mostrarForm = function () {
    if (self.adicionando)
      self.adicionando = false;
    else
      self.adicionando = true;
  }

  if (!authSvc.isAuthed()){
      $location.path('/login');
  }
}
