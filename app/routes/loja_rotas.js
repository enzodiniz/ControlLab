var express = require('express'),
    Loja = require('../model/loja'),
    routes = express.Router();

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

//cria uma loja
routes.post('/lojas', function (req, res) {
  var loja = new Loja({
    nome: req.body.nome
  });

  loja.save().then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//recupera a loja de determinado ID
routes.get('/lojas/:id', function (req, res) {
  Loja.findOne( {_id: req.params.id} ).exec().then((loja) => {
    res.json({
      sucess: true,
      result: loja
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//recupera todas as lojas
routes.get('/lojas', function (req, res) {
  Loja.find({}).then((lojas) => {
    res.json({
      sucess: true,
      result: lojas
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//atualiza uma loja
routes.put('/lojas/:id', function (req, res) {
  Loja.update( {_id: req.params.id}, {$set: {
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

//TODO: Essa rota não está funcionando
//Remove uma loja de determinado ID
routes.delete('/lojas/:id', function (req, res) {
  Loja.remove( {_id: req.params.id} ).then((obj) => {
    res.json({
      sucess: true,
      result: obj
    })
  }, (err) => {
    retornaErro(res, err)
  })
});

module.exports = routes
