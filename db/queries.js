"use strict"

var knex = require('./knex');
var bcrypt = require('bcrypt');

function Users(){
  return knex('user_tbl')
}

function hashPassword(password){
  return bcrypt.hashSync(password, 10);
}

module.exports = {
  getAllUsers: function(){
    return Users();
  },
  getSingleUser: function(username){
    return Users().where('userName', username)
  },
  insertUser: function(fName, lName, username, password){
    return Users().insert({
      fName : fName,
      lName : lName,
      userName: username,
      password: hashPassword(password)
    })
  }
}
