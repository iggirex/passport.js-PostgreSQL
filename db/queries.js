"use strict"

var knex = require('./knex');
var bcrypt = require('bcrypt');

function Users(){
  return knex('user_tbl')
}

module.exports = {
  getAllUsers: function(){
    return Users();
  },
  getSingleUser: function(id){
    return Users().where('id', id)
  },
  insertUser: function(fName, lName, username, password){
    return Users().insert({
      fName : fName,
      lName : lName,
      userName: username,
      password: password
    })
  }
}
