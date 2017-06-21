var express = require('express'),
    routes = express.Router(),
    Local = require('../model/local');

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
    res.json({
      sucess: false
    });
  });
});

module.exports = routes
