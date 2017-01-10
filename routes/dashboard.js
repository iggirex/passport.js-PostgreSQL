var express = require('express');
var router = express.Router();
var queries = require('../db/queries');
var passport = require('../passport');

router.get('/', function(req, res, next){
  res.render('dashboard');
})

module.exports = router;
