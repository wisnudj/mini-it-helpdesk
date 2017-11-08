const express = require('express')
const router = express.Router()
const models = require('../models');
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
  res.render('login',{msg:""})
})

router.post('/', (req, res) => {
  if(req.body.pilihan == 'employee') {
    models.Employee.findOne({where: {username: req.body.username}}).then((hasil) => {
      console.log(hasil)
      bcrypt.compare(req.body.password, hasil.password).then(function(result) {
        if(result){
          req.session.loggedIn = true
          req.session.username = hasil.username
          req.session.nomor = hasil.id
          req.session.nama = hasil.name
          // console.log(req.session.logged)
          res.redirect('/employeetiket')
        }
        else{
          res.render('login',{msg:"Password anda salah"})
        }
        
    })

    }).catch((err) => {
      res.render('login',{msg:"Username tidak terdaftar"})
    })
  }
  else if(req.body.pilihan == 'teknisi') {
    models.Teknisi.findOne({where: {username: req.body.username}}).then((hasil) => {
      console.log(hasil)
      bcrypt.compare(req.body.password, hasil.password).then(function(result) {
        if(result){
          req.session.loggedIn = true
          req.session.username = hasil.username
          req.session.nomor = hasil.id
          req.session.nama = hasil.name
          // console.log(req.session.logged)
          res.redirect('/teknisitiket')
        }
        else{
          res.render('login',{msg:"Password anda salah"})
        }
        
    })

    }).catch((err) => {
      res.redirect('/login')
    })
  }
  else if(req.body.pilihan == 'admin') {
    models.Admin.findOne({where: {username: req.body.username}}).then((hasil) => { //JANGAN LUPA KASIH VALIDASI ABIS HEROKU

          req.session.loggedIn = true
          req.session.username = hasil.username
          req.session.nomor = hasil.id
          req.session.nama = hasil.name
          // console.log(req.session.logged)
          res.redirect('/admintiket')

    }).catch(() => {
      res.redirect('/login')
    })
  }
})

module.exports = router;
