var express = require('express'),
    routes = express.Router(),
    Local = require('../model/local');

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

//Cria um local e adiciona ao BD
routes.post('/locais', function (req, res) {
  var local = new Local({
    nome: req.body.nome
  });

  local.save().then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
});

//recupera local de determinado ID
routes.get('/locais/:id', function (req, res) {
  Local.findOne( {_id: req.params.id} ).exec().then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//recupera todos os locais
routes.get('/locais', function (req, res) {
  Local.find({}).then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//atualizar local
routes.put('/locais/:id', function (req, res) {
  Local.update( {_id: req.params.id}, {$set: {
    nome: req.body.nome
  }})
  .then((obj) => {
    res.json({
      sucess: true,
      result: obj
    })
  }, (err) => {
    retornaErro(res, err)
  });
});

//Remove um local de determinado ID
routes.delete('/locais/:id', function (req, res) {
  Local.remove( {_id: req.params.id} ).then((obj) => {
    res.json({
      sucess: true,
      result: req.params.id
    })
  }, (err) => {
    retornaErro(res, err)
  })
});

module.exports = routes
