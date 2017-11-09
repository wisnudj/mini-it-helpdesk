const express = require('express')
const router = express.Router()
const Models = require('../models');

router.get('/add', (req, res) => {
  res.render('adminAdd')
})

router.post('/add', (req, res) => {
  Models.Admin.create({name: req.body.name, username: req.body.username, password: req.body.password, email: req.body.email}).then(() => {
    res.redirect('/admintiket')
  })
})

module.exports = router;
