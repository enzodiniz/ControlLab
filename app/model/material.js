var mongoose = require('mongoose'),
    Schema = mongoose.Schema,


var Material = new Schema({
  data: { type: Date },
  descricao: { type: String },
  local: { type: String },
  recurso: { type: String },
  loja: { type: String },
  quantidade: { type: Number },
  valorUnit: { type:  }
})

module.exports = mongoose.model('Material', Material);
