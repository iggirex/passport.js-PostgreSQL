var express = require('express');
var router = express.Router();
var queries = require('../db/queries');
var passport = require('../passport');

router.get('/', function(req, res, next){
  res.render('signup')
})

router.post('/', function(req, res, next){
  queries.insertUser(req.body.fName, req.body.lName, req.body.username, req.body.password)
  .then(function(){
    res.redirect('/')
  })
})

module.exports = router; // each route file must export to router
