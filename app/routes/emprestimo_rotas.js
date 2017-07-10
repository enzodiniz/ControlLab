var express = require('express'),
    routes = express.Router();

var Emprestimo = require ('../model/emprestimo')

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

//emprestar um material
routes.post('/emprestimos', function(req, res){
  var emprestimo = new Emprestimo({
    materiais: req.body.materiais,
    responsavel: req.body.responsavelId, //id
    data: req.body.data
  });
 emprestimo.save().then((obj)=> {
   res.json({
     sucess: true,
     result: obj
   });
  }, (err)=> {
    retornaErro(res, err)
  });
})

//recuperar emprestimo por id
routes.get('/emprestimos/:id', function (req, res) {
  Emprestimo.findOne( {_id: req.params.id} ).then((usr) => {
    res.json({
      sucess: true,
      result: usr
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//recuperar todos os emprestimos de determinada data
routes.get('/emprestimos/datas/:dt', function (req, res) {
  Emprestimo.find({data: req.params.dt})
    .then((obj) => {
      res.json({
        sucess: true,
        result: obj
      })
    }, (err) => {
      retornaErro(res, err)
    })
})

//recuperar todos os emprestimos
routes.get('/emprestimos', function (req, res) {
  Emprestimo.find({}).then((emprestimos) => {
    res.json({
      sucess: true,
      result: emprestimos
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//atualizar emprestimo por id
routes.put('/emprestimos/:id', function (req, res) {
  Emprestimo.update( {_id: req.params.id}, {$set: {
    materiais: req.body.materiais,
    responsavel: req.body.responsavelId, //id
    data: req.body.data
  }})
  .then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
});

//remover um emprestimo
routes.delete('/emprestimos/:id', function (req, res) {
  Emprestimo.remove({_id: req.params.id}).then((obj) => {
    res.json({
      sucess: true,
      result: obj
    })
  }, (err) => {
    retornaErro(res, err)
  });
});

module.exports = routes
