const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', (req, res) => {
  if(req.body.pilihan == 'employee') {
    models.Employee.findOne({where: {username: req.body.username}}).then((hasil) => {
      req.session.loggedIn = true
      req.session.username = hasil.username
      req.session.nomor = hasil.id
      req.session.nama = hasil.name
      console.log(req.session.nama)
      res.redirect('/employeetiket')
    }).catch((err) => {
      res.redirect('/login')
    })
  }
  else if(req.body.pilihan == 'teknisi') {
    models.Teknisi.findOne({where: {username: req.body.username}}).then((hasil) => {
      req.session.loggedIn = true
      req.session.username = hasil.username
      req.session.nama = hasil.name
      req.session.nomor = hasil.id
      console.log(hasil);
      res.redirect('/teknisitiket')
    }).catch((err) => {
      res.redirect('/login')
    })
  }
  else if(req.body.pilihan == 'admin') {
    models.Admin.findOne({where: {username: req.body.username}}).then((hasil) => {
      req.session.loggedIn = true
      req.session.username = hasil.username
      req.session.nama = hasil.name
      req.session.nomor = hasil.id
      console.log(hasil);
      res.redirect('/admintiket')
    }).catch(() => {
      res.redirect('/login')
    })
  }
})

module.exports = router;
