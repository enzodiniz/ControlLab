var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Grupo = new Schema({
  integrantes: { type: [ Schema.ObjectId ], required: true },
  nome: { type: String, unique: true, required: true }
})

module.exports = mongoose.model('Grupo', Grupo);
