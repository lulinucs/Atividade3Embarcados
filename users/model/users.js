const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
 nome: {
  type: String, 
  required: [true, 'Nome Obrigatório'], 
  max: 100
 },
 cat: {
  type: String, 
  required: [true, 'Categoria Obrigatório'], 
  max: 100
 },
 cod: {
  type: String, 
  required: [true, 'Código do curso ou setor de lotação Obrigatório']
 },
 mat: {
  type: String, 
  required: [true, 'Matrícula obrigatório']}
 
 });
 
// Exportar o modelo
module.exports = mongoose.model('users', UserSchema);
