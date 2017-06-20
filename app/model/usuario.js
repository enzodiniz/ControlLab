var mongoose = require('mongoose'),
    Schema = mongoose.Schema,


var Usuario = new Schema({
  primeiroNome: { type: String },
  ultimoNome: { type: String },
  grupo: { type: ObjectId },
  userName: { type: String },
  senha: { type: String } //hash
  //matricula: { type: String, unique: true } //chave unica
})

module.exports = mongoose.model('Usuario', Usuario);
