var express = require('express'),
    Loja = require('../model/loja'),
    routes = express.Router();

routes.post('/lojas', function (req, res) {
  var loja = new Loja({
    nome: req.body.nome
  });

  loja.save().then((obj) => {
    res.json({
      sucess: true
    });
  }, (err) => {

  });
})

routes.get('/lojas/:id', function (req, res) {
  Loja.findOne( {_id: req.params.id} ).exec().then((loja) = {
    res.json({
      sucess: true,
      result: loja
    });
  }, ...);
})

routes.get('/lojas', function (req, res) {
  Loja.find({}).then((lojas) => {
    res.json({
      sucess: true,
      result: lojas
    });
  }, (err) => {

  });
})

routes.put('/lojas/:id', function (req, res) {
  Loja.update( {_id: req.params.id}, {$set: {
    nome: req.body.nome
  }})
  .then(..., ...);
});

routes.delete('/lojas/:id', function (req, res) {
  Loja.remove({_id: req.params.id}).then();
});

module.exports = routes
