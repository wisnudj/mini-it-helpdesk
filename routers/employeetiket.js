const express = require('express')
const router = express.Router()
const models = require('../models')

function checkLogin(req, res, next){
  if (req.session.loggedIn) {
    next()
  }else{
    res.redirect('/login')
  }
}

router.get('/',checkLogin, (req, res) => {
  console.log(req.session.nomor);
  models.Tiket.findAll({where:{EmployeeId: req.session.nomor}, include:[models.Employee, models.Admin, models.Teknisi]}).then((tiket) => {
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
    res.redirect('/employeetiket')
  })
})

module.exports = router;
