const mongoose = require('mongoose')

const Product = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  }
})

module.exports = mongoose.model('Product', Product)