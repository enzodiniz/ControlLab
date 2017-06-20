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

  User.save().then((obj) => {
    res.json({
      sucess: true

    });
  }, (err) => {
    res.json({
      sucess: false
    });
  });
})

routes.get('/users/:id', function (req, res) {
  Usuario.find( {_id: req.params.id} ).then((usr) = {
    res.json({
      sucess: true,
      result: usr
    });
  }, ...);
})

routes.get('/users', function (req, res) {
  Usuario.find({}).then((usrs) => {
    res.json({
      sucess: true,
      result: usrs
    });
  }, (err) => {

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
  .then(..., ...);
});

routes.delete('/users/:id', function (req, res) {
  Usuario.remove().then();
});

// routes.post('/users/emprestimo', function (req, res) {
//   var emprestimo = new Emprestimo({
//       materiais: req.body.materiais,
//       responsavel: req.body.responsavel.id,
//       data: req.body.data
//   });
//
//   emprestimo.save().then((obj) => {
//     res.json({
//       sucess: true
//     });
//   }, (err) => {
//     res.json({
//       sucess: false
//     });
//   })
// })

module.exports = routes
