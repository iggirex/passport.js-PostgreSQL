var express = require('express');
var router = express.Router();
var queries = require('../db/queries');
var passport = require('../passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  // if(!req.user) {
  //   next();
  // } else {
  //   res.render('dashboard');
  // }
});
// router.get('/', function(req, res, next){
//   res.send('login failure');
// })
router.post('/', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/open',
  failureFlash: "Incorrect username or password",
  successFlash: "Welcome!"
}));

module.exports = router;
