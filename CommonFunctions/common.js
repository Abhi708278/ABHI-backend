// To generate any random fixed digit number 
const generateOtp = (length) => {
    const characters = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
  };



module.exports = {generateOtp};