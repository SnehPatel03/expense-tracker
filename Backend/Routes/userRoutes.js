import express from "express"
import { LogIn, LogOut, signIn } from "../Controllers/userController.js"
import { upload } from "../Middlewares/upload.js"
import { authorize } from "../Middlewares/authorize.js"

const router = express.Router()
router.post("/signin",upload.single("profile"),signIn)
router.post("/login",LogIn)
router.get("/logout",LogOut) 

export default router