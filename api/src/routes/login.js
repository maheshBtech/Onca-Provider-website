//Add login related routes here
//include the login service from services/auth
var express = require('express');
var router = express.Router();
var passport = require('passport');
var loginBL = require('../core/BL/loginBL');

var loginbl = new loginBL()


router.get('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/users/' + user.username);
      });
    })(req, res, next);
  });
  
router.post('/',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

  router.post('/joinInstently', async function (req, res) {
    const msgObject = req.body;
    try {
      let message
      message = await loginbl.joinInstentlyBL(msgObject)
      message.message = "SUCCESS";
      res.send(message)
    }
    catch (err) {
      console.log("error route")
      throw err
    }
  })
  
  router.post('/loginUser', async function (req, res) {
    const msgObject = req.body;
    try {
      let message
      message = await loginbl.loginUserBL(msgObject)
      
      res.send(message)
    }
    catch (err) {
      console.log("error route")
      throw err
    }
  })

  module.exports = router;