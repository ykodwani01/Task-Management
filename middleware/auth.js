// const jwt = require("jsonwebtoken");
JWT_SECRET_KEY = "";
const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Your User model
// require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    try {
      // Log the decoded userId to ensure it's correct
      console.log("Decoded userId:", decoded.userId);

      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = user; // Attach the user to the request object
      next(); // Proceed to the next middleware or route handler
    } catch (fetchError) {
      console.error("Error fetching user:", fetchError); // Log the error to see what went wrong
      return res
        .status(500)
        .json({ message: "Error fetching user", error: fetchError.message });
    }
  });
};

module.exports = authenticateToken;
