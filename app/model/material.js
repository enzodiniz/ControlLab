var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Material = new Schema({
  data: { type: Date, default: new Date() },
  descricao: { type: String, required: true },
  local: { type: Schema.ObjectId, required: true },
  recurso: { type: Schema.ObjectId, required: true },
  loja: { type: Schema.ObjectId, required: true },
  quantidade: { type: Number, required: true, min: 0 },
  valorUnit: { type: Number, required: true, min: 0 }
})

module.exports = mongoose.model('Material', Material);
