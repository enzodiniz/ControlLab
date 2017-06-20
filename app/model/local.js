var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Local = new Schema({
  nome: { type: String }
})

module.exports = mongoose.model('Local', Local);
