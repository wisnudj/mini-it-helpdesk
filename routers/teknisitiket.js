const express = require('express')
const router = express.Router()
const models = require('../models')
const nodemailer = require('nodemailer')

function checkLogin(req, res, next){
  if (req.session.loggedIn && req.session.peran == 'teknisi') {
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
    models.Tiket.findAll({where: {id: req.params.id}, include:[models.Teknisi, models.Employee]}).then((tiket) => {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'itbantuan007@gmail.com',
          pass: 'ithelpdesk'
        }
      })

      var mailOptions = {
        from: 'itbantuan007@gmail.com',
        to: `${tiket[0].Employee.email}`,
        subject: 'response IT Bantuan 007',
        html: `
        <h1>Email From IT Bantuan 007</h1>
        <p>Teknisi: ${tiket[0].Teknisi.name}</h1>
        <p>Memberi Feedback:</p>
        <p>${tiket[0].Feedback}</p>
        <p>Status:</p>
        <p>${tiket[0].Status}</p>
        `

      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.redirect('/teknisitiket')
    })
  })
})

module.exports = router;
