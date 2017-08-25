var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Money = require('moneyjs');

require('mongoose-money')

var Recurso = new Schema({
  nome: { type: String, required: true },
  valor: { type: Number, min: 0, required: true}
  // type: Schema.Types.Money
})

module.exports = mongoose.model('Recurso', Recurso);
