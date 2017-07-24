var express = require('express'),
    routes = express.Router(),
    Usuario = require('../model/usuario'),
    jwt = require('jsonwebtoken'),
    config = require('config'),
    bcrypt = require('bcrypt-nodejs');

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

//autenticar o usuário
routes.post('/autenticacao', function (req, res) {
  Usuario.findOne({userName: req.body.userName})
    .then((user) => {
      if (!user) {
        res.json({
          sucess: false,
          messagem: "Usuário não cadastrado!"
        })
      }
      else {
        if (bcrypt.compareSync(req.body.senha, user.senha)) {
          var token = jwt.sign(user._id, config.segredo, {
            expiresIn: "24h"
          })

          res.json({
            sucess: true,
            messagem: "Logado com sucesso.",
            token: token
          })
        }
        else {
          res.json({
            sucess: false,
            messagem: "Senha ou usuário inválidos!"
          })
        }
      }
    }, (err) => {
      retornaErro(res, err)
    })
})

//midleware que verifica token
routes.use((req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {

      if (err){
        res.json({
          sucess: false,
          messagem: "Falha durante a autenticação!"
        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(203).send({
      sucess: false,
      messagem: "Nenhum token fornecido."
    })
  }
})

//criar um usuário
routes.post('/users', function (req, res) {
  var user = new Usuario({
    primeiroNome: req.body.primeiroNome,
    ultimoNome: req.body.ultimoNome,
    email: req.body.email,
    userName: req.body.userName,
    senha: bcrypt.hashSync(req.body.senha),
    matricula: req.body.matricula,
    admin: req.body.admin
  });

  user.save().then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//recuperar um usuário por ID
routes.get('/users/:id', function (req, res) {
  Usuario.findOne( {_id: req.params.id} ).then((usr) => {
    res.json({
      sucess: true,
      result: usr
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//recuperar todos os usuários
routes.get('/users', function (req, res) {
  Usuario.find({}).then((usrs) => {
    res.json({
      sucess: true,
      result: usrs
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//atualizar um usuário por ID
routes.put('/users/:id', function (req, res) {
  Usuario.update( {_id: req.params.id}, {$set: {
    primeiroNome: req.body.primeiroNome, // || nome atual do usuário
    ultimoNome: req.body.ultimoNome,
    email: req.body.email,
    userName: req.body.userName,
    senha: req.body.senha,
    matricula: req.body.matricula,
    admin: req.body.admin
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

//remove um usuário
routes.delete('/users/:id', function (req, res) {
  Usuario.remove({_id: req.params.id}).then((obj) => {
    res.json({
      sucess: true,
      result: obj
    })
  }, (err) => {
    retornaErro(res, err)
  });
});

module.exports = routes
