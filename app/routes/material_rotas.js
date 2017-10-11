var express = require('express'),
    Material = require('../model/material'),
    Loja     = require ('../model/loja'),
    Local    = require ('../model/local'),
    routes = express.Router();

function retornaErro(res, err) {
  res.json({
    sucess: false,
    detail: err
  });
}

//criar um material
routes.post('/materiais', function (req, res) {
  var material = new Material({
    data: req.body.data,
    descricao: req.body.descricao,
    local: req.body.local,
    recurso: req.body.recurso,
    loja: req.body.loja,
    quantidade: req.body.quantidade,
    valorUnit: req.body.valorUnit
  });

  material.save().then((obj) => {
    res.json({
      success: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//recuperar material por id
routes.get('/materiais/:id', function (req, res) {
  Material.findOne( {_id: req.params.id} ).then((material) => {
    res.json({
      sucess: true,
      result: material
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//recuperar todos os materiais
routes.get('/materiais', function (req, res) {
  Material.find({}).then((materiais) => {
    // var mats = [];
    // for (m of materiais) {
    //   mats.push(new Promise(function (resolve, reject) {
    //     Loja.findOne({_id: m.loja})
    //       .then((loja) => {
    //         var m2 = {
    //           material: m,
    //           loja: loja
    //         }
    //         resolve(m2);
    //       })
    //   }))
    // }

    // Promise.all(mats)
    //   .then(function (resultado) {
    //     console.log("resultado:", resultado);
    //     res.json({
    //       success: true,
    //       result: resultado
    //     })
    //   })
    res.json({
      sucess: true,
      result: materiais
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//recuperar todos os materiais de determinado recurso
routes.get('/materiais/recursos/:id', function (req, res) {
  Material.find({recurso: req.params.id}).then((obj) => {
    res.json({
      sucess: true,
      result: obj
    })
  }, (err) => {
    retornaErro(res, err)
  })
})

//recuperar todos os materiais de determinado loja
routes.get('/materiais/lojas/:id', function (req, res) {
  Material.find({loja: req.params.id})
    .then((obj) => {
      res.json({
        sucess: true,
        result: obj
      })
    }, (err) => {
      retornaErro(res, err)
    })
})

//recuperar um material pra ui-select
routes.get('/materiais_busca', function (req, res) {
  var q = req.query.query;

  Material.find({"descricao" : new RegExp(q, 'i')},
    'descricao quantidade')
    .then((materiais) => {
      res.json({
        success: true,
        query: q,
        result: materiais
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

//atualizar um material pelo id
routes.put('/materiais/:id', function (req, res) {
  Material.update( {_id: req.params.id}, {$set: {
    data: req.body.data,
    descricao: req.body.descricao,
    local: req.body.local,
    recurso: req.body.recurso,
    loja: req.body.loja,
    quantidade: req.body.quantidade,
    valorUnit: req.body.valorUnit
  }})
  .then((obj) => {
    res.json({
      success: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
});

//remover um material por id
routes.delete('/materiais/:id', function (req, res) {
  Material.remove({_id: req.params.id}).then((obj) => {
    res.json({
      success: true,
      result: obj
    })
  }, (err) => {
    retornaErro(res, err)
  });
});

module.exports = routes
