const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const accessControlSchema = new Schema({
 nrosala: {
  type: String, 
  required: [true, 'Número da Sala obrigatório'], 
  max: 100
 },
 centro: {
    type: String,
    required: [true, 'Centro obrigatório'],
    max: 100
 },
 usersallow: {
  type: String, 
  required: [false], 
  max: 100
 }
 });
// Exportar o modelo
module.exports = mongoose.model('accessControl', accessControlSchema);