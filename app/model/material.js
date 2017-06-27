var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Material = new Schema({
  data: { type: Date },
  descricao: { type: String },
  local: { type: Schema.ObjectId },
  recurso: { type: Schema.ObjectId },
  loja: { type: Schema.ObjectId },
  quantidade: { type: Number },
  valorUnit: { type: Number }
})

module.exports = mongoose.model('Material', Material);
