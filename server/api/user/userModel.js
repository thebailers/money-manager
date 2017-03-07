var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  firstname: {
    type: String,
    required: true
  },

  lastname: {
    type: String,
    required: true
  },

  created_at: Date,
  updated_at: Date
})

// middleware that will run before a document is created
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()

  // encrypt the password
  this.password = this.encryptPassword(this.password)
  next()
})

UserSchema.methods = {
  validPassword: function(password) {
    return (this.password === password)
  },

  // check the passwords on signin
  authenticate: function(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password)
  },

  // hash the passwords
  encryptPassword: function(plainTextPword) {
    if (!plainTextPword) {
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(plainTextPword, salt)
    }
  },

  toJson: function() {
    var obj = this.toObject()
    delete obj.password
    return obj
  }
}

module.exports = mongoose.model('User', UserSchema)
