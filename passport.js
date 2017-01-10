"use strict"
var passport = require('passport');
var Local = require('passport-local').Strategy;
var query = require('./db/queries');
var bcrypt = require('bcrypt');

passport.use(new Local(
    function(username, password, done){
      console.log('Passport access new local & username is: ', username);
      query.getSingleUser(username)
      .then(function(users){
        console.log("this is username", users)
        let user;
        if(users.length === 0){
          console.log("not a user", username)
          return query.getSingleUser(username)
          .then((data) => {
            return data[0];
          })
        } else {
          return users[0]
        }
      })
      .then((user) => {
        console.log("now compare", user);
        if(bcrypt.compareSync(password, user.password)){
          done(null, user); //if credentials are valid, the verify callback invokes done to supply Passport with authenticated user
        } else {
          done(null, false) //if credentials are not valid, we pass in false
        }
      })
      .catch(function(err){
        done(null, false);
      })
    }
));

passport.serializeUser(function(user, done){
  console.log('serializeUser');
  done(null, user.userName);
});

passport.deserializeUser(function(username, done){
  console.log('deserializeUser');
  query.getSingleUser(username)
  .then(function(users){
    let user;
    if(users.length === 0){
      console.log("not a user", username)
      return query.getSingleUser(username)
      .then((owners) => {
        return owners[0].userName;
      })
    } else {
      return users[0].userName;
    }
  })
  .then((user) => {
      done(null, user);
  })
  .catch(function(err){
    console.log('d');
    return next(err);
  })
});

module.exports = passport;
