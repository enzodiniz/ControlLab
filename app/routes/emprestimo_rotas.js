var express = require('express'),
routes = express.router();
var Emprestimo = ('../model/emprestimo')

routes.post('emprestimo', function(req, res){
var emprestimo = new emprestimo({
  materias: req.body.materias,
  responsavel: req.body.responsavel.id,
  data: req.body.data

});
 emprestimo.save().then((obj)=> {
   res.json({
     sucess: true
   });
}, (err)=> {
  res.json({
    sucess:false
  });
});
 })



module.exports = routes
