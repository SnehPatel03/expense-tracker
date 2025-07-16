import jwt from "jsonwebtoken";

const generateTokenAndSaveInCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,       // true in production
    sameSite: "lax",
    path: "/",
  });

  return token;
};

export default generateTokenAndSaveInCookies;
