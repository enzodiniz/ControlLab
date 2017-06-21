var express = require('express'),
    Grupo = require('../model/grupo'),
    routes = express.Router();

routes.post('/grupos', function (req, res) {
  var grupo = new Grupo({
    nome: req.body.nome,
    integrantes: req.body.integrantes
  });

  grupo.save().then((obj) => {
    res.json({
      sucess: true
    });
  }, (err) => {

  });
})

routes.get('/grupos/:id', function (req, res) {
  Grupo.findOne( {_id: req.params.id} ).exec().then((grp) = {
    res.json({
      sucess: true,
      result: grp
    });
  }, ...);
})

routes.get('/grupos', function (req, res) {
  Grupo.find({}).then((grps) => {
    res.json({
      sucess: true,
      result: grps
    });
  }, (err) => {

  });
})

routes.put('/grupos/:id', function (req, res) {
  Grupo.update( {_id: req.params.id}, {$set: {
    nome: req.body.nome,
    integrantes: req.body.integrantes
  }})
  .then(..., ...);
});

routes.delete('/lojas/:id', function (req, res) {
  Grupo.remove({_id: req.params.id}).then();
});

module.exports = routes
