var Validator = require('validator')
var isEmpty = require('lodash/isEmpty')

module.exports = function validateInput (data) {
  let errors = {}

  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = 'First name is required.'
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = 'Last name is required.'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Hmmmm. That looks suspiciously like an invalid email address...'
  }

  // Password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.'
  }

  if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password must be a minimum of 6 characters.'
  }

  // Repeated Password
  if (Validator.isEmpty(data.repeatedPassword)) {
    errors.repeatedPassword = 'Password is required and must be a minimum of 6 characters.'
  }

  if (!Validator.equals(data.repeatedPassword, data.password)) {
    errors.repeatedPassword = 'Passwords must match.'
  }

  if (!Validator.isLength(data.repeatedPassword, { min: 6 })) {
    errors.repeatedPassword = 'Password must be a minimum of 6 characters.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
