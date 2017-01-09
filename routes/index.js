var express = require('express');
var router = express.Router();
var queries = require('../db/queries');


/* GET home page. */
router.get('/', function(req, res, next) {
  queries.getAllUsers().then((data)=>{
    res.json(data);
  })
});

module.exports = router;
