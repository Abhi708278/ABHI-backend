// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//   mobileNum: { type: String, required: true, unique: true },
//   gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
//   password: { type: String, required: true },
// });

// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// const Retailer = mongoose.model('Retailer', userSchema);

// module.exports = Retailer;










const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
  mobileNum: { type: String, required: true, unique: true }
});

const Retailer = mongoose.model('Retailer', retailerSchema);

module.exports = Retailer;
