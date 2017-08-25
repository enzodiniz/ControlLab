var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Emprestimo = new Schema({
  materiais: { type: [ mongoose.Schema.Types.ObjectId ], ref: 'Material', required: true },
  responsavel: { type: Schema.ObjectId, required: true }, //usuario ou Grupo
  data: { type: Date, required: true }
})

module.exports = mongoose.model('Emprestimo', Emprestimo);
