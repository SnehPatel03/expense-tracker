import express from "express"

import { authorize } from "../Middlewares/authorize.js"
import { addIncome, deleteIncome, getAllIncome, getPdfOfIncome } from "../Controllers/incomeController.js"

const router = express.Router()
router.post("/addIncome",authorize,addIncome)
router.get("/AllIncome",authorize,getAllIncome)
router.get("/incomePdf",authorize,getPdfOfIncome)
router.delete("/delete:id",authorize,deleteIncome) 

export default router