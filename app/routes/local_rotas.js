var express = require('express'),
    routes = express.Router(),
    Local = require('../model/local');

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

routes.post('/locais', function (req, res) {
  var local = new Local({
    nome: req.body.nome
  });

  local.save().then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
});

routes.get('/locais/:id', function (req, res) {
  Local.findOne( {_id: req.params.id} ).exec().then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

routes.get('/locais', function (req, res) {
  Local.find({}).then((obj) => {
    res.json({
      sucess: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

routes.put('/locais/:id', function (req, res) {
  Local.update( {_id: req.params.id}, {$set: {
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

routes.delete('/locais/:id', function (req, res) {
  Local.remove( {_id: req.params.id} ).then((obj) => {
    res.json({
      sucess: true,
      result: obj
    })
  }, (err) => {
    retornaErro(res, err)
  })
});

module.exports = routes
