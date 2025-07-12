  import Income from "../Model/userIncome.js";
  import Expense from "../Model/userExpense.js";
  import { Types , isValidObjectId} from "mongoose";
  import mongoose from "mongoose";

  const getDashboardData = async (req, res) => {
    try {
      const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));
    

      console.log(userObjectId)

      const totalIncome = await Income.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);

      // console.log("totalIncome", {totalIncome,userId:isValidObjectId(userId)});

      const totalExpense = await Expense.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);

      const last60daysIncomeTransaction = await Income.find({
        userId,
        date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
      }).sort({ date: -1 });

      //sumation
      const incomeOfLast60days = last60daysIncomeTransaction.reduce(
        (sum, transactions) => sum + transactions.amount,
        0
      );
      const last30daysExpenseTransaction = await Expense.find({
        userId,
        date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      }).sort({ date: -1 });

      //sum a tion
      const expenseOfLast30days = last30daysExpenseTransaction.reduce(
        (sum, transactions) => sum + transactions.amount,
        0
      );
      
      const lastTransactions = [
        ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
          (txn) => ({
            ...txn.toObject(),
            type: "income",
          })
        ),

        ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
          (txn) => ({
            ...txn.toObject(),
            type: "expense",
          })
        ),
      ].sort((a, b) => new Date(b.date) - new Date(a.date));
      res.json({
        totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,
        last30DaysExpense: {
          total: expenseOfLast30days,
          transactions: last30daysExpenseTransaction,
        },
        last60DaysExpense: {
          total: incomeOfLast60days,
          transactions: last60daysIncomeTransaction,
        },
        recentTransactions: lastTransactions,
      });
    } catch (error) {
      console.log("error in  dashborad function ", error);
      res.status(500).json({ message: "Error is fetching data in dashboard" });
    }
  };
  export default getDashboardData;
