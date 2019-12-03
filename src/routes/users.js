const express = require('express');
const router = express.Router();

router.get('/users/signin',(req, res)=>{
    res.render('users/signin');
});

router.get('/users/signup',(req, res)=>{
    res.render('users/signup');
});

router.post('/users/signup', (req, res)=>{
  
 const { name, email, password, confrim_password }  = req.body;
 const error = [];
 if(password != confrim_password){

 }
    
});

module.exports = router;