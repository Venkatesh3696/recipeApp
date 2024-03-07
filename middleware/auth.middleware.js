const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied - No token provided" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "MY_SECRET_TOKEN");
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Access denied - User not found" });
    }
    req.userId = user._id;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
    console.log(err);
  }
};

module.exports = authMiddleware;
