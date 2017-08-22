var mongoose = require('mongoose'),
    Schema = mongoose.Schema


var Usuario = new Schema({
  primeiroNome: { type: String },
  ultimoNome: { type: String },
  grupo: { type: Schema.ObjectId },
  email: { type: String },
  userName: { type: String, unique: true },
  senha: { type: String },
  matricula: { type: String, unique: true }, //chave unica
  admin: { type: Boolean, default: false }
})

module.exports = mongoose.model('Usuario', Usuario);
