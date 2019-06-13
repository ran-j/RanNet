var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  matricula: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default : false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

UserSchema.statics.authenticate = (matricula, password, callback) => {
  Users.findOne({ matricula: matricula }).exec((err, user) => {
    if (err) return callback(err)
    if (!user) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) return callback(null, user);
      return callback();
    })
  });
}

UserSchema.statics.changepwd = (userId,pwd, callback) => {
  Users.findById(userId).exec((error, ActualUser) => {
    if (err) return callback(error)

    if (!ActualUser) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    } else {
      ActualUser.password = pwd;
      ActualUser.save();
      return callback(null, 1);
    }

  });
}

var Users = mongoose.model('Users', UserSchema);

module.exports = Users;