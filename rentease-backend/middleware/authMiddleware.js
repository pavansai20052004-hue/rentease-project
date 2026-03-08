const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer")
  ? authHeader.split(" ")[1]
  : authHeader;
  if(!token){
    return res.status(401).json({ message: "No token" });
  }
  try {
    const decoded = jwt.verify(token, "JWT_KEY");
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};