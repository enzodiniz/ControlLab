var express = require('express'),
    Material = require('../model/material'),
    routes = express.Router();

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

routes.post('/materiais', function (req, res) {
  var material = new Material({
    data: req.body.data,
    descricao: req.body.descricao,
    local: req.body.local,
    recurso: req.body.recurso,
    loja: req.body.loja,
    quantidade: req.body.quantidade,
    valorUnit: req.body.valorUnit
  });

  material.save().then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

routes.get('/materiais/:id', function (req, res) {
  Material.find( {_id: req.params.id} ).then((material) => {
    res.json({
      sucess: true,
      result: material
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

routes.get('/materiais', function (req, res) {
  Material.find({}).then((materiais) => {
    res.json({
      sucess: true,
      result: materiais
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

routes.put('/materiais/:id', function (req, res) {
  Material.update( {_id: req.params.id}, {$set: {
    data: req.body.data,
    descricao: req.body.descricao,
    local: req.body.local,
    recurso: req.body.recurso,
    loja: req.body.loja,
    quantidade: req.body.quantidade,
    valorUnit: req.body.valorUnit
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

routes.delete('/materiais/:id', function (req, res) {
  Material.remove({_id: req.params.id}).then((obj) => {
    res.json({
      sucess: true,
      result: obj
    })
  }, (err) => {
    retornaErro(res, err)
  });
});

module.exports = routes
