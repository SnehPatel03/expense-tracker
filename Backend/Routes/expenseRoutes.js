import express from "express"

import { authorize } from "../Middlewares/authorize.js"


import { addExpense, deleteExpense, getAllExpense, getPdfOfExpense } from "../Controllers/expenseController.js"

const router = express.Router()
router.post("/addexpense",authorize,addExpense)
router.get("/AllExpense",authorize,getAllExpense)
router.get("/expensePdf",authorize,getPdfOfExpense)
router.delete("/:id",authorize,deleteExpense) 

export default router