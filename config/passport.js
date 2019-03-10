const LocalStrategy  = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('users');

module.exports = function(passport){
  passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
    // Match user
    User.findOne({
      email:email
    }).then(user => {
      if(!user){
        return done(null, false, {message: 'No User Found'});
      } 

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Password Incorrect'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};

// Sessions
// In a typical web application, the credentials used to authenticate a user will 
// only be transmitted during the login request.If authentication succeeds, a session
//  will be established and maintained via a cookie set in the user 's browser.

// Each subsequent request will not contain credentials, but rather the unique cookie
//  that identifies the session.In order to support login sessions, Passport will serialize 
//  and deserialize user instances to and from the session.