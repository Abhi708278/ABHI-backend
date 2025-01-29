// const mongoose = require('mongoose');

// const otpStoreSchema = new mongoose.Schema({
//   mobileNum: String,
//   gender: String,
//   password: String,
//   otp: String,
//   type : String,
//   createdAt: { type: Date, default: Date.now, index: { expires: '5m' } }
// });

// const otpStore = mongoose.model('otpStore', otpStoreSchema);

// module.exports = otpStore;





const mongoose = require('mongoose'); 

const otpStoreSchema = new mongoose.Schema({
  mobileNum: String,
  otp: String,
  createdAt: { type: Date, default: Date.now, index: { expires: '5m' } } // OTP expires in 5 minutes
});

const otpStore = mongoose.model('otpStore', otpStoreSchema);

module.exports = otpStore;
