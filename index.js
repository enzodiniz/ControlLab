var express = require('express')
var mongoose = require('mongoose')
var app = express()
var router = express.Router()
var bodyParser = require('body-parser')
var config = require('config')

mongoose.Promisse = global.Promisse
mongoose.connect(config.conexao)

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use('/scripts', express.static(__dirname + '/node_modules'))

router.use(require('./app/routes/usuario_rotas')) //routes
router.use(require('./app/routes/material_rotas'))
router.use(require('./app/routes/grupo_rotas'))
router.use(require('./app/routes/local_rotas'))
router.use(require('./app/routes/loja_rotas'))
router.use(require('./app/routes/emprestimo_rotas'))
router.use(require('./app/routes/recurso_rotas'))

app.use('/api', router)

var server = app.listen(3000, function () {
    console.log('Example app listen on port 3000!')
    console.log(config.ambiente);
})

module.exports = server
