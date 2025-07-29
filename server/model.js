const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  nome: String,
  valore: Number,
  categoria: String,
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dato', DataSchema);

