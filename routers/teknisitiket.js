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
  models.Tiket.findAll({where:{TeknisiId: req.session.nomor}, include:[models.Employee, models.Admin, models.Teknisi]}).then((tiket) => {
    res.render('teknisitiket', {tiket: tiket})
  })
})

router.get('/updatetiket/:id', checkLogin, (req, res) => {
  models.Tiket.findAll({where:{id: req.params.id}}).then((tiket) => {
    res.render('teknisitiketupdate', {tiket: tiket})
  })
})

router.post('/updatetiket/:id', checkLogin, (req, res) => {
  models.Tiket.update({Status:req.body.Status, Feedback: req.body.Feedback},{where:{id:req.params.id}}).then(() => {
    res.redirect('/teknisitiket')
  })
})


module.exports = router;
