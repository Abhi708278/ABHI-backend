// Common functions ----->
const generateOtp = (length) => {
  const characters = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return otp;
};

const authentication = (app, twilio, otpStore, user,retailer, PasswordReset, bcrypt) => {
  app.post("/signup/:type", (req, res) => {
    try {
      const type = req.params.type;
      let { mobileNum, gender, password } = req.body;
      mobileNum = mobileNum.toString().replace(/\s+/g, "");
      const length = mobileNum.length;
      if (length >= 10 && length <= 13) {
        const otp = generateOtp(4);
        let newOtp = null;
        if (type === "user") {
          newOtp = new otpStore({ mobileNum, gender, password, type, otp });
        } else if (type === "retailer") {
          newOtp = new otpStore({ mobileNum, gender, password, type, otp });
        } else {
          res.status(404).json({ success: false, data: "404" });
        }
        newOtp.save();
        if (newOtp._id) {
          res.status(200).json({ success: true, data: { otp: otp } });
        } else {
          res.status(404).json({
            success: false,
            data: { error: "Otp not generate, try again" },
          });
        }
        // client.messages
        //   .create({
        //     body: `Your OTP is: ${otp}`,
        //     to: mobileNum,
        //     from: companyMobileNum,
        //   })
        //   .then((message) => {
        //     res.status(200).json({ success: true, data: { otp: otp } });
        //   })
        //   .catch((error) => {
        //     res.status(500).json({ success: false, data: "Error sending OTP" });
        //   });
      } else {
        res
          .status(404)
          .json({ success: false, data: "Mobile number is not valid" });
      }
    } catch (error) {
      res.status(500).json({ success: false, data: "Server Error" });
    }
  });

  app.post("/verify-otp", async (req, res) => {
    try {
      const { mobileNum, otp } = req.body;
      const storedOtp = await otpStore.findOne({ mobileNum, otp });
      if (storedOtp) {
        const { type, gender, password } = storedOtp;
        let newUser = null;
        if (type === "user") {
          newUser = new user({ mobileNum, gender, password });
        } else {
          newUser = new retailer({ mobileNum, gender, password });
        }
        await newUser.save();
        await otpStore.deleteOne({ mobileNum, otp });
        res
          .status(200)
          .json({ success: true, data: "OTP verified and user saved" });
      } else {
        res.status(400).json({ success: false, data: "Invalid OTP" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, data: "Server Error" });
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const { mobileNum, password } = req.body;
      let newUser = await user.findOne({ mobileNum });
      let userType ="General";
      if (!newUser) {
        userType = 'Retailer'
        newUser = await retailer.findOne({ mobileNum });

        if (!newUser) {
          return res.status(404).json({
            success: false,
            data: "Invalid mobile number or password",
          });
        }
      }
      const isPasswordValid = await bcrypt.compare(password, newUser.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ success: false, data: "Invalid mobile number or password" });
      }
      res.status(200).json({ success: true, data: {
        userType : userType,
        data : newUser
      } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, data: "Server Error" });
    }
  });

  app.post("/forgot-password", async (req, res) => {
    try {
      const { mobileNum } = req.body;
      let newUser = await user.findOne({ mobileNum });
      let type = "user";
      if (!newUser) {
        newUser = await retailer.findOne({ mobileNum });
        type = "retailer";
        if (!newUser) {
          return res
            .status(400)
            .json({ success: false, data: "Mobile number not found" });
        }
      }
      const otp = generateOtp(4);
      const passwordReset = new PasswordReset({ mobileNum, otp, type });
      await passwordReset.save();
      if (passwordReset._id) {
        res.status(200).json({ success: true, data: { otp: otp } });
      } else {
        res.status(400).json({ success: true, data: "Otp generation issue" });
      }
      // client.messages
      //   .create({
      //     body: `Your password reset OTP is: ${otp}`,
      //     to: mobileNum,
      //     from: companyMobileNum,
      //   })
      //   .then((message) => {
      //     res.status(200).json({ success: true, data: { otp: otp } });
      //   })
      //   .catch((error) => {
      //     res.status(500).json({ success: false, data: "Error sending OTP" });
      //   });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, data: "Server Error" });
    }
  });

  app.post("/reset-password", async (req, res) => {
    try {
      const { mobileNum, otp, newPassword } = req.body;
      const passwordReset = await PasswordReset.findOne({ mobileNum, otp });
      if (!passwordReset) {
        return res.status(400).json({ success: false, data: "Invalid OTP" });
      }
      const { type } = passwordReset;
      let userData = null;
      if (type === "user") {
        userData = await user.findOne({ mobileNum });
      } else {
        userData = await retailer.findOne({ mobileNum });
      }
      if (!userData) {
        return res
          .status(400)
          .json({ success: false, data: "Mobile number not found" });
      }
      newHashedPass = await bcrypt.hash(newPassword, 10);
      let updatedUser = null;
      if (type === "user") {
        updatedUser = await user.findOneAndUpdate(
          { mobileNum: mobileNum },
          { password: newHashedPass },
          { new: true }
        );
      } else {
        updatedUser = await retailer.findOneAndUpdate(
          { mobileNum: mobileNum },
          { password: newPassword },
          { new: true }
        );
      }
      console.log("Final user ", updatedUser);

      await PasswordReset.deleteOne({ mobileNum, otp });
      res
        .status(200)
        .json({ success: true, data: "Password reset successfully" });
    } catch (error) {
      res.status(500).json({ success: false, data: "Server Error" });
    }
  });
};
module.exports = authentication;
