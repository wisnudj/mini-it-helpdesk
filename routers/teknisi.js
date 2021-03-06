const express = require('express');
const router = express.Router();
const Model = require('../models');

function checkLogin(req, res, next){
  if (req.session.loggedIn && req.session.peran == 'admin') {
    next()
  }else{
    res.redirect('/login')
  }
}


router.get('/',checkLogin, (req,res)=>{
    Model.Teknisi.findAll().then(dataTeknisi=>{
        res.render('dbTeknisi',{dataTeknisi:dataTeknisi})
    })
})


router.get('/add', checkLogin, (req,res)=>{
    res.render('addTeknisi',{msg:""})
})


router.post('/add', checkLogin,(req,res)=>{
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    Model.Teknisi.create({
        name:name,
        username:username,
        password:password,
        email:email
    })
    .then(function(newTeknisi){
        // console.log(newStudent)
        res.redirect('/teknisi');
    }).catch((err)=>{
        let errorMsg = err.errors[0].message
        //   res.send(errorMsg)
          res.render('addTeknisi',{msg:errorMsg})
    });
});

router.get('/delete/:id',checkLogin, (req,res)=>{
    Model.Teknisi.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(function(){
        res.redirect('/teknisi');
    });
});

router.get('/edit/:id',(req,res)=>{
    Model.Teknisi.findById(req.params.id).then(dataTeknisi=>{
        res.render('editTeknisi',{dataTeknisi:dataTeknisi})
    });
});

router.post('/edit/:id',checkLogin, (req,res)=>{
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    Model.Teknisi.update(
        {
        name:name,
        username:username,
        password:password,
        email:email
    },{where:{
        id:req.params.id
    }})
    .then(function(newTeknisi){
        // console.log(newStudent)
        res.redirect('/teknisi');
    }).catch((err)=>{
        // res.send(err.errors[0].message)
        res.render('addTeknisi',{error:err});
    });
})

module.exports = router
