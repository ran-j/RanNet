var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  matricula: {
    type: String,
    required: true,
    trim: true
  },
  nome: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

//authenticate input against database
UserSchema.statics.authenticate = function (matricula, password, callback) {
  User.findOne({ matricula: matricula })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

UserSchema.statics.changepwd = function (userId,pwd, callback) {
  User.findById(userId)
  .exec(function (error, ActualUser) {
    if (error) {
      return callback(err)
    } else {
      if (ActualUser === null) {
        console.log('User not found.');
      } else {
          ActualUser.password = pwd;
          ActualUser.save();
          return callback(null, 1);
      }
     }
  });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User', UserSchema);

module.exports = User;