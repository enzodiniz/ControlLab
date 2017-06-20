var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Material = new Schema({
  data: { type: Date },
  descricao: { type: String },
  local: { type: ObjectId },
  recurso: { type: ObjectId },
  loja: { type: ObjectId },
  quantidade: { type: Number },
  valorUnit: { type: Number }
})

module.exports = mongoose.model('Material', Material);
