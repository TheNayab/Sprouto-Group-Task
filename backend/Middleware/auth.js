const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Please provide a valid JWT token in the Authorization header",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeData.user.id);
    req.user = await User.findById(decodeData.user.id);
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired JWT token",
    });
  }
};

module.exports = auth;
