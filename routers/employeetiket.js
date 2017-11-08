const express = require('express')
const router = express.Router()
const models = require('../models')
const nodemailer = require('nodemailer')

function checkLogin(req, res, next){
  if (req.session.loggedIn && req.session.peran == 'employee') {
    next()
  }else{
    res.redirect('/login')
  }
}

router.get('/',checkLogin, (req, res) => {
  console.log(req.session.nomor);
  models.Tiket.findAll({where:{EmployeeId: req.session.nomor}, include:[models.Employee, models.Admin, models.Teknisi], order:['id']}).then((tiket) => {
    // res.send(tiket)
    console.log(req.session.nama);
    res.render('employeetiket', {tiket: tiket, nama: req.session.nama})
  })
})

router.get('/create', checkLogin, (req, res) => {
  res.render('employeetiketcreate')
})

router.post('/create', checkLogin, (req, res) => {
  models.Tiket.create({EmployeeId: req.session.nomor, Problem: req.body.Problem}).then(() => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'itbantuan007@gmail.com',
        pass: 'ithelpdesk'
      }
    })

    var mailOptions = {
      from: 'itbantuan007@gmail.com',
      to: 'jayalahwisnu@gmail.com',
      subject: 'Sending Email using Node.js',
      html: `<h1>Email From IT Bantuan 007</h1><p>Employee ${req.session.nama} meminta bantuan kepada ithelpdesk</p><p>Problem:</p><p>${req.body.Problem}</p>`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.redirect('/employeetiket')
  })
})

module.exports = router;
