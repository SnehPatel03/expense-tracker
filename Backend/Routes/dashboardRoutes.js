import express from "express"
import { authorize } from "../Middlewares/authorize.js"
import getDashboardData from '../Controllers/dashboardContrller.js'


const router = express.Router()
router.get("/",authorize,getDashboardData)


export default router