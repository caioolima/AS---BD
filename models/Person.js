const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
  nome: String,
  idade: Number,
  esporte: String,
  time: String,
})

module.exports = Person