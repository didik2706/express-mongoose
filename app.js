const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(Date.now() + ' ' + req.ip + ' ' + req.originalUrl)
  next()
})

app.use(require('./routers'))

app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: 'page not found :('
  })
  next()
})

app.listen(3000, () => {
  console.log('Server running at port 3000')
})