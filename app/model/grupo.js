var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Grupo = new Schema({
  integrantes: { type: [ ObjectId ] },
  nome: { type: String }
})

module.exports = mongoose.model('Grupo', Grupo);
