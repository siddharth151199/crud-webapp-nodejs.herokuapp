const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.post('/add', (req, res) =>{
    // res.send("user is here")
    console.log(req.body, "data");
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User();
    newUser.name = name;
     newUser.email = email;
    newUser.password = password;
    newUser.save().then(user =>{
        console.log(user, "user has been saved");
        // res.send(user)
    }).catch(err => console.log(err))
  res.redirect('/')

})
router.get('/',(req, res) =>{
    User.find().then(user =>{
        res.render('index', {users: user})
    })
})
router.get('/users', (req, res) =>{
    User.find().then( users =>{
        res.send(users)
    })
})

router.get('/delete/:id', (req, res) =>{
    console.log(req.params);
    User.findOne({_id: req.params.id}).then(user =>{
        user.remove().then(userRemoved =>{
            console.log(userRemoved.name,"was remove");
            res.redirect('/');
     
          })
    }) 
})

router.get('/edit/:id', (req, res) =>{
    User.findOne({_id: req.params.id}).then(user =>{
            res.render('edit',{user: user})
          })
})

router.post('/edit',(req, res) =>{
    User.findById({_id: req.body.id}).then(user =>{
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;

        user.save().then(saved =>{
            console.log("user saved");
            res.redirect('/')
        })
    })
})
module.exports = router