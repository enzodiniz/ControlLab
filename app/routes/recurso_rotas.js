var express = require('express'),
    routes = express.Router(),
    Recurso = require('../model/recurso');

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

//criar um recurso
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

//recuperar recurso por ID
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

//recuperar todos os recursos
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

//recuperar locais a partir da query (ui-select)
routes.get('/recursos_busca', function (req, res) {
  Recurso.find({'nome' : new RegExp(req.query.query, 'i')}, '_id nome valor')
    .then((recursos) => {
      res.json({
        success: true,
        query: req.query.query,
        result: recursos
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

//atualizar recurso por ID
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

//remover recurso por ID
routes.delete('/recursos/:id', function (req, res) {
  Recurso.remove({_id:req.params.id}).then((obj) => {
    res.json({
      sucess: true,
      result: obj
    })
  }, (err) => {
    retornaErro(res, err)
  });
});


module.exports = routes
