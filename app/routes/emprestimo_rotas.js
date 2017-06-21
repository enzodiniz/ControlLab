var express = require('express'),
    routes = express.router();

var Emprestimo = require ('../model/emprestimo')

routes.post('emprestimos', function(req, res){
  var emprestimo = new Emprestimo({
    materiais: req.body.materiais,
    responsavel: req.body.responsavelId, //id
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

routes.get('/emprestimos/:id', function (req, res) {
  Emprestimo.findOne( {_id: req.params.id} ).then((usr) => {
    res.json({
      sucess: true,
      result: usr
    });
  }, ...);
})

routes.get('/emprestimos', function (req, res) {
  Emprestimo.find({}).then((emprestimos) => {
    res.json({
      sucess: true,
      result: emprestimos
    });
  }, (err) => {

  });
})

routes.put('/emprestimos/:id', function (req, res) {
  Emprestimo.update( {_id: req.params.id}, {$set: {
    materiais: req.body.materiais,
    responsavel: req.body.responsavelId, //id
    data: req.body.data
  }})
  .then((obj) => {
    res.json({
      sucess: true
    });
  }, ...);
});

routes.delete('/users/:id', function (req, res) {
  Emprestimo.remove({_id: req.params.id}).then((obj) => {

  }, (err) => {});
});

module.exports = routes
