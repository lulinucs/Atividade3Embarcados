const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const accessLogSchema = new Schema({
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
 mat: {
  type: String, 
  required: [true, 'Matrícula obrigatória'], 
  max: 100
 },
 auth: {
   type: String,
   required: [true],
   max: 100
 }
 });
// Exportar o modelo
module.exports = mongoose.model('accessLog', accessLogSchema);