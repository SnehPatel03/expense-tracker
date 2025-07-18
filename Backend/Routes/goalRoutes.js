import express from "express"
import { authorize } from "../Middlewares/authorize.js"
import { getGoal,setGoal } from "../Controllers/goalController.js"  


const router = express.Router()
router.post('/set',authorize,setGoal)
router.get('/get',authorize,getGoal)

export default router