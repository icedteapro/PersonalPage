const express = require("express");
const router = express.Router();
const account = require('../models/Account');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

// Register
router.post("/", (req, res, next) => {
    bcrypt.hash(req.body.Password, 10) 
    .then(hash => {
        const accountModel = new account({
            username: req.body.name,
            password: hash,
            email: req.body.email,
            phone: req.body.phone,
            role: 1,
            isActive: false
          });    
     accountModel.save()
    .then(result => {
        res.status(201).json({         
            message: 'OK',
            result: result
        });
    }).catch(err => {      
        res.status(500).json({
            message: 'Error!!!',
            erorr: err
        });
    });
});
});

//Login
router.post("/login", (req, res, next) => {
   account.findOne({ username: req.body.name})
    .then(acc => {if(!acc) {return res.status(401).json({message: "Auth failed"});} 
   return bcrypt.compare(req.body.Password, acc.password);
    }).then( result =>{
        if(!result) {return res.status(401).json({message: "Auth failed"});}
     // Tạo token từ username & email. Hết hạn trong 1 giờ.  
     const token = jwt.sign({username: account.username, email: account.email},
                         'hothanhnamprimarykey@1994', {expiresIn: '1'});
     // Gửi token về UI    
      res.status(200).json({
          token: token,
          expiresIn: 3600
      });
    }).catch(err => {
       return res.json(401).json({
        message: "Auth failed",
        erorr: err 
       })
    }) ;
});

module.exports = router;