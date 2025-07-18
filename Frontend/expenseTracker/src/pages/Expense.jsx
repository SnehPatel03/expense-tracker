import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import IncomeOverview from '../components/Income Components/IncomeOverview'
import axios from 'axios'
import Model from '../components/Model'
import toast from 'react-hot-toast'
import IncomeList from '../components/Income Components/IncomeList'
import DeleteAlert from '../components/Income Components/DeleteAlert'
import AddExpenseForm from '../components/Expense Components/AddExenseForm'
import ExpenseOverview from '../components/Expense Components/ExpenseOverview'
import ExpenseList from '../components/Expense Components/ExpenseList'

function Expense() {
  const [expenseData, setexpenseData] = useState([])
  const [loading, setloading] = useState(false)
  const [OpenAddExpenseModel, setOpenAddExpenseModel] = useState(false)
  const [onDeleteAlert, setonDeleteAlert] = useState(
    {
      show: false,
      data: null
    }
  )

  const fetchExpenseData = async () => {
    if (loading) return

    setloading(true)
    try {
      const response = await axios.get("https://expense-tracker-backend-jkhf.onrender.com/expense/AllExpense", {
        withCredentials: true,
      })

      if (response.data) {
        setexpenseData(response.data)
      }
    } catch (error) {
      console.log("There is error in income fetching", error)
    } finally { setloading(false) }
  }
  if (loading || !expenseData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600"></div>
        <p className="text-gray-600 font-medium text-lg">Loading Expenses...</p>
      </div>
    );
  }


  const addExpenseData = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      alert("Category Required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Amount should be a valid number and greater than 0");
      return;
    }
    if (!date) {
      alert("Date is required");
      return;
    }

    try {
      await axios.post(
        "https://expense-tracker-backend-jkhf.onrender.com/expense/addexpense",
        { category, amount, date, icon },
        { withCredentials: true }
      );

      setOpenAddExpenseModel(false);
      toast.success("Income added successfully");
      fetchExpenseData();
    } catch (error) {
      console.log("Error in adding Expense:", error.response.data || error.message);
      toast.error("Failed to add Expense");
    }
  };

  const deleteData = async (id) => {

    try {
      await axios.delete(`https://expense-tracker-backend-jkhf.onrender.com/expense/${id}`, {
        withCredentials: true
      })
      setonDeleteAlert({ data: null, show: false })
      toast.success("Expense Deleted Successfully")
      fetchExpenseData()
    } catch (error) {
      console.log("error in deleteing expense", error)
      toast.error("Error in Deleteing Expense")
    }

  }
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axios.get("https://expense-tracker-backend-jkhf.onrender.com/expense/expensePdf", {
        responseType: "blob", // important for binary data like PDF
        withCredentials: true // if your route needs auth cookies
      });
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Expense_Report.pdf';
      document.body.appendChild(link);
      link.click();
  
        document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading expense PDF:", error);
      toast.error("Failed to download expense report");
    }
  };
  


  useEffect(() => {
    fetchExpenseData()
  }, [])

  return (
    <DashboardLayout activeMenu={"Expense"}>
      <div className='flex mt-15'>
        <div className='grid grid-cols-1 gap-6'>
          <div >
            <ExpenseOverview
              transaction={expenseData}
              onAddExpense={() => setOpenAddExpenseModel(true)}
            />
          </div>
        </div>
      </div>
      <div className=' flex items-center '>
        <ExpenseList
          transaction={expenseData}
          onDelete={(id) => {
            setonDeleteAlert({ show: true, data: id })
          }}
          onDownload={handleDownloadExpenseDetails}

        />
      </div>
      <Model
        isOpen={OpenAddExpenseModel}
        onClose={() => setOpenAddExpenseModel(false)}
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={addExpenseData} />

      </Model>

      <Model
        isOpen={onDeleteAlert.show}
        onClose={() => setonDeleteAlert({
          show: false, data: null
        })}
        title="Delete Expense"
      >
        <DeleteAlert conetent="Are you sure to delete this Expense"
          onDelete={() => deleteData(onDeleteAlert.data)}
        />
      </Model>
    </DashboardLayout>
  )
}

export default Expense