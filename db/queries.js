"use strict"

var knex = require('./knex');
var bcrypt = require('bcrypt');

module.exports = {
  getAllUsers: function(){
    return knex('user_tbl');
  }
}
