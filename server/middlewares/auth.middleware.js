const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "No token found",
    });
  }
  console.log("token", token);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload", payload);
    req.user = payload;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired. Please login again." });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token. Please login again to get a new token.",
      });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};
