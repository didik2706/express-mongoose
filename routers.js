const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')

const router = express.Router()
const upload = multer({ dest: 'upload' })

// konfigurasi mongoose
mongoose.connect('mongodb://localhost:27017/latihan', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
const db = mongoose.connection
db.once('error', err => console.log(err))
db.on('open', () => console.log('Database connected :)'))

const Product = require('./connection')

router.get('/products', async (req, res) => {
  await Product.find({}, (err, result) => {
    if (err) return console.log(err)
    res.json({
      status: true,
      message: 'Get all data products',
      data: result
    })
  })
})

router.get('/product/:id', async (req, res) => {
  await Product.findById(req.params.id, (err, result) => {
    if (err) return console.log(err)
    res.json({
      status: true,
      message: 'Get details product',
      data: result
    })
  })
})

router.post('/product', async (req, res) => {
  const { name, price, stock, status } = req.body
  try {
    const addProduct = await Product.create({
      name, price, stock, status
    })
    res.json({
      status: true,
      message: 'Product successfully added :)',
      data: addProduct
    })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message
    })
  }
})

router.put('/product/:id', async (req, res) => {
  const { name, price, stock, status } = req.body
  const updateProduct = await Product.updateOne(
    { _id: req.params.id},
    {
      name, price, stock, status
    }
  )
  res.json({
    status: true,
    message: 'Product successfully updated',
    data: updateProduct
  })
})

router.delete('/product/:id', async (req, res) => {
  const deleteProduct = await Product.deleteOne({ _id: req.params.id })
  res.json({
    status: true,
    message: 'Product successfully deleted',
    data: deleteProduct
  })
})  

module.exports = router