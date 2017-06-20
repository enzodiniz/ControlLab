var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Emprestimo = new Schema({
  materiais: { type: [ ObjectId ] },
  responsavel: { type: ObjectId }, //usuario ou Grupo
  data: { type: Date }
})

module.exports = mongoose.model('Emprestimo', Emprestimo);
