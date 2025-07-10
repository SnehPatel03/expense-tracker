import Income from "../Model/userIncome.js";
import PDFDocument from 'pdfkit';

export const addIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      res
        .status(404)
        .json({ message: "Enter All Fields of Income Description" });
    }
    const newIncome = new Income({
      userId,
      source,
      amount:Number(amount),
      icon,
      date: new Date(date),
    });
    await newIncome.save();
    res.status(200).json({
      message: "Income Added Successfully",
      newIncome,
    });
  } catch (error) {
    console.log("error in add", error);
    res.status(500).json({ message: "Server error in adding Income" });
  }
};

export const getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId });
    res.json(income);
  } catch (error) {
    console.log("error in fetch", error);
    res.status(500).json({ message: "Server error in fetching Income" });
  }
};
export const deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Deleted successfully"})
    } catch (error) {
        console.log("error in deleteing", error);
    res.status(500).json({ message: "Server error in deleteing Income" });
  }
};

export const getPdfOfIncome = async (req, res) => {
     try {
    
    const userId = req.user.id;

    
    const incomes = await Income.find({ userId });

   
    const doc = new PDFDocument();

   
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=income-report.pdf');


    doc.pipe(res); // pipe the pdf to responcessss

    // main kary;
    doc.fontSize(22).text('Income Report', { align: 'center' });
    doc.moveDown();

    incomes.forEach((income, index) => {
      doc
        .fontSize(18)
        .text(`${index + 1}. Source: ${income.source}`)
        .text(`   Amount: ${income.amount} Rup`)
        .text(`   Date: ${new Date(income.date).toLocaleDateString()}`)
        .moveDown();
    });

    doc.end();
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
};