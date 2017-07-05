var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Recurso = new Schema({
  nome: { type: String },
  valor: { type: Number }
})

module.exports = mongoose.model('Recurso', Recurso);
