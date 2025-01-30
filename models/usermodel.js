
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema(
//   {
//     mobileNum: {
//       type: String,
//       required: [true, "Mobile number is required"],
//       unique: true,
//       trim: true,
//     },
//     // Uncomment the fields below if needed in the future
//     // name: {
//     //   type: String,
//     //   required: [true, "Name is required"],
//     // },
//     // email: {
//     //   type: String,
//     //   unique: true,
//     //   lowercase: true,
//     //   trim: true,
//     // },
//     cartItems: [
//       {
//         quantity: {
//           type: Number,
//           default: 1,
//         },
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//         },
//       },
//     ],
//     role: {
//       type: String,
//       enum: ["customer", "admin"],
//       default: "customer",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Static method to find a user by mobile number
// userSchema.statics.findByMobile = async function (mobileNum) {
//   return this.findOne({ mobileNum });
// };

// const User = mongoose.model("User", userSchema);

// module.exports = User;



