var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Money = require('moneyjs');

require('mongoose-money')

var Recurso = new Schema({
  nome: { type: String },
  valor: { type: Number }
  // type: Schema.Types.Money
})

module.exports = mongoose.model('Recurso', Recurso);
