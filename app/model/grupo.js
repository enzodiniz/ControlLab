var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Grupo = new Schema({
  integrantes: { type: [ Schema.ObjectId ] },
  nome: { type: String, unique: true }
})

module.exports = mongoose.model('Grupo', Grupo);
