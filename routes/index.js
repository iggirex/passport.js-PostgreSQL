var express = require('express');
var router = express.Router();
var queries = require('../db/queries');


/* GET home page. */
router.get('/', function(req, res, next) {
  queries.getAllUsers().then((data)=>{
    res.json(data);
  })
  // res.render("index")
});
router.post('/', function(req, res, next){
  queries.insertUser(req.body.fName, req.body.lName, req.body.username, req.body.password)
  .then(function(){
    res.redirect('/')
  })
})

module.exports = router;
