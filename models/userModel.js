const mongoose = require("mongoose");
const { db_link } = require("../secrets");
const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');
const { v4: uuid4 } = require('uuid');
console.log(db_link);
mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("db connected");
    // console.log(db);
  })
  .catch(function (err) {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  confirmPassword: {
    type: String,
    // required: true,
    minLength: 7,
    validate: function () {
      return this.confirmPassword == this.password;
    },
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'restaurantowner', 'deliveryboy'],
    default:'user'
  },
  profileImage: {
    type: String,
    default:'img/users/default.jpg'
  }
  ,
  resetToken:{type:String},
});

userSchema.methods.createResetToken=async function()
{
  const resetToken=uuid4();
  this.resetToken=resetToken;
  // this.confirmPassword = this.password;
  await this.save();
  return resetToken
}
userSchema.methods.resetPasswordHandler=function(password,confirmPassword)
{
  this.password=password;
  this.confirmPassword=confirmPassword;
  this.resetToken=undefined;
}
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;