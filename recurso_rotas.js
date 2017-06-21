var express = require('express'),
    routes = express.Router(),
    Recurso = require('../model/recurso');

routes.post('/recursos', function (req, res) {
  var recurso = new Recurso({
    nome:req.body.nome;
    valor:req.body.valor;
    material:req.body.materal
  });

  recurso.save().then((obj) => {
    res.json({
      sucess: true

    });
  }, (err) => {
    res.json({
      sucess: false
    });
  });
})

routes.get('/recursos/:id', function (req, res) {
  Recurso.findOne( {_id: req.params.id} ).then((recursos) = {
    res.json({
      sucess: true,
      result: recursos
    });
  }, ...);
})

routes.get('/recursos', function (req, res) {
  Recurso.find({}).then((recursos) => {
    res.json({
      sucess: true,
      result: recursos
    });
  }, (err) => {

  });
})

routes.put('/recursos/:id', function (req, res) {
  Recurso.update( {_id: req.params.id}, {$set: {
  nome:req.body.nome,
  valor:req.body.valor,
  material:req.body.material
  }})
  .then(..., ...);
});

routes.delete('/recurso/:id', function (req, res) {
  Recuro.remove({_id:req.params.id}).then();
});


module.exports = routes
