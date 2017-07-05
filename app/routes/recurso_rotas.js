var express = require('express'),
    routes = express.Router(),
    Recurso = require('../model/recurso');

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

routes.post('/recursos', function (req, res) {
  var recurso = new Recurso({
    nome:req.body.nome,
    valor:req.body.valor
  });

  recurso.save().then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

routes.get('/recursos/:id', function (req, res) {
  Recurso.findOne( {_id: req.params.id} ).then((recursos) => {
    res.json({
      sucess: true,
      result: recursos
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

routes.get('/recursos', function (req, res) {
  Recurso.find({}).then((recursos) => {
    res.json({
      sucess: true,
      result: recursos
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

routes.put('/recursos/:id', function (req, res) {
  Recurso.update( {_id: req.params.id}, {$set: {
  nome:req.body.nome,
  valor:req.body.valor
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

routes.delete('/recurso/:id', function (req, res) {
  Recuro.remove({_id:req.params.id}).then((obj) => {
    res.json({
      sucess: true,
      result: obj
    })
  }, (err) => {
    retornaErro(res, err)
  });
});


module.exports = routes
