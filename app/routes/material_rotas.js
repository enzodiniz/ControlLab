var express = require('express'),
    Material = require('../model/material'),
    routes = express.Router();

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
      sucess: true

    });
  }, (err) => {
    res.json({
      sucess: false
    });
  });
})

routes.get('/materiais/:id', function (req, res) {
  Material.find( {_id: req.params.id} ).then((material) = {
    res.json({
      sucess: true,
      result: material
    });
  }, ...);
})

routes.get('/materiais', function (req, res) {
  Material.find({}).then((materiais) => {
    res.json({
      sucess: true,
      result: materiais
    });
  }, (err) => {

  });
})

routes.put('/materias/:id', function (req, res) {
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
      sucess: true
    });
  }, ...);
});

routes.delete('/materiais/:id', function (req, res) {
  Material.remove({_id: req.params.id}).then((obj) => {

  }, (err) => {});
});

module.exports = routes
