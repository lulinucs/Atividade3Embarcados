const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LaboratoriosSchema = new Schema({
 nrosala: {
  type: String, 
  required: [true, 'Número Sala Obrigatório'], 
  max: 100
 },
 centro: {
  type: String, 
  required: [true, 'Centro de Ensino Obrigatório'], 
  max: 100
 }
 });
// Exportar o modelo
module.exports = mongoose.model('labs', LaboratoriosSchema);
