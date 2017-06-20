var express = require('express')
var app = express()
var router = express.router()
var bodyParser = require('body-parser')
var config = require('config')

app.use(bodyParser.json())
router.use(require('app/user_routes')) //routes
app.use('api', router)

var server = app.listen(3000, function () {
    console.log('Example app listen on port 3000!')
    console.log(config.ambiente);
})

module.exports = server
