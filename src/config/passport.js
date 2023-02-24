/**
 * Passport configuration file where you should configure strategies
 */

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');

const User = require("../api/model/User");
require("dotenv").config();

exports.innitizianingPassport = (passport, authDeatil) => {
 
  // Passport Serialization/Deserialization of user.id inside req object
  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser(async (user, done) => {
    try {
      const resp = await User.findOne({ userId: user.id });
      if (resp) {
        let userDetail = {};

        userDetail.userId = resp.userId;
        userDetail.authProvider = resp.authProvider;
        userDetail.username = resp.username;
        userDetail.token = resp.token;

        return done(null, userDetail);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log("error");
    }
  });

// For web Login Auth

  passport.use (
    'webLogin',
    new LocalStrategy (
      {
        usernameField: 'email',
        passwordField: 'password',
      },
       (email, password, done)=> {
        console.log(email,password);
        User.findOne ({email: email}).exec (function (err, user) {
          if (err) {
            return done (err);
          }
          if (!user) {
            return done (null, false, {message: 'Invailid Email Address'});
          }

          bcrypt.compare (password, user.password, function (err, res) {
            console.log('err passport',err,user.password);
            if (!res)
              return done (null, false, {
                message: 'Password not matched.',
              });

            let existingUser = {};
            existingUser.email = user.email;
            existingUser.id = user._id;
            existingUser.firstName = user.firstName;
            existingUser.lastName = user.lastName;
            existingUser.verified = user.verified ;
            return done (null, existingUser, {
              message: 'Logged In Successfully',
            });
          });
        });
      }
    )
  );
};





module.exports.jwtSettings = {
  expiresInMinutes: "365d",
  secret: "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM",
  algorithm: "HS256",
};
