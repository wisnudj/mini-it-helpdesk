const express = require('express')
const router = express.Router()
const models = require('../models')
const nodemailer = require('nodemailer')

function checkLogin(req, res, next){
  if (req.session.loggedIn && req.session.peran == 'admin') {
    next()
  }else{
    res.redirect('/login')
  }
}

router.get('/',checkLogin, (req, res) => {
  models.Tiket.findAll({include:[models.Admin, models.Teknisi, models.Employee], order:['id']}).then((tiket) => {
    // res.send(tiket)
    res.render('admintiket', {tiket:tiket})
  })
})

router.get('/updatetiket/:id',checkLogin, (req, res) => {
  models.Tiket.findOne({where:{id:req.params.id}}).then((tiket) => {
    models.Teknisi.findAll().then((teknisi) => {
      res.render('admintiketupdate', {tiket: tiket, teknisi:teknisi})
    })
  })
})

router.post('/updatetiket/:id',checkLogin, (req, res) => {
  models.Tiket.update({Status: req.body.Status, Feedback: req.body.Feedback, TeknisiId: req.body.TeknisiId},{where:{id:req.params.id}}).then(() => {
    models.Tiket.findAll({where: {id: req.params.id}, include:[models.Employee, models.Teknisi]}).then((tiket) => {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'itbantuan007@gmail.com',
          pass: 'ithelpdesk'
        }
      })

      if(req.body.TeknisiId > 0) {
        var mailOptions = {
          from: 'itbantuan007@gmail.com',
          to: `${tiket[0].Teknisi.email}`,
          subject: 'response IT Bantuan 007',
          html: `
          <h1>Email From IT Bantuan 007</h1>
          <p>Admin menugaskan kepada:</h1>
          <p>${tiket[0].Teknisi.name}</p>
          <p>Employee name:</p>
          <p>${tiket[0].Employee.name}</p>
          <p>Problem:</p>
          <p>${tiket[0].Problem}</p>
          `
        }

        var mailOptions2 = {
          from: 'itbantuan007@gmail.com',
          to: `${tiket[0].Employee.email}`,
          subject: 'Respon IT Bantuan 007',
          html: `
          <h1>Email From IT Bantuan 007</h1>
          <p>Dear Employee ${tiket[0].Employee.name}</p>
          <p>Admin menugaskan kepada:</h1>
          <p>${tiket[0].Teknisi.name}</p>
          <p>Problem:</p>
          <p>${tiket[0].Problem}</p>
          <p>Status:</p>
          <p>${tiket[0].Status}</p>
          `
        }

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })

        transporter.sendMail(mailOptions2, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })

      } else {
        var mailOptions2 = {
          from: 'itbantuan007@gmail.com',
          to: `${tiket[0].Employee.email}`,
          subject: 'Respon IT Bantuan 007',
          html: `
          <h1>Email From IT Bantuan 007</h1>
          <p>Admin menolak tiket anda:</h1>
          <p>Problem:</p>
          <p>${tiket[0].Problem}</p>
          <p>Feedback:</p>
          <p>${tiket[0].Feedback}</p>
          <p>Status:</p>
          <p>${tiket[0].Status}</p>
          `
        }

        transporter.sendMail(mailOptions2, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })

      }
      // res.send(tiket)
      // var transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'itbantuan007@gmail.com',
      //     pass: 'ithelpdesk'
      //   }
      // })
      //
      //   var mailOptions = {
      //     from: 'itbantuan007@gmail.com',
      //     to: `${tiket[0].Teknisi.email}`,
      //     subject: 'response IT Bantuan 007',
      //     html: `
      //     <h1>Email From IT Bantuan 007</h1>
      //     <p>Admin menugaskan kepada:</h1>
      //     <p>${tiket[0].Teknisi.name}</p>
      //     <p>Employee name:</p>
      //     <p>Problem:</p>
      //     <p>${tiket[0].Problem}</p>
      //     `
      //   }
      //
      //     transporter.sendMail(mailOptions, function(error, info){
      //       if (error) {
      //         console.log(error);
      //       } else {
      //         console.log('Email sent: ' + info.response);
      //       }
      //     })

      res.redirect('/admintiket')
    })
  })
})


module.exports = router;
