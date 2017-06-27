var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Grupo = new Schema({
  integrantes: { type: [ Schema.ObjectId ] },
  nome: { type: String }
})

module.exports = mongoose.model('Grupo', Grupo);
