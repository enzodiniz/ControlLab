var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Emprestimo = new Schema({
  materiais: { type: [ mongoose.Schema.Types.ObjectId ], ref: 'Material' },
  responsavel: { type: Schema.ObjectId }, //usuario ou Grupo
  data: { type: Date }
})

module.exports = mongoose.model('Emprestimo', Emprestimo);
