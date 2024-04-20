import jwt from "jsonwebtoken";
import User from "../models/user.js"
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY

/*@desc create jwt token 
* @access public
*/
export async function createJwtToken(req, res, next) {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const token = jwt.sign(user, secretKey, { expiresIn: "1h" });
  res.set("Authorization", `Bearer ${token}`);
  next();
}

/*@desc verify jwt token 
* @access public
*/
export async function verifyJwtToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }
  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = decoded;
    const userDetails = req.user;
    next();
  });
}
