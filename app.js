const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine

// Halaman Teknisi
const teknisi = require('./routers/teknisi')
app.use('/teknisi',teknisi)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
