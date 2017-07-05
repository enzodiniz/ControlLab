var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Loja = new Schema({
  nome: { type: String, unique: true }
})

module.exports = mongoose.model('Loja', Loja);
