const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const employee = require('./routers/employee')
const tiket = require('./routers/tiket')
const login = require('./routers/login')
const employeetiket = require('./routers/employeetiket')
const teknisitiket = require('./routers/teknisitiket')
const admintiket = require('./routers/admintiket');
const teknisi = require('./routers/teknisi') //resolve idabagusangga
const register = require('./routers/register')
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: 'berhasil'
}))

app.set('views', './views') // specify the views directory
app.set('view engine', 'ejs') // register the template engine



app.use('/register',register)
app.use('/teknisi',teknisi) //resolve conflict idabagusangga
app.use('/employee', employee)
app.use('/tiket', tiket)
app.use('/login', login)
app.use('/employeetiket', employeetiket)
app.use('/teknisitiket', teknisitiket)
app.use('/admintiket', admintiket)


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
