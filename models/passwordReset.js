const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
  mobileNum: String,
  otp: String,
  type : String,
  createdAt: { type: Date, default: Date.now, index: { expires: '5m' } } // OTP will expire in 5 minutes
});

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);

module.exports = PasswordReset;
