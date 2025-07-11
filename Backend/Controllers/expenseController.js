
import PDFDocument from 'pdfkit';
import Expense from '../Model/userExpense.js';

export const addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon,category, amount, date } = req.body;

    if (!category || !amount || !date) {
      res
        .status(404)
        .json({ message: "Enter All Fields of Expense Description" });
    }
    const newExpense = new Expense({
      userId,
      category,
      amount,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(200).json({
      message: "Expense Added Successfully",
      newExpense,
    });
  } catch (error) {
    console.log("error in adding expense", error);
    res.status(500).json({ message: "Server error in adding Expense" });
  }
};

export const getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId });
    res.json(expense);
  } catch (error) {
    console.log("error in fetch", error);
    res.status(500).json({ message: "Server error in fetching expense" });
  }
};
export const deleteExpense = async (req, res) => {
  
    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Expense Deleted successfully"})
    } catch (error) {
        console.log("error in deleteing Expense", error);
    res.status(500).json({ message: "Server error in deleteing Expense" });
  }
};

export const getPdfOfExpense = async (req, res) => {
     try {
    
    const userId = req.user.id;

    
    const expenses = await Expense.find({ userId });

   
    const doc = new PDFDocument();

   
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=expense-report.pdf');


    doc.pipe(res);

    
    doc.fontSize(22).text('Expense Report', { align: 'center' });
    doc.moveDown();

    expenses.forEach((expense, index) => {
      doc
        .fontSize(18)
        .text(`${index + 1}. Category: ${expense.category}`)
        .text(`   Amount: ${expense.amount} Rup`)
        .text(`   Date: ${new Date(expense.date).toLocaleDateString()}`)
        .moveDown();
    });
    doc.end();
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Failed to generate PDF of expense' });
  }
};