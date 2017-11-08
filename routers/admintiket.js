const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/', (req, res) => {
  models.Tiket.findAll({include:[models.Admin, models.Teknisi, models.Employee]}).then((tiket) => {
    // res.send(tiket)
    res.render('admintiket', {tiket:tiket})
  })
})

router.get('/updatetiket/:id', (req, res) => {
  models.Tiket.findOne({where:{id:req.params.id}}).then((tiket) => {
    models.Teknisi.findAll().then((teknisi) => {
      res.render('admintiketupdate', {tiket: tiket, teknisi:teknisi})
    })
  })
})

router.post('/updatetiket/:id', (req, res) => {
  models.Tiket.update({Status: req.body.Status, Feedback: req.body.Feedback, TeknisiId: req.body.TeknisiId},{where:{id:req.params.id}}).then(() => {
    res.redirect('/admintiket')
  })
})


module.exports = router;
