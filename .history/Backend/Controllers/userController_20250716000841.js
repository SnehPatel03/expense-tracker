
import { z } from "zod";
import bcrypt from "bcrypt";
import generateTokenAndSaveInCookies from "../jwt/token.js";
import User from "../Model/userModel.js";

const userSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "fullname must contain 3 to 20 characters" })
    .max(20, { message: "fullname must contain 3 to 20 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must contain atleast 8 character" }),
});

  export const signIn = async (req, res) => {
    
    try {
      const { email, fullname, password } = req.body;
      const file = req.file;  
      if (!email || !fullname || !password) {
        return res.status(400).json({ message: "Enter All cardentials" });
      }
      if (!file) {
        return res.status(400).json({ message: "Enter Profile Avatar" });
      }
      const validate = userSchema.safeParse({ email, fullname, password }); // zod 
      if (!validate.success) {
        const errorMessage = validate.error.errors.map((err) => err.message);
        return res.status(400).json({ error: errorMessage });
      }

      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User Already Registred" });
      }
      //hashing of password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, fullname , profile: `/upload/${file.filename}`, password: hashedPassword });

      await newUser.save();
      if (newUser) {
        const token = await generateTokenAndSaveInCookies(newUser._id, res);
        return res
          .status(201)
          .json({ message: "User Registrestion Successfully", newUser , token });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error in  SIGN IN functionality" });
    }
  };
export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Enter All Cardentials" });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid Email or Password" });
      ret
    }
    res.status(201).json({ message: "User loggedIn succesfully", user });
    const token = generateTokenAndSaveInCookies(user._id, res);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in  Log in functionality" });
  }
};
export const LogOut = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(201).json({ message: "User logged Out successfully" });
  } catch (error) {
    console.log("error in logOut", error);
    res.status(400).json({ message: "Error in  Log Out functionality" });
  }
};
