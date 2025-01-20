
// // Common functions ----->
// const generateOtp = (length) => {
//   const characters = "0123456789";
//   let otp = "";
//   for (let i = 0; i < length; i++) {
//     otp += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return otp;
// };


// const authentication = (app, twilio, otpStore, user,retailer,PasswordReset, bcrypt) => {
//   app.post("/signup", (req, res) => {
//     try {
//       let { mobileNum, gender, password } = req.body;
//       mobileNum = mobileNum.toString().replace(/\s+/g, "");
//       const length = mobileNum.length;
//       if (length >= 10 && length <= 13) {
//         const otp = generateOtp(4);
//         const newOtp = new otpStore({ mobileNum, gender, password, otp });
//         newOtp.save();
//         if (newOtp._id) {
//           res.status(200).json({ success: true, data: { otp: otp } });
//         } else {
//           res.status(404).json({
//             success: false,
//             data: { error: "Otp not generate, try again" },
//           });
//         }
//         // client.messages
//         //   .create({
//         //     body: `Your OTP is: ${otp}`,
//         //     to: mobileNum,
//         //     from: companyMobileNum,
//         //   })
//         //   .then((message) => {
//         //     res.status(200).json({ success: true, data: { otp: otp } });
//         //   })
//         //   .catch((error) => {
//         //     res.status(500).json({ success: false, data: "Error sending OTP" });
//         //   });
//       } else {
//         res
//           .status(404)
//           .json({ success: false, data: "Mobile number is not valid" });
//       }
//     } catch (error) {
//       res.status(500).json({ success: false, data: "Server Error" });
//     }
//   });

//   app.post("/verify-otp/:mob", async (req, res) => {
//     try {
//       const mobileNum = req.params.mob;
//       const {  otp } = req.body;
//       const storedOtp = await otpStore.findOne({ mobileNum, otp });
//       if (storedOtp) {
//         const { gender, password } = storedOtp;
//         const newUser = new user({ mobileNum, gender, password });
//         await newUser.save();
//         await otpStore.deleteOne({ mobileNum, otp });
//         res
//           .status(200)
//           .json({ success: true, data: "OTP verified and user saved" });
//       } else {
//         res.status(400).json({ success: false, data: "Invalid OTP" });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ success: false, data: "Server Error" });
//     }
//   });

//   app.post("/login", async (req, res) => {
//     try {
//       const { mobileNum, password } = req.body;
//       let newUser = await user.findOne({ mobileNum });
//       let userType ="General";
//       if (!newUser) {
//         userType = 'Retailer'
//         newUser = await retailer.findOne({ mobileNum });

//         if (!newUser) {
//           return res.status(404).json({
//             success: false,
//             data: "Invalid mobile number or password",
//           });
//         }
//       }
//       const isPasswordValid = await bcrypt.compare(password, newUser.password);
//       if (!isPasswordValid) {
//         return res
//           .status(400)
//           .json({ success: false, data: "Invalid mobile number or password" });
//       }
//       newUser.password =null;
//       res.status(200).json({ success: true, data: {
//         userType : userType,
//         data : newUser
//       } });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ success: false, data: "Server Error" });
//     }
//   });

//   app.post("/forgot-password", async (req, res) => {
//     try {
//       const { mobileNum } = req.body;
//       const newUser = await user.findOne({ mobileNum });
//       if (!newUser) {
//         return res
//           .status(400)
//           .json({ success: false, data: "Mobile number not found" });
//       }
//       const otp = generateOtp(4);
//       const passwordReset = new PasswordReset({ mobileNum, otp });
//       await passwordReset.save();
//       if(passwordReset._id){
//         res.status(200).json({ success: true, data: { otp: otp } });
//       }else{
//         res.status(400).json({ success: true, data: "Otp generation issue" });
//       }
//       // client.messages
//       //   .create({
//       //     body: `Your password reset OTP is: ${otp}`,
//       //     to: mobileNum,
//       //     from: companyMobileNum,
//       //   })
//       //   .then((message) => {
//       //     res.status(200).json({ success: true, data: { otp: otp } });
//       //   })
//       //   .catch((error) => {
//       //     res.status(500).json({ success: false, data: "Error sending OTP" });
//       //   });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ success: false, data: "Server Error" });
//     }
//   });

//   app.post("/reset-password", async (req, res) => {
//     try {
//       const { mobileNum, otp, newPassword } = req.body;
//       const passwordReset = await PasswordReset.findOne({ mobileNum, otp });
//       if (!passwordReset) {
//         return res.status(400).json({ success: false, data: "Invalid OTP" });
//       }
//       const userData = await user.findOne({ mobileNum });
//       if (!userData) {
//         return res
//           .status(400)
//           .json({ success: false, data: "Mobile number not found" });
//       }
//      const newHashedPass = await bcrypt.hash(newPassword, 10);
//      const updatedUser = await user.findOneAndUpdate(
//       { mobileNum: mobileNum },
//       { password: newHashedPass },
//       { new: true }
//     );
//       console.log("Final User : ", updatedUser);
//       await PasswordReset.deleteOne({ mobileNum, otp });
//       res
//         .status(200)
//         .json({ success: true, data: "Password reset successfully" });
//     } catch (error) {
//       res.status(500).json({ success: false, data: "Server Error" });
//     }
//   });
// };
// module.exports = authentication;

















const generateOtp = (length) => {
  const characters = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
};

const authentication = (app, twilio, otpStore, user, retailer, bcrypt) => {
  // Sign up
  app.post("/signup", (req, res) => {
    try {
      let { mobileNum } = req.body; // Only mobile number needed
      mobileNum = mobileNum.toString().replace(/\s+/g, "");
      const length = mobileNum.length;

      if (length >= 10 && length <= 13) {
        const otp = generateOtp(6);
        const newOtp = new otpStore({ mobileNum, otp });
        newOtp.save();
        
        if (newOtp._id) {
          res.status(200).json({ success: true, data: { otp: otp } });
        } else {
          res.status(404).json({
            success: false,
            data: { error: "Otp not generated, try again" },
          });
        }
        // Here you would send the OTP to the user's phone using Twilio (commented out for now)
        // client.messages.create({
        //   body: `Your OTP is: ${otp}`,
        //   to: mobileNum,
        //   from: companyMobileNum,
        // }).then(message => {
        //   res.status(200).json({ success: true, data: { otp: otp } });
        // }).catch(error => {
        //   res.status(500).json({ success: false, data: "Error sending OTP" });
        // });

      } else {
        res.status(404).json({ success: false, data: "Invalid mobile number" });
      }
    } catch (error) {
      res.status(500).json({ success: false, data: "Server Error" });
    }
  });

  // Verify OTP and sign up or login the user
  app.post("/verify-otp/:mob", async (req, res) => {
    try {
      const mobileNum = req.params.mob;
      const { otp } = req.body;
      const storedOtp = await otpStore.findOne({ mobileNum, otp });

      if (storedOtp) {
        // No need for gender and password, directly save user
        let existingUser = await user.findOne({ mobileNum });

        if (!existingUser) {
          // If user doesn't exist, create a new user with just mobile number
          const newUser = new user({ mobileNum });
          await newUser.save();
        }

        // Delete OTP after successful verification
        await otpStore.deleteOne({ mobileNum, otp });
        res.status(200).json({ success: true, data: "OTP verified, user signed in or signed up" });
      } else {
        res.status(400).json({ success: false, data: "Invalid OTP" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, data: "Server Error" });
    }
  });

  // Login (no password, just OTP verification)
  app.post("/login", async (req, res) => {
    try {
      const { mobileNum } = req.body; // Only mobile number needed for login
      let existingUser = await user.findOne({ mobileNum });

      if (!existingUser) {
        // If the user doesn't exist, return error
        return res.status(404).json({
          success: false,
          data: "Mobile number not registered",
        });
      }

      res.status(200).json({ success: true, data: { message: "User logged in successfully", user: existingUser } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, data: "Server Error" });
    }
  });

 
};

module.exports = authentication;
