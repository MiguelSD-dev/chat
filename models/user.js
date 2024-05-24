
const mongoose = require('mongoose');

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Los espacios en blanco antes o despues son eliminados
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido']
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Crear y exportar el modelo
const User = mongoose.model('User', userSchema);

module.exports = User;
