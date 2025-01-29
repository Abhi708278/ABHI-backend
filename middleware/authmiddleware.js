const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');

const protectRoute = async (req, res, next) => {
  let user = {
    Name : "Abhi"

  }
  req.user = user;
  next();
  return;
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized - No access token provided" });
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      console.error("ACCESS_TOKEN_SECRET is missing in environment variables.");
      return res.status(500).json({ message: "Server error - Missing secret key" });
    }

    try {
      const decoded = jwt.verify(accessToken, secret);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

    
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthorized - Access token expired" });
      }
      console.error("JWT Error:", error.message);
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};


const adminRoute = (req, res, next) => {
   next();
  return;

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied - Admin only" });
  }
};

module.exports = { protectRoute, adminRoute };
