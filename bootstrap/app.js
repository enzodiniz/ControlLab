
var app= angular.module('tarefas',[]);

app.controller('MainController', function MainController($scope, $filter){
this.texto="";
this.numeros=[];

this.adicionar = function(){
  var data = new Date();
    dataFormatada = $filter('date')(data, 'dd/MM/yyyy HH:mm')
  if (this.numeros.indexOf(this.texto == -1)){
  this.numeros.push ({
    texto: this.texto,
    data: dataFormatada
  });
  this.texto="";
}
}
    this.add = function(){
  $scope.curti ="Leite";}

});
