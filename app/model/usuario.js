var mongoose = require('mongoose'),
    Schema = mongoose.Schema


var Usuario = new Schema({
  primeiroNome: { type: String },
  ultimoNome: { type: String },
  grupo: { type: Schema.ObjectId },
  userName: { type: String },
  senha: { type: String }, //hash
  matricula: { type: String, unique: true }, //chave unica
  admin: { type: Boolean, default: false }
})

module.exports = mongoose.model('Usuario', Usuario);
