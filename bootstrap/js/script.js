var app = angular.module('postagens', []);

app.controller('MainController', function MainController($scope) {
  this.texto = "";
  this.postagens = [];


  this.adicionar = function () {
    var data = new Date(),
        dia = data.getDate(),
        mes = data.getMonth() + 1,
        ano = data.getFullYear(),

        hora = data.getHours(),
        min = data.getMinutes();

    if (dia.toString().length == 1)
      dia = "0" + dia
    if (mes.toString().length == 1)
      mes = "0" + mes

    if (hora.toString().length == 1)
      hora = "0" + hora
    if (min.toString().length == 1)
      min = "0" + min

    dia = [dia, mes, ano].join("/"),
    hora = [hora, min].join(":");

    this.postagens.push({
      texto: this.texto,
      timestamp: dia + " " + hora,
      curtiu: ""
    });
    this.texto = "";
  };

  this.remover = function (i) {
    this.postagens.splice(i, 1);
  };

  this.curtir = function (i) {
    if (this.postagens[i].curtiu == "")
      this.postagens[i].curtiu = "Você curtiu";
    else 
      this.postagens[i].curtiu = "";
  }
});
