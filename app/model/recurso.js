var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Recurso = new Schema({
  nome: { type: String },
  valor: { type: Number },
  materiais: { type: [ Schema.ObjectId ] }
})

module.exports = mongoose.model('Recurso', Recurso);
