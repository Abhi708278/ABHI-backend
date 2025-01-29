const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  // Uncomment these lines if you need them
  // adminId: {
  //   type: String,
  //   required: true,
  //   default: "adminMcute__success"
  // },
  // adminName: {
  //   type: String,
  //   required: true,
  //   default: "Ramesh"
  // },
  // adminPassword: {
  //   type: String,
  //   required: true,
  //   default: "Ramesh@#1234"
  // },
  // email: {
  //   type: String,
  //   required: true,
  //   default: "Ramesh"
  // },
  // phone: {
  //   type: Number,
  //   required: true,
  //   default: "0123456789"
  // },
  totalUser: {
    type: Number,
    default: 0,
  },
  totalProducts: {
    type: Number,
    default: 0,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Static method to find a user by mobile number
adminSchema.statics.findByMobile = async function (mobileNum) {
  return this.findOne({ mobile: mobileNum });
};

const Admin = mongoose.model("AdminData", adminSchema);
module.exports = Admin;
