const express = require('express');
const router = express.Router();
const Model = require('../models');


router.get('/',(req,res)=>{
    res.render('register', {msgUser:''})
})

router.post('/', (req, res) => {
    if(req.body.password == req.body.reTypePassword){
        Model.Employee.create({name: req.body.name, username: req.body.username, password: req.body.password, email: req.body.email}).then(() => {
            res.redirect('/login')
          }).catch((err)=>{
              let errorMsg = err.errors[0].message
            //   res.send(errorMsg)
              res.render('register',{msgUser:errorMsg})
          })
    }
    else{
        let passwordSalah = "Password anda tidak sama"
        res.render('register',{msgUser:passwordSalah})
    }

  })

module.exports = router