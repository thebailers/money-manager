// FEM

// var jwt = require('jsonwebtoken')
// var expressJwt = require('express-jwt')
// var config = require('../config/config')
// var checkToken = expressJwt({ secret: config.secrets.jwt })
// var User = require('../api/user/userModel')
//
// exports.decodeToken = function() {
//   return function (req, res, next) {
//     // make it optional to place token on query string
//     // if it is, place it on the headers where it should be
//     // so checkToken can see it. See follow the 'Bearer 034930493' format
//     // so checkToken can see it and decode it
//     if (req.query && req.query.hasOwnProperty('access_token')) {
//       req.headers.authorization = 'Bearer ' + req.query.access_token
//     }
//
//     // this will call next if token is valid
//     // and send error if its not. It will attach
//     // the decoded token to req.user
//     checkToken(req, res, next)
//   }
// }
//
// exports.getFreshUser = function() {
//   return function(req, res, next) {
//     User.findById(req.user._id)
//       .then(function(user) {
//         if (!user) {
//           // if no user is found it was not
//           // it was a valid JWT but didn't decode
//           // to a real user in our DB. Either the user was deleted
//           // since the client got the JWT, or
//           // it was a JWT from some other source
//           res.status(401).send('Unauthorized')
//         } else {
//           // update req.user with fresh user from
//           // stale token data
//           req.user = user
//           next()
//         }
//       }, function(err) {
//         next(err)
//       })
//   }
// }
//
//
// // check the user exists in the database
// // and that the password is correct
// exports.verifyUser = function() {
//   return function(req, res, next) {
//     var username = req.body.username
//     var password = req.body.password
//
//     // if no username or password then send
//     if (!username || !password) {
//       return res.status(400).send('You need a username and a password')
//     }
//
//     // look user up in the DB so we can check
//     // if the passwords match for the username
//     User.findOne({username: username})
//       .then(function(user) {
//         if (!user) {
//           res.status(401).send('No user with the given username')
//         } else {
//           // checking the passowords here
//           if (!user.authenticate(password)) {
//             res.status(401).send('Wrong password')
//           } else {
//             // if everything is good,
//             // then attach to req.user
//             // and call next so the controller
//             // can sign a token from the req.user._id
//             req.user = user
//             next()
//           }
//         }
//       }, function(err) {
//         next(err)
//       })
//   }
// }
//
// // util method to sign tokens on signup
// exports.signToken = function(id) {
//   return jwt.sign(
//     {_id: id},
//     config.secrets.jwt,
//     {expiresIn: config.expireTime}
//   )
// }



// Vlad
// vlad
const express = require('express');
const validator = require('validator');
const passport = require('passport');

const router = new express.Router();

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide a valid username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide a vaid username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
  console.log(req.body)
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }


    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData
    });
  })(req, res, next);
});

module.exports = router;
