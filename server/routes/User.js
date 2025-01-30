
const express = require('express');
const router = express.Router();
const { getallUsers , logOut,  } = require("../controllers/userController");
const passport = require('passport');
const jwt = require('jsonwebtoken');



router.post('/login',
  passport.authenticate('login',),
  function(req, res,user) {
    if (user) {
        const token = jwt.sign({ sub: 'user123' }, 'secret');
        res.json({ token });
       

      } else {
        res.status(401).send('Invalid credentials');
      }
    
  });


router.post("/register" ,
passport.authenticate("signup"), (req,res,user)=>{
  if (user) {
    
    const token = jwt.sign({ sub: 'user123' }, 'secret');
    res.json({ user : req.user , token });
   
  } else {
    res.status(401).send('Invalid credentials');
  }
   });

router.get("/getallUsers",getallUsers)

router.get("/logout" ,logOut);

module.exports = router ;