const express = require('express')
const router = express.Router()
const models = require('../models');

router.get('/', (req, res) => {
  models.Tiket.findAll({include:[models.Admin, models.Employee, models.Teknisi]}).then((hasil) => {
    res.send(hasil)
  })
})

module.exports = router;
