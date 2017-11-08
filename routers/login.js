const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', (req, res) => {
  if(req.body.pilihan == 'employee') {
    models.Employee.findOne({where: {username: req.body.username}}).then((hasil) => {
      console.log(hasil.username);
      req.session.loggedIn = true
      req.session.username = hasil.username
      req.session.nomor = hasil.id
      req.session.nama = hasil.name
      req.session.peran = 'employee'
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
      req.session.peran = 'teknisi'
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
      req.session.peran = 'admin'
      res.redirect('/admintiket')
    }).catch(() => {
      res.redirect('/login')
    })
  }
})

module.exports = router;
