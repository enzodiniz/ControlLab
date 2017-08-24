var express = require('express'),
    Grupo = require('../model/grupo'),
    Usuario = require ('../model/usuario'),
    routes = express.Router();

function retornaErro(res, err) {
  res.json({
    success: false,
    detail: err
  });
}

//criar grupo
routes.post('/grupos', function (req, res) {
  console.log("chegou na rota de adicionar!!! :)");
  var grupo = new Grupo({
    nome: req.body.nome,
    integrantes: req.body.integrantes
  });

  grupo.save().then((obj) => {
    res.json({
      success: true,
      result: obj
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//recuperar grupo por ID
routes.get('/grupos/:id', function (req, res) {
  Grupo.findOne( {_id: req.params.id} ).exec().then((grp) => {
    res.json({
      success: true,
      result: grp
    });
  }, (err) => {
    retornaErro(res, err)
  });
})

//TODO: Ajeitar isso aqui
//recuperar todos os grupos de um usuário
routes.get('/grupos/users/:id', function (req, res) {
  var grupos = [], id = req.params.id
  Grupo.find({})
    .then((obj) => {
      for (var i = 0; i < obj.length; i++) {
        if (obj[i].integrantes.contains(id))
        grupos[i] = obj[i]
      }

      res.json({
        success: true,
        result: grupos
      })
    }, (err) => {
      retornaErro(res, err)
    })
})

//recuperar todos os grupos
routes.get('/grupos', function (req, res) {
  Grupo.find({}).then((grps) => {
    res.json({
      success: true,
      result: grps
    });

  }, (err) => {
    retornaErro(res, err)
  });
})

//recuperar todos os grupos ui-select
routes.get('/grupos_busca', function (req, res) {
  Grupo.find({'nome' : new RegExp(req.query.query, 'i')})
    .then((grupos) => {
      res.json({
        success: true,
        query: req.query.query,
        result: grupos
      })
    }, (err) => {
      retornaErro(res, err);
    })
})

//atualizar grupo por ID
routes.put('/grupos/:id', function (req, res) {
  Grupo.update( {_id: req.params.id}, {$set: {
    nome: req.body.nome,
    integrantes: req.body.integrantes
  }})
  .then((grp) => {
    res.json({
      success: true,
      result: grp
    })
  }, (err) => {
    retornaErro(res, err)
  });
});

//remover grupo por ID
routes.delete('/grupos/:id', function (req, res) {
  Grupo.remove({_id: req.params.id}).then((obj) => {
    res.json({
      success: true,
      result: obj
    })
  }, (err) => {
    retornaErro(res, err)
  });
});

module.exports = routes
