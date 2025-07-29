const express = require('express');
const router = express.Router();
const Dato = require('./model');

// Inserimento dati
router.post('/dati', async (req, res) => {
  const nuovoDato = new Dato(req.body);
  await nuovoDato.save();
  res.json(nuovoDato);
});

// Statistiche (es: somma per categoria)
router.get('/statistiche', async (req, res) => {
  const stats = await Dato.aggregate([
    { $group: { _id: '$categoria', totale: { $sum: '$valore' } } }
  ]);
  res.json(stats);
});

module.exports = router;

