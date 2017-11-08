const express = require('express')
const router = express.Router()
const Models = require('../models');

router.get('/', (req, res) => {
  Models.Employee.findAll().then((employee) => {
    res.render('employee', {employee: employee})
  })
})

router.get('/add', (req, res) => {
  res.render('employeeadd')
})

router.post('/add', (req, res) => {
  Models.Employee.create({name: req.body.name, username: req.body.username, password: req.body.password, email: req.body.email}).then(() => {
    res.redirect('/employee')
  })
})

router.get('/delete/:id', (req, res) => {
  Models.Employee.destroy({where: {id: req.params.id}}).then(() => {
    res.redirect('/employee')
  })
})

router.get('/edit/:id', (req, res) => {
  Models.Employee.findOne({where:{id: req.params.id}}).then((employee) => {
    res.render('employeeedit', {employee: employee})
  })
})

router.post('/edit/:id', (req, res) => {
  Models.Employee.update({name: req.body.name, username: req.body.username, password: req.body.password, email: req.body.email}, {where: {id: req.params.id}}).then(() => {
    res.redirect('/employee')
  })
})

module.exports = router
