import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";

export const authorize = async (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log("token",token)
  if (!token) {
    return res.status(400).json({ message: "Unauhtrize" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    console.log("error in token",error)
    return res.status(400).json({ message: "Error in token verifying" });
  }
};
