var express = require('express'),
    routes = express.Router(),
    Usuario = require('../model/usuario');

routes.post('/users', function (req, res) {
  var user = new Usuario({
    primeiroNome: req.body.primeiroNome,
    ultimoNome: req.body.ultimoNome,
    grupo: req.body.grupo,
    userName: req.body.userName,
    senha: req.body.senha,
    matricula: req.body.matricula
  });

  user.save().then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    res.json({
      sucess: false
    });
  });
})

routes.get('/users/:id', function (req, res) {
  Usuario.findOne( {_id: req.params.id} ).then((usr) => {
    res.json({
      sucess: true,
      result: usr
    });
  }, (err) => {
    res.json({
      sucess: false
    })
  });
})

routes.get('/users', function (req, res) {
  Usuario.find({}).then((usrs) => {
    res.json({
      sucess: true,
      result: usrs
    });
  }, (err) => {
    res.json({
      sucess: false
    })
  });
})

routes.put('/users/:id', function (req, res) {
  Usuario.update( {_id: req.params.id}, {$set: {
    primeiroNome: req.body.primeiroNome, // || nome atual do usuário
    ultimoNome: req.body.ultimoNome,
    grupo: req.body.grupo,
    userName: req.body.userName,
    senha: req.body.senha,
    matricula: req.body.matricula
  }})
  .then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    res.json({
      sucess: false
    })
  });
});

routes.delete('/users/:id', function (req, res) {
  Usuario.remove({_id: req.params.id}).then((obj) => {
    res.json({
      sucess: true,
      result: obj
    })
  }, (err) => {
    res.json({
      sucess: false
    })
  });
});

module.exports = routes
